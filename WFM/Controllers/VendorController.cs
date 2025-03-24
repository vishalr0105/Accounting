using Microsoft.AspNetCore.Mvc;
using DAL.Models;
using DAL;
using WFM.Helpers;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using DAL.Repositories.Interfaces;
using IdentityServer4.AccessTokenValidation;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace WFM.Controllers
{
    [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class VendorController : ControllerBase
    {
        private readonly IHostingEnvironment _environment;
        private readonly ApplicationDbContext _context;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IEmailSender _emailSender;

        public VendorController(ApplicationDbContext context,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            IEmailSender emailSender,
            IHostingEnvironment environment
            )
        {
            _environment = environment;
            _context = context;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _emailSender = emailSender;
        }

        /// New Wireframe 
        [HttpPost("createaccount")]
        public async Task<IActionResult> AddCustomer(VendorTable clientAndSuppliers)
        {
            try
            {
                clientAndSuppliers.CompanyID = Utilities.GetCompanyId(User);
                clientAndSuppliers.CreatedBy = Utilities.GetUserId(User);
                await _unitOfWork.vendorRepository.AddVendor(clientAndSuppliers);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-accounts-list")]
        public async Task<IActionResult> GetAccounts()
        {
            var accounts = await _unitOfWork.vendorRepository.getVendor(Utilities.GetCompanyId(User));
            return Ok(accounts);
        }

        ///Update Customer new Wireframe
        [HttpPatch("updatecustomer")]
        public IActionResult updateCustomer(VendorTable client)
        {
            try
            {
                client.UpdatedBy = Utilities.GetUserId(User);
                _unitOfWork.vendorRepository.UpdateAccount(client);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
