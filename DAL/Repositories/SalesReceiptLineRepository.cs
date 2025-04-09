using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class SalesReceiptLineRepository : Repository<SalesReceiptLine>, ISalesReceiptLineRepository
    {
        private readonly ApplicationDbContext _appContext;

        public SalesReceiptLineRepository(DbContext context) : base(context)
        {
            _appContext = (ApplicationDbContext)context;
        }

        public async Task<SalesReceiptLine> CreateSalesReceiptLine(SalesReceiptLine item)
        {
            var res = await _appContext.salesreceiptline.AddAsync(item);
            await _appContext.SaveChangesAsync();
            return res.Entity;
        }

        public async Task<bool> DeleteSalesReceiptLine(Guid id)
        {
            var item = await _appContext.salesreceiptline.FindAsync(id);

            if (item == null)
            {
                return false;
            }

            _appContext.salesreceiptline.Remove(item);
            await _appContext.SaveChangesAsync();

            return true;
        }

        public async Task<SalesReceiptLine> GetSalesReceiptLineById(Guid id)
        {
            var item = await _appContext.salesreceiptline.FindAsync(id);
            return item;
        }

        public async Task<List<SalesReceiptLine>> GetSalesReceiptLines()
        {
            var res = await _appContext.salesreceiptline.ToListAsync();
            return res;
        }

        public async Task<bool> UpdateSalesReceiptLine(SalesReceiptLine item)
        {
            var existingitem = await _appContext.salesreceiptline.FindAsync(item.Id);

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
