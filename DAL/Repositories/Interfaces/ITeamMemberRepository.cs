using DAL.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface ITeamMemberRepository
    {
        Task<Company> GetCurrency(Guid id);
        Task DeleteTeamMember(Guid id);
        Task<TeamMember> GetTeamMemberById(Guid id);
    }
}
