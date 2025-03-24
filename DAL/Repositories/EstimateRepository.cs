using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class EstimateRepository : Repository<Estimate>, IEstimateRepository
    {
        private ApplicationDbContext _appContext => (ApplicationDbContext)_appContext;

        public EstimateRepository(DbContext context) : base(context)
        {

        }

        public Guid CreateEstimate(Estimate args)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteEstimateById(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteEstimateByUserId(string userId)
        {
            throw new NotImplementedException();
        }

        public Estimate GetEstimateByUserId(string UserId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Estimate>> GetEstimatesByUserId(string UserId, DateTime FromDate, DateTime ToDate)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Estimate>> GetEstimatesByUserId(string UserId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateEstimate(Estimate args)
        {
            throw new NotImplementedException();
        }
    }
}
