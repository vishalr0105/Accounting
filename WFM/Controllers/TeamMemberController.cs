using AutoMapper;
using DAL;
using DAL.Models;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WFM.Helpers;
using Microsoft.Extensions.Options;
using DAL.Repositories.Interfaces;

namespace WFM.Controllers
{
    [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class TeamMemberController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWebHostEnvironment _environment;
        private readonly IEmailSender _emailSender;
        private readonly ApplicationDbContext _context;

        public TeamMemberController(IMapper mapper, IEmailSender emailSender, IOptions<AppSettings> appSettings, IUnitOfWork unitOfWork,
                              ILogger<TeamMemberController> logger, IWebHostEnvironment environment, ApplicationDbContext context)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _emailSender = emailSender;
            _environment = environment;
            _context = context;
        }


        [HttpPatch]
        [Route("updateUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async void updateUser(UserMaster teamMember)
        {


            var teamData = _mapper.Map<UserMaster>(teamMember);
            await _unitOfWork.SaveChangesAsync();
        }


        [HttpGet]
        [Route("GetCurrency")]
        [ProducesResponseType(typeof(Company), StatusCodes.Status200OK)]
        public async Task<Company> GetCurrency()
        {
            return await _unitOfWork.TeamMember.GetCurrency(Utilities.GetCompanyId(this.User).Value);
        }


        [HttpDelete]
        [Route("{id}")]
        public async Task Delete(Guid Id)
        {
            await _unitOfWork.TeamMember.DeleteTeamMember(Id);
            _unitOfWork.SaveChanges();
        }


        [HttpGet]
        [Route("getTeamMember/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<TeamMember> GetTeamMember(Guid id)
        {
            return await _unitOfWork.TeamMember.GetTeamMemberById(id);
        }


        [NonAction]
        public string SaveBase64Image(string base64string)
        {
            string filename = DateTime.Now.Ticks.ToString() + ".png";
            string filePath = Path.Combine(Environment.CurrentDirectory, "Uploads", "Profileimage", filename);
            byte[] byteArray = Convert.FromBase64String(base64string.Split(",")[1]);
            System.IO.File.WriteAllBytes(filePath, byteArray);
            return "Uploads/Profileimage/" + filename;
        }
    }
}
