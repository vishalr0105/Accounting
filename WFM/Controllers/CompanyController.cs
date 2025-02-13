using AutoMapper;
using DAL;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Serilog;
using WFM.Helpers;
using WFM.ViewModels.Dtos;

namespace WFM.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ApplicationDbContext _db;

        public CompanyController(IMapper mapper, IUnitOfWork unitOfWork, ILogger<CompanyController> logger, ApplicationDbContext context)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _db = context;
        }


        [HttpGet]
        [ProducesResponseType(typeof(CompanyDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(CompanyDto), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(CompanyDto), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(CompanyDto), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<CompanyDto>> GetCompany()
        {
            try
            {
                var companyId = Utilities.GetCompanyId(this.User).Value;
                var company = await _unitOfWork.Company.GetCompany(companyId);

                if (company == null)
                    return NotFound("Company not found");

                var outputData = _mapper.Map<CompanyDto>(company);

                if (!string.IsNullOrEmpty(outputData.Image))
                {
                    // Convert image path to Base64
                    var filePath = Path.Combine(outputData.Image);
                    if (System.IO.File.Exists(filePath))
                    {
                        outputData.Image = "data:image/png;base64," + Convert.ToBase64String(System.IO.File.ReadAllBytes(filePath));
                    }
                    else
                    {
                        outputData.Image = "../assets/images/NoLogo.jpg";
                    }
                }
                else
                {
                    outputData.Image = "../assets/images/NoLogo.jpg";
                }

                return Ok(outputData);
            }
            catch (Exception ex)
            {
                Log.Fatal("error", JsonConvert.SerializeObject(ex));
                return BadRequest(ex.Message);
            }
        }


        [AllowAnonymous]
        [HttpPost]
        [Route("AddCompany")]
        [ProducesResponseType(typeof(Guid?), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Guid?), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(Guid?), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(Guid?), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Guid?>> CreateCompany([FromBody] CompanyDto args)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (!await _unitOfWork.Company.CompanyExist(args.CompanyName))
                    {
                        var company = _mapper.Map<Company>(args);
                        company.Id = Guid.NewGuid();
                        Guid companyId = await _unitOfWork.Company.AddCompany(company, "");
                        _unitOfWork.SaveChanges();
                        return Ok(companyId);
                    }
                    else
                    {
                        return Ok(0000);
                    }
                }

                return BadRequest(ModelState.Values
                    .Aggregate(
                        new List<string>(), (a, c) =>
                        {
                            a.AddRange(c.Errors.Select(r => r.ErrorMessage));
                            return a;
                        }, a => a)
                    );
            }
            catch (Exception ex)
            {
                Log.Fatal("error", JsonConvert.SerializeObject(ex));
                return BadRequest(ex.Message);
            }
        }


        [HttpPatch]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult UpdateCompany([FromBody] CompanyDto company)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var data = _mapper.Map<Company>(company);
                    data.UpdatedBy = Utilities.GetUserId(this.User);
                    data.Id = Utilities.GetCompanyId(this.User).Value;

                    _unitOfWork.Company.UpdateCompany(data);

                    _unitOfWork.SaveChanges();
                    return Ok();
                }

                return BadRequest(ModelState.Values
                    .Aggregate(
                        new List<string>(), (a, c) =>
                        {
                            a.AddRange(c.Errors.Select(r => r.ErrorMessage));
                            return a;
                        }, a => a)
                    );
            }
            catch (Exception ex)
            {
                Log.Fatal("error", JsonConvert.SerializeObject(ex));
                Log.Information(JsonConvert.SerializeObject(ex));
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        [Route("UpdateNotificationSetting")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult UpdateNotificationSetting(List<NotificationType> settings)
        {
            var companyid = _unitOfWork.Company.GetCompany(Utilities.GetCompanyId(this.User).Value).Result;
            var notificationsettings = _unitOfWork.NotificationSettingRepository
                                           .Find(x => x.CompanyId == companyid.Id.ToString()).ToList();
            for (int i = 0; i < notificationsettings.Count - 1; i++)
            {
                if (i < settings.Count())
                {
                    notificationsettings[i].Subscribed = settings[i].Subscribed;
                }
            }
            _unitOfWork.NotificationSettingRepository.UpdateRange(notificationsettings);
            _unitOfWork.SaveChanges();

            return Ok();
        }


        [HttpGet]
        [Route("get_allcompany")]
        [ProducesResponseType(typeof(List<AllCompanyDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<List<AllCompanyDto>>> GetAllCompany()
        {
            try
            {
                // Query the database for all company details
                var companyData = await _db.Company.ToListAsync();

                if (companyData == null || companyData.Count == 0)
                {
                    return NotFound("No companies found.");
                }

                var contactDetailsDto = new List<AllCompanyDto>();

                foreach (var cd in companyData)
                {
                }

                return Ok(contactDetailsDto);
            }
            catch (Exception ex)
            {
                // Log the exception with stack trace for debugging
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }


        [HttpGet]
        [Route("GetPaymentSettingByCompany")]
        public IActionResult GetPaymentSettingByCompany()
        {
            var companyid = Utilities.GetCompanyId(User);
            var company = _unitOfWork.Company.GetSingleOrDefault(x => x.Id == companyid);
            return new OkObjectResult(new { stripe = company.StripeAccount, paypal = company.PaypalAccount });
        }
    }
}
