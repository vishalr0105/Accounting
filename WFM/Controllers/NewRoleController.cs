using AutoMapper;
using DAL;
using DAL.Models;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WFM.ViewModels.Dtos;
using WFM.Helpers;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace WFM.Controllers
{
    //[Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class NewRoleController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger _logger;
        private readonly ApplicationDbContext _context;

        public NewRoleController(IMapper mapper, IUnitOfWork unitOfWork, ILogger<NewRoleController> logger, ApplicationDbContext context)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _logger = logger;
            _context = context;
        }


        [HttpGet("GetAllModules")]
        [ProducesResponseType(typeof(List<Module>), StatusCodes.Status200OK)]
        public async Task<List<ModulebyUser>> GetAllModules()
        {
            try
            {
                var currentUser = Utilities.GetUserType(this.User);
                var res = await _unitOfWork.NewRole.GetAllModules(currentUser);
                return res;
            }
            catch (Exception es)
            {
                throw;
            }
        }


        [HttpGet("GetAllFeatures")]
        [ProducesResponseType(typeof(List<Feature>), StatusCodes.Status200OK)]
        public async Task<List<Feature>> GetAllFeatures()
        {
            return await _unitOfWork.NewRole.GetAllFeatures();
        }


        [HttpGet("getModulesByUserType")]
        public async Task<ActionResult> GetModulesByUserType(string userType)
        {
            Guid? companyId = Utilities.GetCompanyId(this.User);
            var modulesData = await _context.CompanySidebar
            .Where(x => x.UserType == userType && x.CompanyId == companyId)
            .ToListAsync();
            var data = new List<CompanySidebarDto>();
            foreach (var module in modulesData)
            {
                CompanySidebarDto companySidebarDtocompanySidebarDto = new CompanySidebarDto()
                {
                    name = module.Name,
                    status = module.IsDeleted,
                };
                data.Add(companySidebarDtocompanySidebarDto);
            }

            return Ok(data);
        }


        [HttpPut("updateModules")]
        public async Task<ActionResult> UpdateModules([FromBody] UpdateModulesDto updateModulesDto)
        {
            if (updateModulesDto == null || string.IsNullOrEmpty(updateModulesDto.Module))
            {
                return BadRequest("Module field is required.");
            }

            Guid? companyId = Utilities.GetCompanyId(this.User);
            var modulesData = await _context.CompanySidebar
                .Where(x => x.UserType == updateModulesDto.UserType && x.Name == updateModulesDto.Module && x.CompanyId == companyId)
                .FirstOrDefaultAsync();

            if (modulesData != null)
            {
                if (!updateModulesDto.Selected)
                {
                    modulesData.IsDeleted = true;
                }
                else
                { modulesData.IsDeleted = false; }
                await _context.SaveChangesAsync(); // Save the changes to the database
            }

            return Ok(modulesData);
        }
    }
}
