using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Repositories.Interfaces;
using DAL.DTOS;
namespace DAL.Repositories
{
    public class TeamRepository : Repository<Team>, ITeamRepository
    {
        public TeamRepository(DbContext context) : base(context) { }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

        public async Task<List<Team>> GetAllTeam(Guid? companyId = null)
        {
            return await _appContext.Team
                .Include(T => T.TeamMemmbers)
                .ThenInclude(T => T.ApplicationUser)
                .AsNoTracking()
                .Where(t => t.CompanyId == companyId)
                .ToListAsync();
        }

        public async Task AddTeam(Team team)
        {
            team.CreatedAt = DateTime.UtcNow;
            await _appContext.Team.AddAsync(team);
        }

        public void UpdateTeam(Team team)
        {
            _appContext.Team.Update(team);
        }

        public async Task DeleteTeam(Guid id)
        {
            Team team = await _appContext.Team.FirstOrDefaultAsync(t => t.Id == id);
            if (team != null)
            {
                _appContext.Team.Remove(team);
            }
        }
    }
}
