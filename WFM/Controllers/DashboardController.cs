using AutoMapper;
using DAL;
using DAL.Core.Interfaces;
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
        private readonly IAccountManager _accountManager;
        protected readonly DbContext _context;

        private readonly ApplicationDbContext _appContext;
        public DashboardController(IMapper mapper, IUnitOfWork unitOfWork, ILogger<DashboardController> logger,
        IAccountManager accountManager, ApplicationDbContext context)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _logger = logger;
            _accountManager = accountManager;
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


        [HttpGet]
        [Route("GetNotificationList")]
        [ProducesResponseType(typeof(List<Notification>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(List<Notification>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(List<Notification>), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(List<Notification>), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<List<NotificationDto>>> GetNotifications(bool isNew = false)
        {
            try
            {
                var userr = Utilities.GetUserId(User);
                Guid userId = Guid.Parse(userr);
                return await _unitOfWork.Dashboard.GetNotifications(userId, isNew);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Route("MarkAsReadNotification")]
        public IActionResult MarkAsReadNotification()
        {
            var userr = Utilities.GetUserId(User);
            Guid userId = Guid.Parse(userr);
            _unitOfWork.Dashboard.MarkNotificationAsRead(userId);
            return Ok();
        }
    }
}