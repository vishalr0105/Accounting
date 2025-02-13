using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class JobTitleRepository : Repository<JobTitle>, IJobTitleRepository
    {
        public JobTitleRepository(DbContext context) : base(context)
        { }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

        public async Task<List<JobTitle>> GetJobTitle()
        {
            try
            {
                var res = await _appContext.jobtitle.ToListAsync();
                return res;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
