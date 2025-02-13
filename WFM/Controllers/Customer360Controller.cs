using Microsoft.AspNetCore.Mvc;
using DAL.Models;
using DAL;
using WFM.Helpers;
using Microsoft.AspNetCore.Authorization;
using DAL.Core.Interfaces;
using AutoMapper;
using DAL.Repositories.Interfaces;
using IdentityServer4.AccessTokenValidation;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;
using EtapriseWFM.Helpers;

namespace WFM.Controllers
{
    [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
	[ApiController]
	public class Customer360Controller : ControllerBase
	{
        private readonly IHostingEnvironment _environment;
        private readonly ApplicationDbContext _context;
		private readonly IUnitOfWork _unitOfWork;
		private readonly IAccountManager _accountManager;
		private readonly ILogger<Customer360Controller> _logger;
		private readonly IMapper _mapper;
		private readonly IEmailSender _emailSender;
		public Customer360Controller(ApplicationDbContext context, 
			IUnitOfWork unitOfWork, IAccountManager accountManager, 
			ILogger<Customer360Controller> logger,
			IMapper mapper,
            IEmailSender emailSender,
            IHostingEnvironment environment
            )
		{
			_environment = environment;
			_context = context;
			_unitOfWork = unitOfWork;
			_accountManager = accountManager;
			_logger = logger;
			_mapper = mapper;
            _emailSender = emailSender;
		}



		[HttpGet("check-user")]
		public async Task<bool> chekUser(string email, Guid? id)
		{
			var result = await _unitOfWork.Customer360.GetUserByEmail(email, id);
			return result;
		}


		[HttpGet("get-account-and-contacts")]
		public async Task<IActionResult> GetAccountAndContacts()
		{
			try
			{
				var accountSendDto = new List<AccountDto>();
				var accountAndContacts = await _unitOfWork.Customer360.getAccounts(Utilities.GetCompanyId(User));
				var accountDto = _mapper.Map<List<AccountTableDto>>(accountAndContacts);
				foreach (var account in accountDto)
				{
					var m = new AccountDto();
					var contactsDtoList = new List<ContactsDto>();
					var contacts = await _unitOfWork.Customer360.GetContatactByAccountId(account.Id);
					foreach (var contact in contacts)
					{
						var contactsDto = _mapper.Map<ContactsDto>(contact);
						contactsDtoList.Add(contactsDto);
					}
					m.Account = account;
					m.Contacts = contactsDtoList;
					accountSendDto.Add(m);
				}
				return Ok(accountSendDto);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}

		}

        [HttpGet("get-contacts")]
        public async Task<IActionResult> GetContacts()
        {
            var contacts = await _unitOfWork.Customer360.GetContacts(Utilities.GetCompanyId(User));
            var contactsDto = _mapper.Map<List<ContactsDto>>(contacts);
            return Ok(contactsDto);
        }


		[HttpDelete("delete-contacts")]
		public async Task<ActionResult> DeleteContacts(Guid id)
		{
			try
			{
				var model = await _unitOfWork.Customer360.GetContatactById(id, Utilities.GetCompanyId(User));
				_unitOfWork.Customer360.DeleteContacts(model);
				return Ok();
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}


        [HttpDelete("delete-account")]
        public async Task<ActionResult> DeleteAccount(Guid id)
		{
			try
			{
				var model = await _unitOfWork.Customer360.GetAccountById(id, Utilities.GetCompanyId(User));
				_unitOfWork.Customer360.DeleteAccount(model);
				return Ok();
			}
			catch (Exception ex)
			{
				_logger.LogDebug(ex.Message);
				return Ok(new { ErrorMessage = ex.Message ?? ex.InnerException.Message });
			}

		}

    }
}
