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
            _logger.LogInformation($"Called getallproductsservices API.");
            try
            {
                var res = await _unitOfWork.ProductAndServiceRepository.GetProductsAndServices();
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("ProductServicesController: GetAllProductsServices Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpGet]
        [Route("getproductsservicebyid")]
        public async Task<IActionResult> GetProductsServiceById(string id)
        {
            _logger.LogInformation($"Called getproductsservicebyid API.");

            try
            {
                var res = await _unitOfWork.ProductAndServiceRepository.GetProductServiceById(Guid.Parse(id));

                var retres = new ProductServiceCreateReq()
                {
                    BasicInfo = new BasicInfo
                    {
                        Category = res.Category,
                        ItemType = res.ItemType,
                        Name = res.Name,
                        Sku = res.Sku
                    },
                    Purchasing = new Purchasing
                    {
                        IsPurchasing = res.IsPurchaser,
                        ExpenseAccount = res.ExpenseAccount,
                        PreferredVendor = res.PreferredVendor,
                        PurchaseCost = res.PurchaseCost,
                        PurchaseDescription = res.PurchaseDescription
                    },
                    Sales = new Sales
                    {
                        IsSelling = res.IsSeller,
                        Description = res.SalesDescription,
                        IncomeAccount = res.IncomeAccount,
                        Price = res.SalesPrice,
                        SalesTaxCategory = res.SalesTaxCategory
                    },
                    InventoryInfo = new InventoryInfo
                    {
                        Date = res.InventoryAsOfDate,
                        InitialQuantity = res.InitialQty,
                        InventoryAssetAccount = res.InventoryAssetAccount,
                        ReorderPoint = res.ReorderPoints
                    }
                };

                if (res.IsSeller == false || res.IsPurchaser == false)
                {
                    retres.InventoryInfo.InitialQuantity = res.InitialQty;
                    retres.InventoryInfo.Date = res.InventoryAsOfDate;
                    retres.InventoryInfo.InventoryAssetAccount = res.InventoryAssetAccount;
                    retres.InventoryInfo.ReorderPoint = res.ReorderPoints;
                }
                else
                {
                    retres.Sales.IsSelling = res.IsSeller;
                    retres.Purchasing.IsPurchasing = res.IsPurchaser;
                }

                return Ok(retres);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("ProductServicesController: GetProductsServiceById Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpGet]
        [Route("searchproductsservice")]
        public async Task<IActionResult> SearchProductsService(string searchterm)
        {
            _logger.LogInformation($"Called searchproductsservice API.");

            try
            {
                var res = await _unitOfWork.ProductAndServiceRepository.SearchProductAndService(searchterm);
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("ProductServicesController: SearchProductsService Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpPost]
        [Route("createservice")]
        public async Task<IActionResult> CreateService([FromBody] ProductServiceCreateReq input)
        {
            _logger.LogInformation($"Called createservice API.");

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
                    IsActive = true,
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
                _logger.LogDebug("ProductServicesController: CreateService Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpPost]
        [Route("updateproductservice")]
        public async Task<IActionResult> UpdateProductService(string id, [FromBody] ProductServiceCreateReq input)
        {
            _logger.LogInformation($"Called updateproductservice API.");

            try
            {
                var item = new ProductAndService()
                {
                    Id = Guid.Parse(id),
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
                    IsActive = true,
                    //InitialQty = input.InventoryInfo.InitialQuantity,
                    //InventoryAsOfDate = input.InventoryInfo.Date.ToString(),
                    //InventoryAssetAccount = input.InventoryInfo.InventoryAssetAccount,
                    //ReorderPoints = input.InventoryInfo.ReorderPoint,
                    //CreatedAt = DateTime.UtcNow.ToString("o"),
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

                var res = await _unitOfWork.ProductAndServiceRepository.UpdateProductAndService(item);

                return Ok(new { isSuccess = true, message = $"Product/Service Updated Successfully.!" });
            }
            catch (Exception ex)
            {
                _logger.LogDebug("ProductServicesController: UpdateProductService Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpPatch]
        [Route("inactiveproductservice")]
        public async Task<IActionResult> InActiveProductService(string id)
        {
            _logger.LogInformation($"Called inactiveproductservice API.");

            try
            {
                var res = await _unitOfWork.ProductAndServiceRepository.InActiveProductAndService(Guid.Parse(id));
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("ProductServicesController: InActiveProductService Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }
    }
}
