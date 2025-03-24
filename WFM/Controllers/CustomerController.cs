using AutoMapper;
using DAL;
using DAL.DTOS;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WFM;

namespace Accounting.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ILogger<CustomerController> _logger;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ApplicationDbContext _db;
        private readonly UserManager<MasterUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly SignInManager<MasterUser> _signInManager;
        private readonly IAuthorizationService _authorizationService;
        private readonly IConfiguration _config;

        public CustomerController(ApplicationDbContext context, IMapper mapper, IAuthorizationService authorizationService,
            ILogger<CustomerController> logger, IUnitOfWork unitOfWork, IConfiguration config, UserManager<MasterUser> userManager, 
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
        [Route("getcustomers")]
        public async Task<IActionResult> GetCustomers()
        {
            _logger.LogInformation($"Called getcustomers API.");
            try
            {
                var res = await _unitOfWork.CustomerRepository.GetCustomers();
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("CustomerController: GetCustomers Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }
        

        [HttpGet]
        [Route("getcustomerbyid")]
        public async Task<IActionResult> GetCustomerBYId(string custId)
        {
            _logger.LogInformation($"Called getcustomers API.");
            try
            {
                var customer = await _unitOfWork.CustomerRepository.GetCustomerById(Guid.Parse(custId));
                var retres = new CreateCustomerRequest
                {
                    NameAndContact = new NameAndContact
                    {
                        Title = customer.Title,
                        FirstName = customer.FirstName,
                        MiddleName = customer.MiddleName,
                        LastName = customer.LastName,
                        Email = customer.Email,
                        MobileNumber = customer.PhoneNumber, // Assuming MobileNumber is mapped from PhoneNumber
                        PhoneNumber = customer.PhoneNumber, // You can adjust based on your needs
                        IsSubCustomer = customer.IsSubCustomer ?? false, // Default to false if null
                    },

                    Address = new DAL.Models.Address
                    {
                        // Billing Address
                        BillingStreet1 = customer.BillingAddressLine1,
                        BillingStreet2 = customer.BillingAddressLine2,
                        BillingCity = customer.BillingAddressCity,
                        BillingState = customer.BillingAddressStateCode,  // Assuming you are using State Code
                        BillingCountry = customer.BillingAddressCountry,
                        BillingZip = customer.BillingAddressZipCode,

                        // Shipping Address
                        ShippingStreet1 = customer.ShippingAddressLine1,
                        ShippingStreet2 = customer.ShippingAddressLine2,
                        ShippingCity = customer.ShippingAddressCity,
                        ShippingState = customer.ShippingAddressStateCode,  // Assuming you are using State Code
                        ShippingCountry = customer.ShippingAddressCountry,
                        ShippingZip = customer.ShippingAddressZipCode
                    },

                    NotesAttachments = new NotesAttachments
                    {
                        Notes = customer.NotesAndAttachments // Mapping notes field
                    },

                    Payments = new Payments
                    {
                        PaymentMethod = customer.PaymentMethodObjectType,  // Assuming PaymentMethodObjectType is used
                        Terms = customer.NetTermDays
                    },

                    AdditionalInfo = new AdditionalInfo
                    {
                        IsTaxExempt = customer.IsTaxExempt ?? false, // Default to false if null
                        ExemptionReason = customer.ReasonForExemption,
                        OpeningBalance = decimal.TryParse(customer.OpeningBalance, out var openingBalance) ? openingBalance : 0 // Default to 0 if parse fails
                    }
                };

                return Ok(retres);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("CustomerController: GetCustomers Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpGet]
        [Route("searchcustomer")]
        public async Task<IActionResult> SearchCustomer(string searchterm)
        {
            _logger.LogInformation($"Called searchcustomer API.");
            try
            {
                var res = await _unitOfWork.CustomerRepository.SearchCustomer(searchterm.Trim().ToLower());
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("CustomerController: SearchCustomer Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpPost]
        [Route("createcustomer")]
        public async Task<IActionResult> CreateCustomer([FromBody] CreateCustomerRequest request)
        {
            _logger.LogInformation($"Called createcustomer API.");
            try
            {
                var cust = new DAL.Models.Customer
                {
                    Id = Guid.NewGuid(), // Auto-generate new GUID
                    Title = request.NameAndContact.Title,
                    FirstName = request.NameAndContact.FirstName,
                    LastName = request.NameAndContact.LastName,
                    Email = request.NameAndContact.Email,
                    BillingAddressFirstName = request.NameAndContact.FirstName,
                    BillingAddressLastName = request.NameAndContact.LastName,
                    BillingAddressLine1 = request.Address.BillingStreet1,
                    BillingAddressLine2 = request.Address.BillingStreet2,
                    BillingAddressCity = request.Address.BillingCity,
                    BillingAddressStateCode = request.Address.BillingState,
                    BillingAddressState = request.Address.BillingState,
                    BillingAddressCountry = request.Address.BillingCountry,
                    BillingAddressZipCode = request.Address.BillingZip,
                    ShippingAddressFirstName = request.NameAndContact.FirstName,
                    ShippingAddressLastName = request.NameAndContact.LastName,
                    ShippingAddressLine1 = request.Address.ShippingStreet1,
                    ShippingAddressLine2 = request.Address.ShippingStreet2,
                    ShippingAddressCity = request.Address.ShippingCity,
                    ShippingAddressStateCode = request.Address.ShippingState,
                    ShippingAddressState = request.Address.ShippingState,
                    ShippingAddressCountry = request.Address.ShippingCountry,
                    ShippingAddressZipCode = request.Address.ShippingZip,
                    NotesAndAttachments = request.NotesAttachments.Notes,
                    NetTermDays = request.Payments.Terms,
                    PaymentMethodObjectType = request.Payments.PaymentMethod,
                    IsTaxExempt = request.AdditionalInfo.IsTaxExempt,
                    ReasonForExemption = request.AdditionalInfo.ExemptionReason,
                    OpeningBalance = request.AdditionalInfo.OpeningBalance.ToString(),
                    IsSubCustomer = request.NameAndContact.IsSubCustomer,
                    //ParentCustomer = Guid.Parse(request.NameAndContact.ParentCustomer),
                    //CardStatus = request.CardStatus,
                    //PreferredCurrencyCode = request.PreferredCurrencyCode,
                    //PaymentMethodObjectType = request.PrimaryPaymentMethodObjectType,
                    CreatedAt = DateTime.UtcNow.ToString("o"),
                    UpdatedAt = DateTime.UtcNow.ToString("o")
                };
                var res = await _unitOfWork.CustomerRepository.CreateCustomer(cust);
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("CustomerController: CreateCustomer Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpPost]
        [Route("updatecustomer")]
        public async Task<IActionResult> UpdateCustomer(string custId, [FromBody] CreateCustomerRequest request)
        {
            _logger.LogInformation($"Called updatecustomer API.");
            try
            {
                var cust = new DAL.Models.Customer
                {
                    Id = Guid.Parse(custId),
                    Title = request.NameAndContact.Title,
                    FirstName = request.NameAndContact.FirstName,
                    MiddleName=request.NameAndContact.MiddleName,
                    LastName = request.NameAndContact.LastName,
                    Email = request.NameAndContact.Email,
                    BillingAddressFirstName = request.NameAndContact.FirstName,
                    BillingAddressLastName = request.NameAndContact.LastName,
                    BillingAddressLine1 = request.Address.BillingStreet1,
                    BillingAddressLine2 = request.Address.BillingStreet2,
                    BillingAddressCity = request.Address.BillingCity,
                    BillingAddressStateCode = request.Address.BillingState,
                    BillingAddressState = request.Address.BillingState,
                    BillingAddressCountry = request.Address.BillingCountry,
                    BillingAddressZipCode = request.Address.BillingZip,
                    ShippingAddressFirstName = request.NameAndContact.FirstName,
                    ShippingAddressLastName = request.NameAndContact.LastName,
                    ShippingAddressLine1 = request.Address.ShippingStreet1,
                    ShippingAddressLine2 = request.Address.ShippingStreet2,
                    ShippingAddressCity = request.Address.ShippingCity,
                    ShippingAddressStateCode = request.Address.ShippingState,
                    ShippingAddressState = request.Address.ShippingState,
                    ShippingAddressCountry = request.Address.ShippingCountry,
                    ShippingAddressZipCode = request.Address.ShippingZip,
                    NotesAndAttachments = request.NotesAttachments.Notes,
                    NetTermDays = request.Payments.Terms,
                    PaymentMethodObjectType = request.Payments.PaymentMethod,
                    IsTaxExempt = request.AdditionalInfo.IsTaxExempt,
                    ReasonForExemption = request.AdditionalInfo.ExemptionReason,
                    OpeningBalance = request.AdditionalInfo.OpeningBalance.ToString(),
                    IsSubCustomer = request.NameAndContact.IsSubCustomer,
                    //ParentCustomer = Guid.Parse(request.NameAndContact.ParentCustomer),
                    //CardStatus = request.CardStatus,
                    //PreferredCurrencyCode = request.PreferredCurrencyCode,
                    //PaymentMethodObjectType = request.PrimaryPaymentMethodObjectType,
                    CreatedAt = DateTime.UtcNow.ToString("o"),
                    UpdatedAt = DateTime.UtcNow.ToString("o")
                };
                var res = await _unitOfWork.CustomerRepository.UpdateCustomer(cust);
                return Ok(new { isSuccess = res , message = $"Customer Updated Successfully.!"});
            }
            catch (Exception ex)
            {
                _logger.LogDebug("CustomerController: UpdateCustomer Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpDelete]
        [Route("deletecustomer")]
        public async Task<IActionResult> DeleteCustomer(string id)
        {
            _logger.LogInformation($"Called deletecustomer API.");
            try
            {
                var res = await _unitOfWork.CustomerRepository.DeleteCustomer(Guid.Parse(id));
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("CustomerController: DeleteCustomer Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }


        [HttpPatch]
        [Route("inactivecustomer")]
        public async Task<IActionResult> InActiveCustomer(string id)
        {
            _logger.LogInformation($"Called inactivecustomer API.");
            try
            {
                var res = await _unitOfWork.CustomerRepository.InActiveCustomer(Guid.Parse(id));
                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogDebug("CustomerController: InActiveCustomer Error.");
                return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
            }
        }
    }
}
