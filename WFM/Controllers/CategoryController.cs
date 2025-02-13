using AutoMapper;
using DAL.Models;
using DAL.Repositories.Interfaces;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WFM.Helpers;
using WFM.ViewModels.Dtos;

namespace WFM.Controllers
{
    [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger _logger;

        public CategoryController(IMapper mapper, IUnitOfWork unitOfWork,
                              ILogger<CategoryController> logger)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult Get()
        {
            var allCategory = _unitOfWork.Category.GetAllCategoryData(Utilities.GetCompanyId(this.User));
            return Ok(_mapper.Map<IEnumerable<CategoryDto>>(allCategory));
        }


        [AllowAnonymous]
        [HttpPost]
        public IActionResult Post([FromBody] CategoryDto value)
        {
            var companyid= Utilities.GetCompanyId(User);
            if (_unitOfWork.Category.IsCategoryNameExist(value.CategoryName, companyid.Value))
            {
                return BadRequest("Category name already exist.");
            }

            var category = _mapper.Map<Category>(value);
            category.CompanyId= Utilities.GetCompanyId(User);
            category.CreatedBy = Utilities.GetUserId(this.User);
            _unitOfWork.Category.AddCategory(category);
            _unitOfWork.SaveChanges();
            return Ok();
        }


        [AllowAnonymous]
        [HttpPut]
        public IActionResult Put([FromBody] CategoryDto value)
        {
            var category = _mapper.Map<Category>(value);
            category.CompanyId = Utilities.GetCompanyId(User);

            category.UpdatedBy = Utilities.GetUserId(this.User);
            _unitOfWork.Category.UpdateCategory(category);
            _unitOfWork.SaveChanges();
            return Ok();
        }


        [AllowAnonymous]
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            _unitOfWork.Category.DeleteCategory(id);
            _unitOfWork.SaveChanges();
            return Ok();
        }
    }
}
