using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class SalesQuoteLineRepository : Repository<SalesQuoteLine>, ISalesQuoteLineRepository
    {
        private readonly ApplicationDbContext _appContext;

        public SalesQuoteLineRepository(DbContext context) : base(context)
        {
            _appContext = (ApplicationDbContext)context;
        }

        public async Task<SalesQuoteLine> CreateSalesQuoteLine(SalesQuoteLine item)
        {
            var res = await _appContext.salesquoteline.AddAsync(item);
            await _appContext.SaveChangesAsync();
            return res.Entity;
        }

        public async Task<bool> DeleteSalesQuoteLine(Guid id)
        {
            var item = await _appContext.salesquoteline.FindAsync(id);

            if (item == null)
            {
                return false;
            }

            _appContext.salesquoteline.Remove(item);
            await _appContext.SaveChangesAsync();

            return true;
        }

        public async Task<List<SalesQuoteLine>> GetSalesQuoteLineByHeaderId(Guid id)
        {
            var res = await _appContext.salesquoteline.Where(t => t.SalesQuoteHeaderId == id).ToListAsync();
            return res;
        }

        public async Task<SalesQuoteLine> GetSalesQuoteLineById(Guid id)
        {
            var item = await _appContext.salesquoteline.FindAsync(id);
            return item;
        }

        public async Task<List<SalesQuoteLine>> GetSalesQuoteLines()
        {
            var res = await _appContext.salesquoteline.ToListAsync();
            return res;
        }

        public async Task<bool> UpdateSalesQuoteLine(SalesQuoteLine item)
        {
            var existingitem = await _appContext.salesquoteline.FindAsync(item.Id);

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
