using DAL.DTOS;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace DAL.Repositories
{
    public class TenantRepository : Repository<Tenant>, ITenantRepository
    {
        public TenantRepository(DbContext context) : base(context) { }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

        public async Task<List<Tenant>> GetTenants()
        {
            try
            {
                var res = await _appContext.tenants.ToListAsync();
                return res;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
