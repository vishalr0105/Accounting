using DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IDashboardRepository
    {
        Task<List<Dashboard>> GetDashboards(bool isActive = true);
    }
}
