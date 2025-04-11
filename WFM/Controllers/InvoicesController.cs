using Accounting.Helpers;
using AutoMapper;
using DAL;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using WFM.Helpers;
using Utilities = WFM.Helpers.Utilities;

namespace WFM.Controllers
{

    //[Authorize]
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

        public InvoicesController(ILogger<InvoicesController> logger, ApplicationDbContext context, IEmailSender emailSender,
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
            _logger.LogInformation($"Called gettotalcount API.");
            try
            {
                var count = await _unitofwork.SalesInvoiceHeaderRepository.GetSalesInvoiceCountAsync(status, date);
                return Ok(new { totalcount = 500 });
            }
            catch (Exception ex)
            {
                _logger.LogDebug("InvoiceController: GetTotalCount Error.");
                return BadRequest(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpGet]
        [Route("invoices")]
        public async Task<IActionResult> GetInvoices([FromQuery] int pageSize = 10, [FromQuery] int currentPage = 1, [FromQuery] string status = "all", [FromQuery] string date = "all")
        {
            _logger.LogInformation($"Called invoices API.");
            try
            {
                var siheaders = await _unitofwork.SalesInvoiceHeaderRepository.GetSalesInvoiceHeaders(pageSize, currentPage, status, date);
                var customerIds = siheaders.Select(item => item.CustomerId).Distinct().ToList();
                var customers = await _unitofwork.CustomerRepository.GetCustomersByIds(customerIds);
                var customerDictionary = customers.ToDictionary(c => c.Id, c => c.FirstName);

                List<InvoiceListItem> list = new List<InvoiceListItem>();
                foreach (var item in siheaders)
                {
                    customerDictionary.TryGetValue(item.CustomerId, out var customerName);

                    var hitem = new InvoiceListItem()
                    {
                        Id = item.Id,
                        Customer = customerName,
                        Date = DateTime.Parse(item.CreatedAt),
                        Status = ((InvoiceStatus)item.Status).ToString(),
                        No = item.No,
                        Amount = item.Amount
                    };

                    list.Add(hitem);
                }

                return Ok(list.Skip((currentPage - 1) * pageSize).Take(pageSize).ToList());


                //var allInvoices = GenerateSampleInvoices();
                //var filteredInvoices = allInvoices.AsQueryable();

                //if (status != "all")
                //{
                //    filteredInvoices = filteredInvoices.Where(i => i.Status.Equals(status, StringComparison.OrdinalIgnoreCase));
                //}
                ////if (date != "all")
                ////{
                ////    var targetDate = DateTime.ParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                ////    filteredInvoices = filteredInvoices.Where(i => DateTime.Parse().Date == targetDate.Date);
                ////}
                //var totalCount = filteredInvoices.Count();
                //var pagedInvoices = filteredInvoices.Skip((currentPage - 1) * pageSize).Take(pageSize).ToList();
                //return Ok(pagedInvoices);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("InvoiceController: GetInvoices Error.");
                return BadRequest(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }

        private List<InvoiceListItem> GenerateSampleInvoices()
        {
            var random = new Random();
            var customers = new[] { "Bob", "Alice", "Charlie", "David", "Eve", "Frank", "Grace", "Henry", "Ivy", "Jack" };
            var statuses = new[] { "PendingApproval", "Approved", "Rejected", "Paid", "Cancelled" };

            var invoices = new List<InvoiceListItem>();
            var startDate = new DateTime(2025, 1, 1);
            var endDate = new DateTime(2025, 12, 31);
            var dateRange = (endDate - startDate).Days;

            for (int i = 0; i < 500; i++)
            {
                var randomDays = random.Next(dateRange);
                var randomTime = TimeSpan.FromSeconds(random.Next(86400));
                var randomDate = startDate.AddDays(randomDays).Add(randomTime);

                invoices.Add(new InvoiceListItem
                {
                    Id = Guid.NewGuid(),
                    Date = DateTime.Now,
                    No = (i + 1).ToString("D3"),
                    Customer = customers[random.Next(customers.Length)],
                    Amount = (decimal)Math.Round(random.NextDouble() * 1000, 2),
                    Status = statuses[random.Next(statuses.Length)]
                });
            }

            return invoices;
        }

        [HttpGet]
        [Route("statuslist")]
        public async Task<IActionResult> GetStatusList()
        {
            _logger.LogInformation($"Called statuslist API.");
            try
            {
                var statuslist = await _unitofwork.SalesInvoiceHeaderRepository.GetDistinctStatuses();
                return Ok(statuslist);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("InvoiceController: GetStatusList Error.");
                return BadRequest(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpGet]
        [Route("viewinvoice")]
        public async Task<IActionResult> ViewInvoice(string id)
        {
            _logger.LogInformation($"Called viewinvoice API.");
            try
            {
                var headerId = Guid.Parse(id);
                var header = await _unitofwork.SalesInvoiceHeaderRepository.GetSalesInvoiceHeaderById(headerId);
                var lines = await _unitofwork.SalesInvoiceLineRepository.GetSalesInvoiceLineByHeaderId(headerId);
                var customer = await _unitofwork.CustomerRepository.GetCustomerById(header.CustomerId);
                var cust = new Customer1()
                {
                    Id = customer.Id,
                    Email = customer.Email,
                    Name = $"{customer.FirstName} {customer.LastName}",
                    PhoneNumber = "902837487",
                    UnbilledCharges = 0.00M

                };
                var items = new List<InvoiceItem>();
                foreach (var item in lines)
                {
                    var line = new InvoiceItem()
                    {
                        Product = item.ItemId,
                        Qty = item.Quantity,
                        Rate = item.Amount,
                        Tax = item.Tax,
                        Description = "item.Description"
                    };
                    items.Add(line);
                }
                var res = new InvoiceCreateReq()
                {
                    SelectedCustomer = cust,
                    Subtotal = header.SubTotal,
                    SelectedTaxRate = header.TaxPercent / 100,
                    TaxableSubtotal = header.TaxableSubtotal,
                    InvoiceTotal = header.Amount,
                    InvoiceDate = DateTime.Parse(header.CreatedAt),
                    DueDate = DateTime.Parse(header.DueDate),
                    SalesTax = header.TaxAmount,
                    Terms = "Net 30",
                    Items = items,
                    BalanceDue = 0.00M,
                    CompanyName = "Sandbox Company_US_2",
                    CompanyAddress = "123 Sierra Way, San Pablo CA 87999",
                    CustomerNote = "Thank you for your business and have a great day!",
                };

                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("InvoiceController: ViewInvoice Error.");
                return BadRequest(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpPost]
        [Route("addinvoice")]
        public async Task<IActionResult> AddInvoice([FromBody] InvoiceCreateReq model)
        {
            _logger.LogInformation($"Called addinvoice API.");
            try
            {
                var currentUser = Utilities.GetUserId(this.User);
                var tenantId = Guid.NewGuid();
                var glheader = new GeneralLedgerHeader()
                {
                    Id = Guid.NewGuid(),
                    DocumentType = (int)ProductType.Invoice,
                    TenantId = tenantId,
                    Description = $"New invoice is created",
                    CreatedBy = currentUser,
                    CreatedAt = DateTime.UtcNow.ToString()
                };
                var no = await _unitofwork.SalesInvoiceHeaderRepository.GetNextNo();
                var glline = new GeneralLedgerLine()
                {
                    Id = Guid.NewGuid(),
                    GeneralLedgerHeaderId = glheader.Id,
                    Amount = model.InvoiceTotal,
                    TenantId = tenantId,
                    CreatedBy = currentUser,
                    CreatedAt = DateTime.UtcNow.ToString()
                };

                var siheader = new SalesInvoiceHeader()
                {
                    Id = Guid.NewGuid(),
                    CustomerId = model.SelectedCustomer.Id,
                    GeneralLedgerHeaderId = glheader.Id,
                    TenantId = tenantId,
                    SubTotal = model.Subtotal,
                    Amount = model.InvoiceTotal,
                    TaxAmount = model.SalesTax,
                    TaxPercent = model.SelectedTaxRate * 100,
                    TaxableSubtotal = model.TaxableSubtotal,
                    DueDate = model.DueDate.ToString(),
                    No = no,
                    CreatedBy = currentUser,
                    Status = 1,
                    CreatedAt = DateTime.UtcNow.ToString()
                };

                foreach (var item in model.Items)
                {
                    var siline = new SalesInvoiceLine()
                    {
                        Id = Guid.NewGuid(),
                        SalesInvoiceHeaderId = siheader.Id,
                        ItemId = item.Product,
                        Quantity = item.Qty,
                        SalesOrderLineId = Guid.Empty,
                        Amount = item.Qty * item.Rate,
                        TenantId = tenantId,
                        CreatedBy = currentUser,
                        CreatedAt = DateTime.UtcNow.ToString()
                    };
                    await _unitofwork.SalesInvoiceLineRepository.CreateSalesInvoiceLine(siline);
                }

                await _unitofwork.GeneralLedgerHeaderRepository.CreateGeneralLedgerHeader(glheader);
                await _unitofwork.GeneralLedgerLineRepository.CreateGeneralLedgerLine(glline);
                await _unitofwork.SalesInvoiceHeaderRepository.CreateSalesInvoiceHeader(siheader);

                return Ok(new { isSuccess = true, message = $"Invoice added Successfully..!" });
            }
            catch (Exception ex)
            {
                _logger.LogDebug("InvoiceController: AddInvoice Error.");
                return BadRequest(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpPost]
        [Route("updateinvoice")]
        public async Task<IActionResult> UpdateInvoice(string id, [FromBody] InvoiceCreateReq model)
        {
            _logger.LogInformation($"Called updateinvoice API.");
            try
            {
                var headerId = Guid.Parse(id);
                var originalheader = await _unitofwork.SalesInvoiceHeaderRepository.GetSalesInvoiceHeaderById(headerId);

                var updatedheader = new SalesInvoiceHeader()
                {
                    Id = headerId,
                    CustomerId = model.SelectedCustomer.Id,
                    SubTotal = model.Subtotal,
                    Amount = model.InvoiceTotal,
                    TaxAmount = model.SalesTax,
                    TaxPercent = model.SelectedTaxRate * 100,
                    TaxableSubtotal = model.TaxableSubtotal,
                    No = originalheader.No,
                    CreatedBy = originalheader.CreatedBy,
                    Status = originalheader.Status,
                    CreatedAt = originalheader.CreatedAt,
                    DueDate = model.DueDate.ToString(), // Format as needed
                    UpdatedAt = DateTime.UtcNow.ToString() // If needed, format this too
                };
                var updateSuccess = await _unitofwork.SalesInvoiceHeaderRepository.UpdateSalesInvoiceHeader(updatedheader);
                if (!updateSuccess)
                {
                    _logger.LogError($"Failed to update invoice header with ID {headerId}.");
                    return BadRequest(new { Message = "Error updating invoice." });
                }

                var existingLines = await _unitofwork.SalesInvoiceLineRepository.GetSalesInvoiceLineByHeaderId(headerId);
                foreach (var line in existingLines)
                {
                    await _unitofwork.SalesInvoiceLineRepository.DeleteSalesInvoiceLine(line.Id);
                }

                foreach (var item in model.Items)
                {
                    var siline = new SalesInvoiceLine()
                    {
                        Id = Guid.NewGuid(),  // Generate a new GUID for the new line
                        SalesInvoiceHeaderId = updatedheader.Id,
                        ItemId = item.Product,
                        Quantity = item.Qty,
                        SalesOrderLineId = Guid.Empty,  // Assuming this is empty for now
                        Amount = item.Qty * item.Rate,
                        UpdatedAt = DateTime.UtcNow.ToString()
                    };

                    var lineSuccess = await _unitofwork.SalesInvoiceLineRepository.CreateSalesInvoiceLine(siline);
                    if (lineSuccess == null)
                    {
                        _logger.LogError($"Failed to add new invoice line for product ID {item.Product}");
                    }
                }

                _logger.LogInformation($"Invoice with ID {headerId} updated successfully.");

                return Ok(new { Message = "Invoice updated successfully", InvoiceId = headerId });
            }
            catch (Exception ex)
            {
                _logger.LogDebug("InvoiceController: UpdateInvoice Error.");
                return BadRequest(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
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
                _logger.LogDebug("InvoiceController: DeleteInvoice Error.");
                return BadRequest(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
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
                _logger.LogDebug("InvoiceController: SendInvoice Error.");
                return BadRequest(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
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
                _logger.LogDebug("InvoiceController: ShareInvoiceLink Error.");
                return BadRequest(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
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
                _logger.LogDebug("InvoiceController: ViewInvoiceActivity Error.");
                return BadRequest(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
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
                _logger.LogDebug("InvoiceController: PrintInvoice Error.");
                return BadRequest(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }
    }
}