using AutoMapper;
using DAL;
using DAL.Core;
using DAL.Models;
using DAL.Models.TempModels;
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


        [HttpPost]
        [Route("AddInvoice")]
        public async Task<IActionResult> addInvoice(InvoiceDto model)
        {
            try
            {
                var invoiceExist = await _context.InvoicesTable.SingleOrDefaultAsync(d => d.InvoiceNu == model.invoiceData.InvoiceNu);

                if (invoiceExist == null)
                {
                    model.invoiceData.CreatedAt = DateTime.UtcNow;
                    model.invoiceData.CreatedBy = Utilities.GetUserId(User);
                    model.invoiceData.sendToUser = false;
                    model.invoiceData.CompanyId = Utilities.GetCompanyId(User);
                    var data = await _context.InvoicesTable.AddAsync(model.invoiceData);
                    for (int i = 0; i < model.items.Count; i++)
                    {
                    }
                    var returnModel = _mapper.Map<InvoiceModelDto>(model.invoiceData);
                    _unitofwork.NotificationSettingRepository.IsNotificationSubscribed(new Notification
                    {
                        Notifications = "New Invoice Created",
                        NotificationTypeId = (int)NotificaitonTypes.NewInvoiceCreated,
                        UserId = new Guid(Utilities.GetUserId(User)),
                        UpdatedAt = DateTime.Now,
                        CompanyId = Utilities.GetCompanyId(User)!.Value,
                    });
                    _context.SaveChanges();
                    return Ok(returnModel.Id);
                }
                return BadRequest("Invoice is already exists");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest(ex.Message);
            }
        }

    }
}