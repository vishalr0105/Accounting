using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class TaxGroupRepository : Repository<TaxGroup>, ITaxGroupRepository
    {
        private readonly ApplicationDbContext _appContext;

        public TaxGroupRepository(DbContext context) : base(context)
        {
            _appContext = (ApplicationDbContext)context;
        }

        public async Task<TaxGroup> CreateTaxGroup(TaxGroup item)
        {
            var res = await _appContext.taxgroup.AddAsync(item);
            await _appContext.SaveChangesAsync();
            return res.Entity;
        }

        public async Task<bool> DeleteTaxGroup(Guid id)
        {
            var item = await _appContext.taxgroup.FindAsync(id);

            if (item == null)
            {
                return false;
            }

            _appContext.taxgroup.Remove(item);
            await _appContext.SaveChangesAsync();

            return true;
        }

        public async Task<TaxGroup> GetTaxGroupById(Guid id)
        {
            var item = await _appContext.taxgroup.FindAsync(id);
            return item;
        }

        public async Task<List<TaxGroup>> GetTaxGroups()
        {
            var res = await _appContext.taxgroup.ToListAsync();
            return res;
        }

        public async Task<bool> InActiveTaxGroup(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateTaxGroup(TaxGroup item)
        {
            var existingitem = await _appContext.taxgroup.FindAsync(item.Id);

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
