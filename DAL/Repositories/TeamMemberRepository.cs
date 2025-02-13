using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Repositories.Interfaces;
namespace DAL.Repositories
{
    public class TeamMemberRepository : Repository<TeamMember>, ITeamMemberRepository
    {
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

        public TeamMemberRepository(DbContext context) : base(context)
        {

        }

        public async Task<TeamMember> GetTeamMemberById(Guid id)
        {
            return await _appContext.TeamMembers
                                    .AsNoTracking()
                                    .FirstOrDefaultAsync(w => w.Id == id);
        }

        public async Task<Company> GetCurrency(Guid id)
        {
            var test = await _appContext.Company
                                    .AsNoTracking()
                                    .FirstOrDefaultAsync(w => w.Id == id);
            return test;
        }

        public async Task DeleteTeamMember(Guid id)
        {
            UserMaster teamMember = await _appContext.UserMaster.FirstOrDefaultAsync(t => t.Id == id);
            if (teamMember != null)
            {
                _appContext.UserMaster.Remove(teamMember);
            }
        }
	}
}
