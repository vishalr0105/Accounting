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
    public class TeamController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger _logger;

        public TeamController(IMapper mapper, IUnitOfWork unitOfWork,
                              ILogger<TeamController> logger)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        [HttpGet]
        [Route("{companyId}")]
        [ProducesResponseType(typeof(List<TeamDto>), StatusCodes.Status200OK)]
        public async Task<List<TeamDto>> GetAllTeam(Guid companyId)
        {
            return _mapper.Map<List<TeamDto>>(await _unitOfWork.Team.GetAllTeam(companyId));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task AddTeam([FromBody] AddTeamDto team)
        {
            team.CompanyId = Utilities.GetCompanyId(User);
            try
            {
                var teamData = new Team();
                teamData.TeamName = team.TeamName;
                teamData.Discription = team.Discription;
                teamData.CreatedBy = team.UserId;
                teamData.Status = team.Status;
                teamData.CompanyId = team.CompanyId;
                await _unitOfWork.Team.AddTeam(teamData);
                await _unitOfWork.SaveChangesAsync();
            }
            catch (Exception EX)
            {
            }
        }

        [HttpPatch]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async void Update([FromBody] AddTeamDto team)
        {
            try
            {
                var teamData = new Team();
                teamData.TeamName = team.TeamName;
                teamData.Discription = team.Discription;
                teamData.Status = team.Status;
                teamData.UpdatedBy = team.UserId;
                teamData.CompanyId = team.CompanyId;
                teamData.Id = team.Id.Value;
                _unitOfWork.Team.UpdateTeam(teamData);
                _unitOfWork.SaveChanges();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpDelete]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task Delete(Guid Id)
        {
            await _unitOfWork.TeamAndTeamMembers.DeleteAllRecordWithTeamId(Id);
            await _unitOfWork.Team.DeleteTeam(Id);
            _unitOfWork.SaveChanges();
        }
    }
}
