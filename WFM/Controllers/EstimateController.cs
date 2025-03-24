using AutoMapper;
using DAL.Repositories.Interfaces;
using DAL;
using Microsoft.AspNetCore.Mvc;
using WFM.Helpers;
using WFM;
using DAL.Core;
using DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace Accounting.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstimateController : ControllerBase
    {
        readonly SmtpConfig _config;
        private readonly ApplicationDbContext _context;
        private readonly IEmailSender _emailSender;
        private readonly IConfiguration _configuration;
        private readonly ILogger _logger;
        private readonly IWebHostEnvironment _environment;
        private readonly IMapper _mapper;
        private IUnitOfWork _unitofwork;

        public EstimateController(ILogger<EstimateController> logger, ApplicationDbContext context, IEmailSender emailSender,
            IConfiguration configuration, IWebHostEnvironment environment, IMapper mapper, IUnitOfWork unitOfWork)
        {
            _context = context;
            _emailSender = emailSender;
            _configuration = configuration;
            _logger = logger;
            _environment = environment;
            _mapper = mapper;
            _unitofwork = unitOfWork;
        }


        [HttpGet]
        [Route("estimates")]
        public async Task<IActionResult> GetEstimates()
        {
            _logger.LogInformation($"Called estimates API.");
            try
            {
                var res = $"estimates";
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("EstimateController: GetEstimates Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpGet]
        [Route("viewestimate")]
        public async Task<IActionResult> ViewEstimate()
        {
            _logger.LogInformation($"Called viewestimate API.");
            try
            {
                var res = $"viewestimate";
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("EstimateController: ViewEstimate Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpPost]
        [Route("addestimate")]
        public async Task<IActionResult> AddEstimate(InvoiceDto model)
        {
            _logger.LogInformation($"Called addestimate API.");
            try
            {
                var res = $"addestimate";
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("EstimateController: AddEstimate Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpPost]
        [Route("updateestimate")]
        public IActionResult UpdateEstimate(InvoiceDto model)
        {
            _logger.LogInformation($"Called updateestimate API.");
            try
            {
                var res = $"updateestimate";
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("EstimateController: UpdateEstimate Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpDelete]
        [Route("deleteestimate")]
        public async Task<IActionResult> DeleteEstimate()
        {
            _logger.LogInformation($"Called deleteestimate API.");
            try
            {
                var res = $"deleteestimate";
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("EstimateController: DeleteEstimate Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpPost]
        [Route("sendestimate")]
        public async Task<IActionResult> SendEstimate()
        {
            _logger.LogInformation($"Called sendestimate API.");
            try
            {
                var res = $"sendestimate";
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("EstimateController: SendEstimate Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpPost]
        [Route("shareestimatelink")]
        public async Task<IActionResult> ShareEstimateLink()
        {
            _logger.LogInformation($"Called shareestimatelink API.");
            try
            {
                var res = $"shareestimatelink";
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("EstimateController: ShareEstimateLink Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpPost]
        [Route("viewestimateactivity")]
        public async Task<IActionResult> ViewEstimateActivity()
        {
            _logger.LogInformation($"Called viewestimateactivity API.");
            try
            {
                var res = $"viewestimateactivity";
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("EstimateController: ViewEstimateActivity Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpPost]
        [Route("printestimate")]
        public async Task<IActionResult> PrintEstimate()
        {
            _logger.LogInformation($"Called printestimate API.");
            try
            {
                var res = $"printestimate";
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("EstimateController: PrintEstimate Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }
    }
}
