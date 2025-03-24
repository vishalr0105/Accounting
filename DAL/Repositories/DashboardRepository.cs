using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class DashboardRepository : Repository<Dashboard>, IDashboardRepository
    {
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
        string[] WeekDays = { "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" };
        string[] months = { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" };

        public DashboardRepository(DbContext context) : base(context) { }

        public async Task<List<Dashboard>> GetDashboards(bool isActive = true)
        {
            return await _appContext.Dashboards
                .Where(d => d.IsActive == isActive)
                .ToListAsync();
        }
    }
}