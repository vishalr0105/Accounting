using AutoMapper;
using DAL.DTOS;
using DAL.Models;
using DAL.Repositories.Interfaces;
using DAL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WFM;
using Microsoft.Extensions.Options;

namespace Accounting.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AllSalesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ILogger<AllSalesController> _logger;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ApplicationDbContext _db;
        private readonly UserManager<MasterUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly SignInManager<MasterUser> _signInManager;
        private readonly IAuthorizationService _authorizationService;
        private readonly IConfiguration _config;

        public AllSalesController(ApplicationDbContext context, IMapper mapper, IAuthorizationService authorizationService,
            ILogger<AllSalesController> logger, IUnitOfWork unitOfWork, IConfiguration config, UserManager<MasterUser> userManager,
            SignInManager<MasterUser> signInManager, IOptions<AppSettings> appSettings, RoleManager<ApplicationRole> roleManager)
        {
            _db = context;
            _mapper = mapper;
            _authorizationService = authorizationService;
            _logger = logger;
            _unitOfWork = unitOfWork;
            _config = config;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }


        [HttpGet]
        [Route("gettotalcount")]
        public async Task<IActionResult> GetTotalCount([FromQuery] string type = "all", [FromQuery] string date = "all", [FromQuery] string customer = "all")
        {
            _logger.LogInformation($"Called gettotalcount API.");

            try
            {
                List<InvoiceListItem> list = new List<InvoiceListItem>();
                var _typeMapping = new Dictionary<Guid, string>();
                int totalCount = 0;
                async Task AddInvoiceListItemFromHeader(dynamic header, string headerType)
                {
                    var cust = await _unitOfWork.CustomerRepository.GetCustomerById(header.CustomerId);
                    var hitem = new InvoiceListItem()
                    {
                        Id = header.Id,
                        Customer = cust.FirstName,
                        Date = DateTime.Parse(header.CreatedAt),
                        Status = header.Status.ToString(),
                        No = header.No,
                        Amount = header.Amount
                    };
                    list.Add(hitem);
                    _typeMapping.Add(header.Id, headerType);
                }

                if (type == "all" || type.Equals("invoice", StringComparison.OrdinalIgnoreCase))
                {
                    var sicount = await _unitOfWork.SalesInvoiceHeaderRepository.GetSalesInvoiceCountAsync("all", "all");
                    totalCount += sicount;
                }

                if (type == "all" || type.Equals("estimate", StringComparison.OrdinalIgnoreCase))
                {
                    var sqcount = await _unitOfWork.SalesQuoteHeaderRepository.GetSalesQuoteCountAsync("all", "all");
                    totalCount += sqcount;
                }

                if (type == "all" || type.Equals("salesorder", StringComparison.OrdinalIgnoreCase))
                {
                    var socount = await _unitOfWork.SalesOrderHeaderRepository.GetSalesOrderCountAsync("all", "all");
                    totalCount += socount;
                }

                return Ok(new { totalcount = totalCount });
            }
            catch (Exception ex)
            {
                _logger.LogError("Error occurred in AllSalesController : GetTotalCount", ex);
                return BadRequest(new { ErrorMessage = ex.Message ?? ex.InnerException?.Message });
            }
        }


        [HttpGet("getallsales")]
        public async Task<IActionResult> GetSalesData1([FromQuery] int pageSize = 5, [FromQuery] int currentPage = 1, [FromQuery] string type = "all", [FromQuery] string date = "all", [FromQuery] string customer = "all")
        {
            try
            {
                List<InvoiceListItem> list = new List<InvoiceListItem>();
                var _typeMapping = new Dictionary<Guid, string>();

                // Helper method to create InvoiceListItem from header
                async Task AddInvoiceListItemFromHeader(dynamic header, string headerType)
                {
                    var cust = await _unitOfWork.CustomerRepository.GetCustomerById(header.CustomerId);
                    var hitem = new InvoiceListItem()
                    {
                        Id = header.Id,
                        Customer = cust.FirstName,
                        Date = DateTime.Parse(header.CreatedAt),
                        Status = header.Status.ToString(),
                        No = header.No,
                        Amount = header.Amount
                    };
                    list.Add(hitem);
                    _typeMapping.Add(header.Id, headerType);
                }

                // Check if type is "all" or a specific type, and filter accordingly
                if (type == "all" || type.Equals("invoice", StringComparison.OrdinalIgnoreCase))
                {
                    var siheaders = await _unitOfWork.SalesInvoiceHeaderRepository.GetSalesInvoiceHeaders(pageSize, currentPage, "all", "all");
                    foreach (var item in siheaders)
                    {
                        await AddInvoiceListItemFromHeader(item, "invoice");
                    }
                }

                if (type == "all" || type.Equals("estimate", StringComparison.OrdinalIgnoreCase))
                {
                    var sqheaders = await _unitOfWork.SalesQuoteHeaderRepository.GetSalesQuoteHeaders(pageSize, currentPage, "all", "all");
                    foreach (var item in sqheaders)
                    {
                        await AddInvoiceListItemFromHeader(item, "estimate");
                    }
                }

                if (type == "all" || type.Equals("salesorder", StringComparison.OrdinalIgnoreCase))
                {
                    var soheaders = await _unitOfWork.SalesOrderHeaderRepository.GetSalesOrderHeaders(pageSize, currentPage, "all", "all");
                    foreach (var item in soheaders)
                    {
                        await AddInvoiceListItemFromHeader(item, "salesorder");
                    }
                }

                // Apply filtering based on parameters
                var filteredList = list.AsEnumerable();

                // Apply type filter if not "all"
                if (type != "all")
                {
                    filteredList = filteredList.Where(s => _typeMapping[s.Id].Equals(type, StringComparison.OrdinalIgnoreCase));
                }

                // Apply date filter if not "all"
                if (date != "all" && DateTime.TryParse(date, out DateTime parsedDate))
                {
                    filteredList = filteredList.Where(s => s.Date.Date == parsedDate.Date);
                }

                // Apply customer filter if not "all"
                if (customer != "all")
                {
                    filteredList = filteredList.Where(s => s.Customer != null && s.Customer.Equals(customer, StringComparison.OrdinalIgnoreCase));
                }

                // Calculate total records and total pages
                var salesDataList = filteredList.Select(item => new SalesData
                {
                    Id = item.Id.ToString(),
                    Amount = item.Amount,
                    Type = _typeMapping[item.Id],
                    Customer = item.Customer,
                    Date = item.Date
                }).ToList();

                int totalRecords = salesDataList.Count();
                int totalPages = (int)Math.Ceiling((double)totalRecords / pageSize);

                // Check if the current page is within range
                if (currentPage > totalPages)
                {
                    return BadRequest("Page number exceeds total pages.");
                }

                // Apply pagination and return the paged list
                var pagedList = salesDataList.Skip((currentPage - 1) * pageSize).Take(pageSize).ToList();
                return Ok(pagedList);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error occurred in GetSalesData1", ex);
                return BadRequest(new { ErrorMessage = ex.Message ?? ex.InnerException?.Message });
            }
        }
    }
}
