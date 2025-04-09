using AutoMapper;
using DAL.Repositories.Interfaces;
using DAL;
using Microsoft.AspNetCore.Mvc;
using WFM.Helpers;
using WFM;
using Accounting.Helpers;
using DAL.Models;
using iTextSharp.text;

namespace Accounting.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesOrderController : ControllerBase
    {
        readonly SmtpConfig _config;
        private readonly ApplicationDbContext _context;
        private readonly IEmailSender _emailSender;
        private readonly IConfiguration _configuration;
        private readonly ILogger _logger;
        private readonly IWebHostEnvironment _environment;
        private readonly IMapper _mapper;
        private IUnitOfWork _unitofwork;

        public SalesOrderController(ILogger<SalesOrderController> logger, ApplicationDbContext context, IEmailSender emailSender,
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
        [Route("gettotalcount")]
        public async Task<IActionResult> GetTotalCount([FromQuery] string status = "all", [FromQuery] string date = "all")
        {
            var count = await _unitofwork.SalesOrderHeaderRepository.GetSalesOrderCountAsync(status, date);
            return Ok(new { totalcount = count });
        }


        [HttpGet]
        [Route("statuslist")]
        public async Task<IActionResult> GetStatusList()
        {
            try
            {
                var statuslist = await _unitofwork.SalesOrderHeaderRepository.GetDistinctStatuses();
                return Ok(statuslist);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("InvoiceController: GetStatusList Error.");
                return BadRequest(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpGet]
        [Route("salesorders")]
        public async Task<IActionResult> GetSalesOrders([FromQuery] int pageSize = 10, [FromQuery] int currentPage = 1, [FromQuery] string status = "all", [FromQuery] string date = "all")
        {
            _logger.LogInformation($"Called salesorders API.");
            try
            {
                List<InvoiceListItem> list = new List<InvoiceListItem>();

                var siheaders = await _unitofwork.SalesOrderHeaderRepository.GetSalesOrderHeaders(pageSize, currentPage, status, date);
                foreach (var item in siheaders)
                {
                    var customer = await _unitofwork.CustomerRepository.GetCustomerById(item.CustomerId);
                    var hitem = new InvoiceListItem()
                    {
                        Id = item.Id,
                        Customer = customer.FirstName,
                        Date = DateTime.Parse(item.CreatedAt),
                        //Status = item.Status.ToString(),
                        Status = ((InvoiceStatus)item.Status).ToString(),
                        No = item.No,
                        Amount = item.Amount
                    };
                    list.Add(hitem);
                }
                var filteredList = list.AsEnumerable();

                return Ok(filteredList.Skip((currentPage - 1) * pageSize).Take(pageSize).ToList());
            }
            catch (Exception ex)
            {
                _logger.LogDebug("SalesOrderController: GetSalesOrders Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpGet]
        [Route("viewsalesorder")]
        public async Task<IActionResult> ViewSalesOrder(string id)
        {
            _logger.LogInformation($"Called viewsalesorder API.");
            try
            {
                var headerId = Guid.Parse(id);
                var header = await _unitofwork.SalesOrderHeaderRepository.GetSalesOrderHeaderById(headerId);
                var lines = await _unitofwork.SalesOrderLineRepository.GetSalesOrderLineByHeaderId(headerId);
                var customer = await _unitofwork.CustomerRepository.GetCustomerById(header.CustomerId);
                var items = new List<Item>();
                foreach (var item in lines)
                {
                    var line = new Item()
                    {
                        Product = item.ItemId,
                        Quantity = item.Quantity,
                        Rate = item.Amount,
                        Taxable = item.Tax,
                        Description = "item.Description"
                    };
                    items.Add(line);
                }
                var custinfo = new CustomerInfo()
                {
                    BillTo = header.BillTo,
                    ShipTo = header.ShipTo,
                    Customer = header.CustomerId.ToString()
                };
                var notes = new Notes()
                {
                    CustomerNotes = "Thank you",
                    InternalNotes = "Thank you"
                };
                var orderinfo = new OrderInfo()
                {
                    OrderDate = DateTime.Parse(header.CreatedAt),
                    OrderNumber = header.No
                };
                var summary = new Summary()
                {
                    Subtotal = header.SubTotal,
                    Total = header.Amount,
                    Tax = header.TaxableSubtotal,
                    TaxRate = header.TaxPercent
                };
                var res = new SalesOrderCreateReq()
                {
                    CustomerInfo = custinfo,
                    Items = items,
                    Notes = notes,
                    OrderInfo = orderinfo,
                    Summary = summary
                };

                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("SalesOrderController: ViewSalesOrder Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpPost]
        [Route("addsalesorder")]
        public async Task<IActionResult> AddSalesOrder([FromBody] SalesOrderCreateReq model)
        {
            try
            {
                var currentUser = WFM.Helpers.Utilities.GetUserId(this.User);
                var tenantId = Guid.NewGuid();
                var glheader = new GeneralLedgerHeader()
                {
                    Id = Guid.NewGuid(),
                    DocumentType = (int)ProductType.Invoice,
                    TenantId = tenantId,
                    Description = $"New Sales Order is created",
                    CreatedBy = currentUser,
                    CreatedAt = DateTime.UtcNow.ToString()
                };
                var no = await _unitofwork.SalesOrderHeaderRepository.GetNextNo();
                var glline = new GeneralLedgerLine()
                {
                    Id = Guid.NewGuid(),
                    GeneralLedgerHeaderId = glheader.Id,
                    Amount = model.Summary.Total,
                    TenantId = tenantId,
                    CreatedBy = currentUser,
                    CreatedAt = DateTime.UtcNow.ToString()
                };

                var sqheader = new SalesOrderHeader()
                {
                    Id = Guid.NewGuid(),
                    CustomerId = Guid.Parse(model.CustomerInfo.Customer),
                    BillTo = model.CustomerInfo.BillTo,
                    ShipTo = model.CustomerInfo.ShipTo,
                    GeneralLedgerHeaderId = glheader.Id,
                    TenantId = tenantId,
                    Amount = model.Summary.Total,
                    SubTotal = model.Summary.Subtotal,
                    TaxPercent = model.Summary.TaxRate * 100,
                    TaxAmount = model.Summary.Tax,
                    No = no,
                    CreatedBy = currentUser,
                    Status = 1,
                    CreatedAt = DateTime.UtcNow.ToString()
                };

                foreach (var item in model.Items)
                {
                    var sqline = new SalesOrderLine()
                    {
                        Id = Guid.NewGuid(),
                        SalesOrderHeaderId = sqheader.Id,
                        ItemId = item.Product,
                        Quantity = item.Quantity,
                        Amount = item.Quantity * item.Rate,
                        TenantId = tenantId,
                        CreatedBy = currentUser,
                        CreatedAt = DateTime.UtcNow.ToString()
                    };
                    await _unitofwork.SalesOrderLineRepository.CreateSalesOrderLine(sqline);
                }

                await _unitofwork.GeneralLedgerHeaderRepository.CreateGeneralLedgerHeader(glheader);
                await _unitofwork.GeneralLedgerLineRepository.CreateGeneralLedgerLine(glline);
                await _unitofwork.SalesOrderHeaderRepository.CreateSalesOrderHeader(sqheader);

                return Ok(new { isSuccess = true, message = $"SalesOrder added Successfully..!" });
            }
            catch (Exception ex)
            {
                _logger.LogDebug("SalesOrderController: AddSalesOrder Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpPost]
        [Route("updatesalesorder")]
        public async Task<IActionResult> UpdateSalesOrder(string id, [FromBody] SalesOrderCreateReq model)
        {
            _logger.LogInformation($"Called updatesalesorder API.");
            try
            {
                var headerId = Guid.Parse(id);
                var originalheader = await _unitofwork.SalesOrderHeaderRepository.GetSalesOrderHeaderById(headerId);

                var updatedheader = new SalesOrderHeader()
                {
                    Id = headerId,
                    CustomerId = Guid.Parse(model.CustomerInfo.Customer),
                    BillTo = model.CustomerInfo.BillTo,
                    ShipTo = model.CustomerInfo.ShipTo,
                    Amount = model.Summary.Total,
                    SubTotal = model.Summary.Subtotal,
                    TaxAmount = model.Summary.Tax,
                    TaxableSubtotal = model.Summary.Subtotal,
                    TaxPercent = model.Summary.TaxRate * 100,
                    No = originalheader.No,
                    CreatedBy = originalheader.CreatedBy,
                    Status = originalheader.Status,
                    CreatedAt = originalheader.CreatedAt,
                    UpdatedAt = DateTime.UtcNow.ToString()
                };
                var updateSuccess = await _unitofwork.SalesOrderHeaderRepository.UpdateSalesOrderHeader(updatedheader);
                if (!updateSuccess)
                {
                    _logger.LogError($"Failed to update sales order header with ID {headerId}.");
                    return BadRequest(new { Message = "Error updating sales order." });
                }

                var existingLines = await _unitofwork.SalesOrderLineRepository.GetSalesOrderLineByHeaderId(headerId);
                foreach (var line in existingLines)
                {
                    await _unitofwork.SalesOrderLineRepository.DeleteSalesOrderLine(line.Id);
                }

                foreach (var item in model.Items)
                {
                    var siline = new SalesOrderLine()
                    {
                        Id = Guid.NewGuid(),
                        SalesOrderHeaderId = updatedheader.Id,
                        ItemId = item.Product,
                        Quantity = item.Quantity,
                        //SalesOrderLineId = Guid.Empty,
                        Amount = item.Quantity * item.Rate,
                        UpdatedAt = DateTime.UtcNow.ToString()
                    };

                    var lineSuccess = await _unitofwork.SalesOrderLineRepository.CreateSalesOrderLine(siline);
                    if (lineSuccess == null)
                    {
                        _logger.LogError($"Failed to add new sales order line for product ID {item.Product}");
                    }
                }

                _logger.LogInformation($"Sales Order with ID {headerId} updated successfully.");

                return Ok(new { Message = "Sales Order updated successfully", InvoiceId = headerId });
            }
            catch (Exception ex)
            {
                _logger.LogDebug("SalesOrderController: UpdateSalesOrder Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpDelete]
        [Route("deletesalesorder")]
        public async Task<IActionResult> DeleteSalesOrder()
        {
            _logger.LogInformation($"Called deletesalesorder API.");
            try
            {
                var res = $"deletesalesorder";
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("SalesOrderController: DeleteSalesOrder Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }
    }
}
