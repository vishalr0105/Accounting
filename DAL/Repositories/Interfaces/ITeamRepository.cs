using DAL.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface ITeamRepository
    {
        Task<List<Team>> GetAllTeam(Guid? companyId = null);
        Task AddTeam(Team team);
        void UpdateTeam(Team team);
        Task DeleteTeam(Guid id);
    }
}
