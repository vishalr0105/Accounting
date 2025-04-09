using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class SalesInvoiceLineRepository : Repository<SalesInvoiceLine>, ISalesInvoiceLineRepository
    {
        private readonly ApplicationDbContext _appContext;

        public SalesInvoiceLineRepository(DbContext context) : base(context)
        {
            _appContext = (ApplicationDbContext)context;
        }

        public async Task<SalesInvoiceLine> CreateSalesInvoiceLine(SalesInvoiceLine item)
        {
            var res = await _appContext.salesinvoiceline.AddAsync(item);
            await _appContext.SaveChangesAsync();
            return res.Entity;
        }

        public async Task<bool> DeleteSalesInvoiceLine(Guid id)
        {
            var item = await _appContext.salesinvoiceline.FindAsync(id);

            if (item == null)
            {
                return false;
            }

            _appContext.salesinvoiceline.Remove(item);
            await _appContext.SaveChangesAsync();

            return true;
        }

        public async Task<List<SalesInvoiceLine>> GetSalesInvoiceLineByHeaderId(Guid id)
        {
            var res = await _appContext.salesinvoiceline.Where(t => t.SalesInvoiceHeaderId == id).ToListAsync();
            return res;
        }

        public async Task<SalesInvoiceLine> GetSalesInvoiceLineById(Guid id)
        {
            var item = await _appContext.salesinvoiceline.FindAsync(id);
            return item;
        }

        public async Task<List<SalesInvoiceLine>> GetSalesInvoiceLines()
        {
            var res = await _appContext.salesinvoiceline.ToListAsync();
            return res;
        }

        public async Task<bool> InActiveSalesInvoiceLine(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateSalesInvoiceLine(SalesInvoiceLine item)
        {
            var existingitem = await _appContext.salesinvoiceline.FindAsync(item.Id);

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
