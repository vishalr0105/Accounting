using AutoMapper;
using DAL;
using DAL.Models;
using DAL.Repositories;
using DAL.Repositories.Interfaces;
using EtapriseWFM.ViewModels;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.ComponentModel.Design;
using WFM.Helpers;

namespace EtapriseWFM.Controllers
{
    [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class IntegrationController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public IntegrationController(IUnitOfWork unitOfWork, IMapper mapper) {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        [Route("GetIntegrationSetting")]
        [HttpGet]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status500InternalServerError)]
        public IActionResult GetIntegrationSetting(string companyid) {
            var setting=_mapper.Map<List<IntegrationSettingVm>>(
            _unitOfWork.IntegrationRepository.Find(x => x.CompanyId == companyid).ToList());
            return new OkObjectResult(setting);
        }
        [Route("SaveIntegrationSetting")]
        [HttpPost]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status500InternalServerError)]
        public IActionResult SaveIntegrationSetting([FromBody] IntegrationSettingVm model)
        {
            if (ModelState.IsValid)
            {
               var Setting=_unitOfWork.IntegrationRepository.
                    Find(x=>x.CompanyId==model.CompanyId && x.AppName==model.AppName).FirstOrDefault();
                if (Setting != null)
                {
                    Setting.Contacts=model.Contacts;
                    Setting.Invoices=model.Invoices;
                    Setting.Payments=model.Payments;
                    _unitOfWork.IntegrationRepository.Update(Setting);
                }
                else
                {
                    var setting = _mapper.Map<Integration>(model);
                    setting.IntegrationId = 0;
                    _unitOfWork.IntegrationRepository.Add(setting);

                }
                _unitOfWork.SaveChanges();
                return new OkObjectResult(new { message = model.IntegrationId>0? "Setting Updated" : "Setting Saved"});
            }
            return BadRequest();
        }
    
    [HttpPost]
    [Route("SavePaymentSetting")]
    public IActionResult SavePaymentSetting([FromBody]PaymentIntegrationSetting model){
         var companyid = Utilities.GetCompanyId(User);
         var company=_unitOfWork.Company.GetSingleOrDefault(x=>x.Id==companyid);
         if(model.PaymentPlatformId=="PayPal"){
            company.PaypalAccount=model.Setting;
         }else{
            company.StripeAccount=model.Setting;
         }
         _unitOfWork.Company.Update(company);
         _unitOfWork.SaveChanges();
         return new OkObjectResult(companyid);
    }
    }

}
