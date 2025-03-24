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
using static DAL.Models.ProductServiceCreateReq;

namespace Accounting.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductServicesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ILogger<ProductServicesController> _logger;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ApplicationDbContext _db;
        private readonly UserManager<MasterUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly SignInManager<MasterUser> _signInManager;
        private readonly IAuthorizationService _authorizationService;
        private readonly IConfiguration _config;

        public ProductServicesController(ApplicationDbContext context, IMapper mapper, IAuthorizationService authorizationService,
            ILogger<ProductServicesController> logger, IUnitOfWork unitOfWork, IConfiguration config, UserManager<MasterUser> userManager,
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
        [Route("getallproductsservices")]
        public async Task<IActionResult> GetAllProductsServices()
        {
            try
            {
                var res = await _unitOfWork.ProductAndServiceRepository.GetProductsAndServices();
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        [HttpGet]
        [Route("getproductsservicebyid")]
        public async Task<IActionResult> GetProductsServiceById(string id)
        {
            try
            {
                var res = await _unitOfWork.ProductAndServiceRepository.GetProductServiceById(Guid.Parse(id));
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        [HttpGet]
        [Route("searchproductsservice")]
        public async Task<IActionResult> SearchProductsService(string searchterm)
        {
            try
            {
                var res = await _unitOfWork.ProductAndServiceRepository.SearchProductAndService(searchterm);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        [HttpPost]
        [Route("createservice")]
        public async Task<IActionResult> CreateService([FromBody] ProductServiceCreateReq input)
        {
            try
            {
                var item = new ProductAndService()
                {
                    Id = Guid.NewGuid(),
                    Name = input.BasicInfo.Name,
                    Category = input.BasicInfo.Category,
                    Sku = input.BasicInfo.Sku,
                    SalesTaxCategory = input.Sales.SalesTaxCategory,
                    SalesPrice = input.Sales.Price,
                    PurchaseCost = input.Purchasing.PurchaseCost,
                    PurchaseDescription = input.Purchasing.PurchaseDescription,
                    ExpenseAccount = input.Purchasing.ExpenseAccount,
                    IncomeAccount = input.Sales.IncomeAccount,
                    ItemType = input.BasicInfo.ItemType,
                    PreferredVendor = input.Purchasing.PreferredVendor,
                    SalesDescription = input.Sales.Description,
                    //InitialQty = input.InventoryInfo.InitialQuantity,
                    //InventoryAsOfDate = input.InventoryInfo.Date.ToString(),
                    //InventoryAssetAccount = input.InventoryInfo.InventoryAssetAccount,
                    //ReorderPoints = input.InventoryInfo.ReorderPoint,
                    CreatedAt = DateTime.UtcNow.ToString("o"),
                    UpdatedAt = DateTime.UtcNow.ToString("o"),
                    TenantId = Guid.NewGuid(),
                };
                if (input.Sales.IsSelling == false || input.Purchasing.IsPurchasing == false)
                {
                    item.InitialQty = input.InventoryInfo.InitialQuantity;
                    item.InventoryAsOfDate = input.InventoryInfo.Date;
                    item.InventoryAssetAccount = input.InventoryInfo.InventoryAssetAccount;
                    item.ReorderPoints = input.InventoryInfo.ReorderPoint;
                }
                else
                {
                    item.IsSeller = input.Sales.IsSelling;
                    item.IsPurchaser = input.Purchasing.IsPurchasing;
                }

                var res = await _unitOfWork.ProductAndServiceRepository.CreateProductAndService(item);
                return Ok(new { isSuccess = true, message = $"Product/Service Created Successfully.!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
