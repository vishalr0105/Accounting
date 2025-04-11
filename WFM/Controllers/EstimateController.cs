using AutoMapper;
using DAL.Repositories.Interfaces;
using DAL;
using Microsoft.AspNetCore.Mvc;
using WFM.Helpers;
using WFM;
using DAL.Models;
using Accounting.Helpers;

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
        [Route("gettotalcount")]
        public async Task<IActionResult> GetTotalCount([FromQuery] string status = "all", [FromQuery] string date = "all")
        {
            _logger.LogInformation($"Called gettotalcount API.");

            try
            {
                var count = await _unitofwork.SalesQuoteHeaderRepository.GetSalesQuoteCountAsync(status, date);
                return Ok(new { totalcount = count });
            }
            catch (Exception ex)
            {
                _logger.LogDebug("EstimateController: GetTotalCount Error.");
                return BadRequest(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpGet]
        [Route("statuslist")]
        public async Task<IActionResult> GetStatusList()
        {
            _logger.LogInformation($"Called statuslist API.");
            try
            {
                var statuslist = await _unitofwork.SalesQuoteHeaderRepository.GetDistinctStatuses();
                return Ok(statuslist);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("InvoiceController: GetStatusList Error.");
                return BadRequest(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpGet]
        [Route("estimates")]
        public async Task<IActionResult> GetEstimates([FromQuery] int pageSize = 10, [FromQuery] int currentPage = 1, [FromQuery] string status = "all", [FromQuery] string date = "all")
        {
            _logger.LogInformation($"Called estimates API.");
            try
            {
                var sqheaders = await _unitofwork.SalesQuoteHeaderRepository.GetSalesQuoteHeaders(pageSize, currentPage, status, date);
                var customerIds = sqheaders.Select(item => item.CustomerId).Distinct().ToList();
                var customers = await _unitofwork.CustomerRepository.GetCustomersByIds(customerIds);
                var customerDictionary = customers.ToDictionary(c => c.Id, c => c.FirstName);

                List<InvoiceListItem> list = new List<InvoiceListItem>();
                foreach (var item in sqheaders)
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

                var filteredList = list.AsEnumerable(); // This will ensure it's IEnumerable

                // Filter by Type
                if (status != "all")
                {
                    filteredList = filteredList.Where(s => s.Status != null && s.Status.ToString().Equals(status, StringComparison.OrdinalIgnoreCase));
                }

                // Filter by Date
                if (date != "all" && DateTime.TryParse(date, out DateTime parsedDate))
                {
                    filteredList = filteredList.Where(s => s.Date == parsedDate.Date);
                }
                return Ok(filteredList.Skip((currentPage - 1) * pageSize)
                .Take(pageSize)
                .ToList());
            }
            catch (Exception ex)
            {
                _logger.LogDebug("EstimateController: GetEstimates Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpGet]
        [Route("viewestimate")]
        public async Task<IActionResult> ViewEstimate(string id)
        {
            _logger.LogInformation($"Called viewestimate API.");
            try
            {
                var headerId = Guid.Parse(id);
                var header = await _unitofwork.SalesQuoteHeaderRepository.GetSalesQuoteHeaderById(headerId);
                var lines = await _unitofwork.SalesQuoteLineRepository.GetSalesQuoteLineByHeaderId(headerId);
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
                _logger.LogDebug("EstimateController: ViewEstimate Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpPost]
        [Route("addestimate")]
        public async Task<IActionResult> AddEstimate(InvoiceCreateReq model)
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
                    Description = $"New invoice is created",
                    CreatedBy = currentUser,
                    CreatedAt = DateTime.UtcNow.ToString()
                };
                var no = await _unitofwork.SalesQuoteHeaderRepository.GetNextNo();
                var glline = new GeneralLedgerLine()
                {
                    Id = Guid.NewGuid(),
                    GeneralLedgerHeaderId = glheader.Id,
                    Amount = model.InvoiceTotal,
                    TenantId = tenantId,
                    CreatedBy = currentUser,
                    CreatedAt = DateTime.UtcNow.ToString()
                };

                var sqheader = new SalesQuoteHeader()
                {
                    Id = Guid.NewGuid(),
                    CustomerId = model.SelectedCustomer.Id,
                    GeneralLedgerHeaderId = glheader.Id,
                    TenantId = tenantId,
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
                    var sqline = new SalesQuoteLine()
                    {
                        Id = Guid.NewGuid(),
                        SalesQuoteHeaderId = sqheader.Id,
                        ItemId = item.Product,
                        Quantity = item.Qty,
                        //SalesOrderLineId = Guid.Empty,
                        Amount = item.Qty * item.Rate,
                        TenantId = tenantId,
                        CreatedBy = currentUser,
                        CreatedAt = DateTime.UtcNow.ToString()
                    };
                    await _unitofwork.SalesQuoteLineRepository.CreateSalesQuoteLine(sqline);
                }

                await _unitofwork.GeneralLedgerHeaderRepository.CreateGeneralLedgerHeader(glheader);
                await _unitofwork.GeneralLedgerLineRepository.CreateGeneralLedgerLine(glline);
                await _unitofwork.SalesQuoteHeaderRepository.CreateSalesQuoteHeader(sqheader);

                return Ok(new { isSuccess = true, message = $"Estimate added Successfully..!" });
            }
            catch (Exception ex)
            {
                _logger.LogDebug("EstimateController: AddEstimate Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpPost]
        [Route("updateestimate")]
        public async Task<IActionResult> UpdateEstimate(string id, [FromBody] InvoiceCreateReq model)
        {
            _logger.LogInformation($"Called updateestimate API.");
            try
            {
                var headerId = Guid.Parse(id);
                var originalheader = await _unitofwork.SalesQuoteHeaderRepository.GetSalesQuoteHeaderById(headerId);

                var updatedheader = new SalesQuoteHeader()
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
                var updateSuccess = await _unitofwork.SalesQuoteHeaderRepository.UpdateSalesQuoteHeader(updatedheader);
                if (!updateSuccess)
                {
                    _logger.LogError($"Failed to update quote header with ID {headerId}.");
                    return BadRequest(new { Message = "Error updating quote." });
                }

                var existingLines = await _unitofwork.SalesQuoteLineRepository.GetSalesQuoteLineByHeaderId(headerId);
                foreach (var line in existingLines)
                {
                    await _unitofwork.SalesQuoteLineRepository.DeleteSalesQuoteLine(line.Id);
                }

                foreach (var item in model.Items)
                {
                    var siline = new SalesQuoteLine()
                    {
                        Id = Guid.NewGuid(),  // Generate a new GUID for the new line
                        SalesQuoteHeaderId = updatedheader.Id,
                        ItemId = item.Product,
                        Quantity = item.Qty,
                        //SalesOrderLineId = Guid.Empty,  // Assuming this is empty for now
                        Amount = item.Qty * item.Rate,
                        UpdatedAt = DateTime.UtcNow.ToString()
                    };

                    var lineSuccess = await _unitofwork.SalesQuoteLineRepository.CreateSalesQuoteLine(siline);
                    if (lineSuccess == null)
                    {
                        _logger.LogError($"Failed to add new quote line for product ID {item.Product}");
                    }
                }

                _logger.LogInformation($"Estimate with ID {headerId} updated successfully.");

                return Ok(new { Message = "Estimate updated successfully", InvoiceId = headerId });
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
