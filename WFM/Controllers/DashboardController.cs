using AutoMapper;
using DAL;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WFM.Helpers;
using WFM.ViewModels.Dtos;

namespace WFM.Controllers
{
    //[Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger _logger;
        protected readonly DbContext _context;
        private readonly ApplicationDbContext _appContext;

        public DashboardController(IMapper mapper, IUnitOfWork unitOfWork, ILogger<DashboardController> logger,
         ApplicationDbContext context)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _logger = logger;
            _appContext = context;
        }


        [HttpGet]
        [Route("list")]
        [ProducesResponseType(typeof(List<DashboardDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(List<DashboardDto>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(List<DashboardDto>), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(List<DashboardDto>), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<List<DashboardDto>>> GetDashboards(bool isActive = true)
        {
            try
            {
                return Ok(_mapper.Map<List<DashboardDto>>(await _unitOfWork.Dashboard.GetDashboards(isActive)));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest(ex.Message);
            }
        }

    }
}