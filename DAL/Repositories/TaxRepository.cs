using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class TaxRepository : Repository<Tax>, ITaxRepository
    {
        private readonly ApplicationDbContext _appContext;

        public TaxRepository(DbContext context) : base(context)
        {
            _appContext = (ApplicationDbContext)context;
        }

        public async Task<Tax> CreateTax(Tax item)
        {
            var res = await _appContext.tax.AddAsync(item);
            await _appContext.SaveChangesAsync();
            return res.Entity;
        }

        public async Task<bool> DeleteTax(Guid id)
        {
            var item = await _appContext.tax.FindAsync(id);

            if (item == null)
            {
                return false;
            }

            _appContext.tax.Remove(item);
            await _appContext.SaveChangesAsync();

            return true;
        }

        public async Task<Tax> GetTaxById(Guid id)
        {
            var item = await _appContext.tax.FindAsync(id);
            return item;
        }

        public async Task<List<Tax>> GetTaxs()
        {
            var res = await _appContext.tax.ToListAsync();
            return res;
        }

        public async Task<bool> InActiveTax(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateTax(Tax item)
        {
            var existingitem = await _appContext.tax.FindAsync(item.Id);

            if (existingitem == null)
            {
                return false;
            }

            _appContext.Entry(existingitem).CurrentValues.SetValues(item);
            await _appContext.SaveChangesAsync();

            return true;
        }
    }
}
