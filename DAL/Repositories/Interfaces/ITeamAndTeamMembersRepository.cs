using DAL.Models;
using System;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface ITeamAndTeamMembersRepository
    {
        Task DeleteAllRecordWithTeamId(Guid TeamId);
    }
}
