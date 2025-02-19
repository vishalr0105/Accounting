using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories
{
    public class VendorRepository : Repository<VendorTable>, IVendorRepository
    {
        public VendorRepository(DbContext context) : base(context) { }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
        public async Task<VendorTable> AddVendor(VendorTable team)
        {
            try
            {
                team.CreatedAt = DateTime.Now;
              
                var res = await _appContext.VendorTable.AddAsync(team);
                await _appContext.SaveChangesAsync();

                return res.Entity;
            }
            catch
            {
                return null;
            }
        }


        public async Task<List<VendorTable>> getVendor(Guid? companyId)
        {
            var accounts = await _appContext.VendorTable.Where(x => x.CompanyID == companyId).ToListAsync();
            return accounts;
        }


        public void Delete(VendorTable contacts)
        {
            _appContext.VendorTable.Remove(contacts);
            _appContext.SaveChanges();
        }

        public VendorTable UpdateAccount(VendorTable accountTable)
        {
            _appContext.VendorTable.Update(accountTable);
            _context.SaveChanges();
            return accountTable;
        }
    }
}
