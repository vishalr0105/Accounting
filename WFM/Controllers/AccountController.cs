// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

using AutoMapper;
using DAL;
using DAL.Core;
using DAL.Core.Interfaces;
using DAL.DTOS;
using DAL.Models;
using DAL.Repositories.Interfaces;
using EtapriseWFM.Helpers;
using EtapriseWFM.ViewModels;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WFM.Helpers;
using WFM.ViewModels;
using WFM.ViewModels.Dtos;

namespace WFM.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IAccountManager _accountManager;
        private readonly IAuthorizationService _authorizationService;
        private readonly ILogger<AccountController> _logger;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _config;
        private readonly IWebHostEnvironment _environment;
        private readonly UserManager<MasterUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly SignInManager<MasterUser> _signInManager;
        private const string GetUserByIdActionName = "GetUserById";
        private const string GetRoleByIdActionName = "GetRoleById";
        private readonly IEmailSender _emailSender;
        private readonly ApplicationDbContext _db;

        public AccountController(ApplicationDbContext context, IMapper mapper, IAccountManager accountManager, IAuthorizationService authorizationService,
            ILogger<AccountController> logger, IUnitOfWork unitOfWork, IConfiguration config,
            IWebHostEnvironment environment,
            UserManager<MasterUser> userManager, SignInManager<MasterUser> signInManager, IEmailSender emailSender, IOptions<AppSettings> appSettings, RoleManager<ApplicationRole> roleManager)
        {
            _db = context;
            _mapper = mapper;
            _accountManager = accountManager;
            _authorizationService = authorizationService;
            _environment = environment;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _config = config;
            _userManager = userManager;
            _signInManager = signInManager;
            _emailSender = emailSender;
            _roleManager = roleManager;
        }


        #region old etaprise methods may need afterwards

        [HttpGet]
        [Route("permissions")]
        [ProducesResponseType(200, Type = typeof(List<PermissionViewModel>))]
        public IActionResult GetAllPermissions()
        {
            return Ok(_mapper.Map<List<PermissionViewModel>>(ApplicationPermissions.AllPermissions));
        }


        [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme)]
        [HttpGet]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                var temp = Utilities.GetUserId(this.User);
                if (!Guid.TryParse(temp, out Guid userId))
                {
                    return BadRequest(new { ErrorMessage = "Invalid user ID." });
                }

                MasterUser user = await _userManager.FindByIdAsync(userId.ToString());
                if (user == null)
                {
                    return NotFound(new { ErrorMessage = "User not found." });
                }

                var identity = this.User.Identity as ClaimsIdentity;
                foreach (var claim in this.User.Claims.ToList())
                {
                    identity.RemoveClaim(claim);
                }

                HttpContext.Session.Clear();
                await _signInManager.SignOutAsync();
                await HttpContext.SignOutAsync();

                return Ok(true);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("AccountController: Logout Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [AllowAnonymous]
        [HttpPost]
        [Route("verify")]
        public async Task<IActionResult> VerifyEmail([FromBody] EmailVerifyDto args)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _unitOfWork.User.GetUserById(new Guid(args.UserId));
            if (result != null)
            {

                return Ok(new { });
            }
            else
            {
                _logger.LogDebug($"AccountController: User not found for {args.UserId}.");
                return Ok(new { ErrorMessage = $"User not found for {args.UserId}" });
            }
        }


        [HttpGet]
        [Route("SaveNotificationSetting")]
        public void SaveNotificationSetting(string? companyid)
        {
            var notificationtypes = _unitOfWork.NotificationTypeRepository.GetAll();
            var notificationsetting = _mapper.Map<List<NotificationSetting>>(notificationtypes);
            foreach (var item in notificationsetting)
            {
                item.CompanyId = companyid;
            }
            _unitOfWork.NotificationSettingRepository.AddRange(notificationsetting);
            _unitOfWork.SaveChanges();

        }


        [HttpPost]
        [Route("token/renew")]
        public async Task<IActionResult> RenewTokenAsync(Guid userId)
        {
            Log.Information("Token renewal API called");
            try
            {
                UserMaster user = await _unitOfWork.User.GetUserById(userId);

                if (user == null)
                {
                    _logger.LogDebug($"Token renewal failed: User with id {userId} not found.");
                    return NotFound(new { ErrorMessage = "User not found" });
                }

                var tokenResponse = await GenerateToken(user);

                // Ensure tokenResponse contains refresh_token property
                if (tokenResponse != null && tokenResponse.refresh_token != null)
                {
                    user.RefreshToken = tokenResponse.refresh_token;
                    _db.UserMaster.Update(user);
                    _db.SaveChanges();
                }
                else
                {
                    _logger.LogError("Refresh token not found in token generation response.");
                    return StatusCode(StatusCodes.Status500InternalServerError, new { ErrorMessage = "Refresh token not found" });
                }

                return Ok(new
                {
                    twoFactorEnable = user.Twostepverification,
                    access_token = tokenResponse.access_token,
                    refresh_token = tokenResponse.refresh_token,
                    expires_in = tokenResponse.expires_in,
                    token_type = tokenResponse.token_type
                });
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Error renewing token");
                return StatusCode(StatusCodes.Status500InternalServerError, new { ErrorMessage = "Error renewing token" });
            }
        }


        private async Task<TokenResponse> GenerateToken(UserMaster user)
        {
            try
            {
                var scope = new string[] { "email", "openid", "phone", "profile", "quickapp_api", "roles", "offline_access" };
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Amr, "pwd"),
                    new Claim(JwtRegisteredClaimNames.Aud, "quickapp_api"),
                    new Claim("client_id", "quickapp_spa"),
                    new Claim("idp", "local"),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Email, user.EmailID),
                    new Claim("name", user.UserName),
                    new Claim("twoFactorEnable", user.Twostepverification.ToString()),
                    new Claim("fullName", user.FullName),
                    new Claim("roleId", user.RollId.ToString()),
                    new Claim("usertype", user.UserType),
                    new Claim("userimage", !string.IsNullOrEmpty(user.UserImage) ? user.UserImage : ""),
                    new Claim("userId", user.Id.ToString()),
                    new Claim("email", user.EmailID),
                    //new Claim("phone_number", !string.IsNullOrEmpty(user.PhoneNumber) ? user.PhoneNumber : ""),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim("scope", string.Join(",", scope)),
                    new Claim("companyId", user.CompanyId.ToString())
                };

                var identity = new ClaimsIdentity(claims);

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

                var token = new JwtSecurityToken(
                    _config["Jwt:Issuer"],
                    _config["Jwt:Issuer"],
                    claims,
                    expires: DateTime.UtcNow.AddDays(1),
                    signingCredentials: creds
                );

                var refreshToken = new JwtSecurityTokenHandler().WriteToken(token);

                var tokenResponse = new TokenResponse
                {
                    access_token = new JwtSecurityTokenHandler().WriteToken(token),
                    refresh_token = refreshToken,
                    expires_in = token.ValidTo,
                    token_type = "Bearer"
                };

                return tokenResponse;
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Error generating token");
                return null; // Handle the error case appropriately
            }
        }

        public class TokenResponse
        {
            public string access_token { get; set; }
            public string refresh_token { get; set; }
            public DateTime expires_in { get; set; }
            public string token_type { get; set; }
        }

        #endregion


        #region Geospatial Project Methods

        #region Register & Login 

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel input)
        {
            try
            {
                if (input == null)
                {
                    return BadRequest();
                }

                MasterUser user = new MasterUser()
                {
                    Id = Guid.NewGuid(),
                    Username = input.Username == null ? input.Email : input.Username,
                    FirstName = input.FirstName,
                    LastName = input.LastName,
                    Credits = input.Credits,
                    Industry = input.Industry,
                    JobTitle = input.JobTitle,
                    Phonenumber = input.Phonenumber,
                    TenantId = 1,
                    Role = input.Role,
                    Email = input.Email,
                    Notification = true,
                    TwoFactorEnabled = false,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    PasswordHash = SecurityHelper.EncPwd(input.Password)
                };

                var res = await _unitOfWork.MasterUsers.Register(user);
                if (res)
                {
                    return Ok(new { isSuccess = true, message = $"User registration success" });
                }

                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        [Route("loginuser")]
        public async Task<IActionResult> Login([FromBody] LoginRequestModel input)
        {
            try
            {
                MasterUser user = await _unitOfWork.User.GetMasterUserByEmail(input.Email);
                var verifypwd = SecurityHelper.VerifyPwd(user.PasswordHash, input.Password);

                if (verifypwd == false)
                {
                    return Ok(new { message = "Email or password is incorrect", showOtpBox = false });
                }
                if (user == null)
                {
                    _logger.LogDebug("AccountController: Email or password is incorrect.");
                    return BadRequest(new { ErrorMessage = "Email or password is incorrect" });
                }

                if (user != null)
                {
                    // Save UserId in Session (if needed later)
                    HttpContext.Session.SetString("UserId", user.Email.ToString());

                    // Prepare new claims
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Amr, "pwd"),
                        new Claim(JwtRegisteredClaimNames.Aud, "quickapp_api"),
                        new Claim("client_id", "quickapp_spa"),
                        new Claim("idp", "local"),
                        new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                        new Claim(ClaimTypes.Name, user.Username),
                        new Claim(ClaimTypes.Email, user.Email),
                        new Claim("name", user.Username),
                        new Claim("roleId", user.Role),
                        new Claim("usertype", user.Role),
                        new Claim("userId", user.Id.ToString()),
                        new Claim("email", user.Email),
                        new Claim("roleName", user.Role.ToLower() == "admin" ? "Admin" : "User"),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                    };

                    var claimsIdentity = new ClaimsIdentity(claims, "custom", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);

                    var principal = new ClaimsPrincipal(claimsIdentity);

                    HttpContext.User = principal;

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

                    var token = new JwtSecurityToken(
                        _config["Jwt:Issuer"],
                        _config["Jwt:Issuer"],
                        claims,
                        expires: DateTime.UtcNow.AddDays(1),
                        signingCredentials: creds
                    );

                    // Return the JWT token
                    return Ok(new
                    {
                        access_token = new JwtSecurityTokenHandler().WriteToken(token),
                        refresh_token = new JwtSecurityTokenHandler().WriteToken(token),
                        expires_in = token.ValidTo,
                        token_type = "Bearer"
                    });
                }

                return Ok(new { message = "success", currentUserId = "cf924048-d661-4dd5-a16f-1958f355c201", userName = "Muniff  Kamaruddin" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion


        #region Password 

        [HttpPost]
        [Route("verfiypassword")]
        public async Task<IActionResult> VerifyPassword([FromBody] string currentPassword)
        {
            try
            {
                var currentUser = Utilities.GetUserId(this.User);
                var user = await _unitOfWork.MasterUsers.GetMasterUserById(currentUser);
                if (user == null) return NotFound();

                var verifypwd = SecurityHelper.VerifyPwd(user.PasswordHash, currentPassword);

                return Ok(new { verificationStatus = true, isSuccess = verifypwd });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut]
        [Route("resetpassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordInput input)
        {
            try
            {
                var currentUser = Utilities.GetUserId(this.User);
                var user = await _unitOfWork.MasterUsers.GetMasterUserById(currentUser);
                if (user == null) return NotFound();

                var verifypwd = SecurityHelper.VerifyPwd(user.PasswordHash, input.CurrentPassword);
                if (verifypwd == true)
                {
                    user.PasswordHash = SecurityHelper.EncPwd(input.NewPassword);
                    var res = await _unitOfWork.MasterUsers.UpdateProfile(user);
                    if (!res) return NotFound();

                    return Ok(new { isSuccess = true });
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Route("sendresetpwdlink")]
        public async Task<IActionResult> SendResetPwdLink(string emailid)
        {
            try
            {
                var user = await _unitOfWork.User.GetUserByEmail(emailid);
                if (user != null)
                {
                    string ResetPwdTempCode = new Random().Next(1, 999999).ToString();

                    await _unitOfWork.UserPwdHistoryRepository.Add(new UserPwdHistory
                    {
                        CreatedAt = DateTime.UtcNow,
                        OldPwd = user.PasswordHash,
                        IsLinkActive = true,
                        ResetPwdCode = ResetPwdTempCode,
                        UserId = user.Id,
                    });
                    _unitOfWork.SaveChanges();

                    var path = _environment.WebRootPath + "/Templates/ForgetPasswordTemplate.html";

                    var template = System.IO.File.ReadAllText(path);
                    template = template.Replace("[UsersName]", user.FirstName);
                    template = template.Replace("ResetPwdTempCode", ResetPwdTempCode);

                    var emailResponse = await _emailSender.SendEmailAsync(user.FirstName, emailid,
                    "Reset Password", template, null, true);

                    if (emailResponse.success)
                        return new OkObjectResult(new { message = "email sent", status = 200 });

                    return new OkObjectResult(new { message = "email sent failed", status = 200 });
                }

                return new OkObjectResult(new { message = "user does not exist", status = 400 });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        [Route("resetpwd")]
        public async Task<IActionResult> ResetPassword([FromBody] UpdatePwdVm model)
        {
            try
            {
                if (string.IsNullOrEmpty(model.ResetPwdCode))
                    return BadRequest("Reset password code is required.");

                //var userPwdHistory = _unitOfWork.UserPwdHistoryRepository.FindAsync(u => u.ResetPwdCode == resetpwdcode && u.IsLinkActive);
                var userPwdHistory = await _unitOfWork.UserPwdHistoryRepository.Get(model.ResetPwdCode);

                if (userPwdHistory == null)
                    return NotFound("Invalid or expired reset password code.");

                var user = await _unitOfWork.MasterUsers.GetMasterUserById(userPwdHistory.UserId.ToString());
                if (user == null)
                    return NotFound("User not found.");

                user.PasswordHash = SecurityHelper.EncPwd(model.NewPwd);

                userPwdHistory.IsLinkActive = false;
                userPwdHistory.UpdatedAt = DateTime.UtcNow;

                await _unitOfWork.SaveChangesAsync();

                return Ok(new { isSuccess = true, msg = "Password has been reset successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion


        #region User Settings

        [HttpGet]
        [Route("getprofile")]
        public async Task<IActionResult> GetProfile()
        {
            try
            {
                var currentUser = Utilities.GetUserId(this.User);
                var res = await _unitOfWork.MasterUsers.GetMasterUserById(currentUser);
                if (res == null) return NotFound();
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut]
        [Route("updateprofile")]
        public async Task<IActionResult> UpdateProfile([FromBody] MasterUser input)
        {
            try
            {
                var currentUserId = Utilities.GetUserId(this.User);
                var existingUser = await _unitOfWork.MasterUsers.GetMasterUserById(input.Id.ToString()); // Use Guid if needed

                if (existingUser == null) return NotFound();

                existingUser.FirstName = input.FirstName;
                existingUser.LastName = input.LastName;
                existingUser.Industry = input.Industry;
                existingUser.JobTitle = input.JobTitle;
                existingUser.Phonenumber = input.Phonenumber;
                existingUser.UpdatedAt = DateTime.UtcNow;
                //existingUser.UpdatedBy = currentUserId.ToString();

                var res = await _unitOfWork.MasterUsers.UpdateProfile(existingUser);

                if (!res) return NotFound();

                return Ok(new { isSuccess = res });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Route("notificationstatus")]
        public async Task<IActionResult> GetNotificationStatus()
        {
            try
            {
                var currentUserId = Utilities.GetUserId(this.User);
                var existingUser = await _unitOfWork.MasterUsers.GetMasterUserById(currentUserId);

                if (existingUser == null) return NotFound();

                return Ok(new[] { new { workspaceName = existingUser.UserName, email = existingUser.Email, isNotificationEnabled = existingUser.Notification } });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Route("currentemail")]
        public async Task<IActionResult> GetCurrentEmail()
        {
            try
            {
                var currentUserId = Utilities.GetUserId(this.User);
                var existingUser = await _unitOfWork.MasterUsers.GetMasterUserById(currentUserId);

                if (existingUser == null) return NotFound();

                return Ok(new { email = existingUser.Email });
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("setprofileimage")]
        public async Task<IActionResult> SetProfileImage([FromForm] IFormFile image)
        {
            try
            {
                if (image == null || image.Length == 0)
                {
                    return BadRequest("No file uploaded.");
                }

                var currentUserId = Utilities.GetUserId(this.User);
                var existingUser = await _unitOfWork.MasterUsers.GetMasterUserById(currentUserId);
                if (existingUser == null)
                {
                    return BadRequest("User not found!");
                }
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "profileimages");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var fileExtension = Path.GetExtension(image.FileName).ToLower();
                if (fileExtension != ".jpg" && fileExtension != ".png")
                {
                    fileExtension = ".jpg";
                }

                //var uniqueFileName = $"{existingUser.Id}_{existingUser.FirstName}{fileExtension}";
                var uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }

                existingUser.ProfileImage = $"/profileimages/{uniqueFileName}";

                var res = await _unitOfWork.MasterUsers.UpdateProfile(existingUser);

                return Ok(new { isSuccess = res });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut]
        [Route("updateEmail")]
        public async Task<IActionResult> UpdateEmail([FromBody] UpdateEmailInput input)
        {
            try
            {
                var currentUserId = Utilities.GetUserId(this.User);
                var existingUser = await _unitOfWork.MasterUsers.GetMasterUserById(currentUserId);

                existingUser.Email = input.NewEmail;

                var verifypwd = SecurityHelper.VerifyPwd(existingUser.PasswordHash, input.CurrentPassword);
                if (verifypwd)
                {
                    var res = await _unitOfWork.MasterUsers.UpdateProfile(existingUser);

                    if (!res) return NotFound();

                    return Ok(new { isSuccess = res });
                }

                return BadRequest();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Route("workspace")]
        public async Task<IActionResult> GetWorkSpaceDetails()
        {
            try
            {
                var currentUserId = Utilities.GetUserId(this.User);
                var existingUser = await _unitOfWork.MasterUsers.GetMasterUserById(currentUserId);
                return Ok(new { id = existingUser.Id, name = existingUser.Username });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Route("industry")]
        public async Task<IActionResult> GetIndustry()
        {
            try
            {
                var res = await _unitOfWork.IndustryType.GetIndustryType();
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Route("jobtitle")]
        public async Task<IActionResult> GetJobTitle()
        {
            try
            {
                var res = await _unitOfWork.JobTitle.GetJobTitle();
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion

        #endregion
    }
}
