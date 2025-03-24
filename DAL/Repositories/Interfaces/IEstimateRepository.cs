using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IEstimateRepository : IRepository<Estimate>
    {
        Estimate GetEstimateByUserId(string UserId);
        Task<IEnumerable<Estimate>> GetEstimatesByUserId(string UserId, DateTime FromDate, DateTime ToDate);
        Task<IEnumerable<Estimate>> GetEstimatesByUserId(string UserId);
        Guid CreateEstimate(Estimate args);
        Task<bool> UpdateEstimate(Estimate args);
        Task<bool> DeleteEstimateById(Guid id);
        Task<bool> DeleteEstimateByUserId(string userId);
    }
}
