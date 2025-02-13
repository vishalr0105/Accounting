using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class IndustryTypesRepository : Repository<IndustryType>, IIndustryTypesRepository
    {
        public IndustryTypesRepository(DbContext context) : base(context)
        { }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

        public async Task<List<IndustryType>> GetIndustryType()
        {
            try
            {
                var res = await _appContext.industrytypes.ToListAsync();
                return res;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
