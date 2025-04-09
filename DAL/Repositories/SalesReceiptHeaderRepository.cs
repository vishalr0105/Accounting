using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class SalesReceiptHeaderRepository : Repository<SalesReceiptHeader>, ISalesReceiptHeaderRepository
    {
        private readonly ApplicationDbContext _appContext;

        public SalesReceiptHeaderRepository(DbContext context) : base(context)
        {
            _appContext = (ApplicationDbContext)context;
        }

        public async Task<SalesReceiptHeader> CreateSalesReceiptHeader(SalesReceiptHeader item)
        {
            var res = await _appContext.salesreceiptheader.AddAsync(item);
            await _appContext.SaveChangesAsync();
            return res.Entity;
        }

        public async Task<bool> DeleteSalesReceiptHeader(Guid id)
        {
            var item = await _appContext.salesreceiptheader.FindAsync(id);

            if (item == null)
            {
                return false;
            }

            _appContext.salesreceiptheader.Remove(item);
            await _appContext.SaveChangesAsync();

            return true;
        }

        public async Task<SalesReceiptHeader> GetSalesReceiptHeaderById(Guid id)
        {
            var item = await _appContext.salesreceiptheader.FindAsync(id);
            return item;
        }

        public async Task<List<SalesReceiptHeader>> GetSalesReceiptHeaders()
        {
            var res = await _appContext.salesreceiptheader.ToListAsync();
            return res;
        }

        public async Task<bool> UpdateSalesReceiptHeader(SalesReceiptHeader item)
        {
            var existingitem = await _appContext.salesreceiptheader.FindAsync(item.Id);

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
