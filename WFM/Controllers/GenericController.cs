using AutoMapper;
using DAL.Models;
using DAL.Repositories.Interfaces;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WFM.ViewModels.Dtos;

namespace WFM.Controllers
{
    [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class GenericController<T, TDto, TController> : ControllerBase where T : BaseEntity where TDto : BaseEntityDto where TController : class
    {
        private readonly IMapper _mapper;
        private readonly IGenericRepository<T> _genericRepository;
        private readonly ILogger _logger;

        public GenericController(IMapper mapper, IGenericRepository<T> genericRepository,
                             ILogger<TController> logger)
        {
            _mapper = mapper;
            _genericRepository = genericRepository;
            _logger = logger;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<TDto>>> Get()
        {
            var allItems = await _genericRepository.GetAllList();
            return Ok(_mapper.Map<IEnumerable<TDto>>(allItems));
        }


        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> Post([FromBody] TDto value)
        {
            if (ModelState.IsValid)
            {
                var Value = _mapper.Map<T>(value);
                await _genericRepository.AddItem(Value);
                _genericRepository.SaveChanges();
                return Ok();
            }
            return BadRequest(ModelState.Values.Aggregate(new List<string>(),
         (a, c) =>
         {
             a.AddRange(c.Errors.Select(r => r.ErrorMessage));
             return a;
         },
         a => a
         ));
        }


        [HttpPatch("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public IActionResult Patch([FromBody] TDto value)
        {
            if (ModelState.IsValid)
            {
                var item = _mapper.Map<T>(value);
                _genericRepository.UpdateItem(item);
                _genericRepository.SaveChanges();
                return Ok();
            }
            return BadRequest(ModelState.Values.Aggregate(new List<string>(),
            (a, c) =>
            {
                a.AddRange(c.Errors.Select(r => r.ErrorMessage));
                return a;
            },
            a => a
            ));
        }


        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> Delete(Guid id)
        {
            await _genericRepository.DeleteItem(id);
            _genericRepository.SaveChanges();
            return Ok();
        }
    }
}
