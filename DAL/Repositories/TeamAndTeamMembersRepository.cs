using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Repositories.Interfaces;
namespace DAL.Repositories
{
    public class TeamAndTeamMembersRepository : Repository<TeamAndTeamMembers>, ITeamAndTeamMembersRepository
    {
        public TeamAndTeamMembersRepository(DbContext context) : base(context)
        { }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

        public async Task DeleteAllRecordWithTeamId(Guid TeamId)
        {
            List<TeamAndTeamMembers> team = await _appContext.TeamAndTeamMembers.Where(T => T.TeamId == TeamId).ToListAsync();
            if(team.Count > 0)
            {
                _appContext.TeamAndTeamMembers.RemoveRange(team);
            }
        }
    }
}
