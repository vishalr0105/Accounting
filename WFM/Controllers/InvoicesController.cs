using AutoMapper;
using DAL;
using DAL.Core;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WFM.Helpers;
using Utilities = WFM.Helpers.Utilities;

namespace WFM.Controllers
{

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        readonly SmtpConfig _config;
        private readonly ApplicationDbContext _context;
        private readonly IEmailSender _emailSender;
        private readonly IConfiguration _configuration;
        private readonly ILogger _logger;
        private readonly IWebHostEnvironment _environment;
        private readonly IMapper _mapper;
        private IUnitOfWork _unitofwork;

        public InvoicesController(ILogger<InvoicesController> logger,
            ApplicationDbContext context, IEmailSender emailSender,
            IConfiguration configuration, IWebHostEnvironment environment,
            IMapper mapper, IUnitOfWork unitOfWork)
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
        [Route("invoices")]
        public async Task<IActionResult> GetInvoices()
        {
            _logger.LogInformation($"Called invoices API.");
            try
            {
                var res = $"invoices";
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("EstimateController: GetInvoices Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpGet]
        [Route("viewinvoice")]
        public async Task<IActionResult> ViewInvoice()
        {
            _logger.LogInformation($"Called viewinvoice API.");
            try
            {
                var res = $"viewinvoice";
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("EstimateController: ViewInvoice Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpPost]
        [Route("addinvoice")]
        public async Task<IActionResult> AddInvoice(InvoiceDto model)
        {
            _logger.LogInformation($"Called addinvoice API.");
            try
            {
                var res = $"addinvoice";
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("EstimateController: AddInvoice Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpPost]
        [Route("updateinvoice")]
        public async Task<IActionResult> UpdateInvoice(InvoiceDto model)
        {
            _logger.LogInformation($"Called updateinvoice API.");
            try
            {
                var res = $"updateinvoice";
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("EstimateController: UpdateInvoice Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpDelete]
        [Route("deleteinvoice")]
        public async Task<IActionResult> DeleteInvoice()
        {
            _logger.LogInformation($"Called deleteinvoice API.");
            try
            {
                var res = $"deleteinvoice";
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("EstimateController: DeleteInvoice Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpPost]
        [Route("sendinvoice")]
        public async Task<IActionResult> SendInvoice()
        {
            _logger.LogInformation($"Called sendinvoice API.");
            try
            {
                var res = $"sendinvoice";
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("EstimateController: SendInvoice Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpPost]
        [Route("shareinvoicelink")]
        public async Task<IActionResult> ShareInvoiceLink()
        {
            _logger.LogInformation($"Called shareinvoicelink API.");
            try
            {
                var res = $"shareinvoicelink";
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("EstimateController: ShareInvoiceLink Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpPost]
        [Route("viewinvoiceactivity")]
        public async Task<IActionResult> ViewInvoiceActivity()
        {
            _logger.LogInformation($"Called viewinvoiceactivity API.");
            try
            {
                var res = $"viewinvoiceactivity";
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("EstimateController: ViewInvoiceActivity Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpPost]
        [Route("printinvoice")]
        public async Task<IActionResult> PrintInvoice()
        {
            _logger.LogInformation($"Called printinvoice API.");
            try
            {
                var res = $"printinvoice";
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("EstimateController: PrintInvoice Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }
    }
}