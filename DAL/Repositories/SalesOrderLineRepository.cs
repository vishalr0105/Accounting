using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class SalesOrderLineRepository : Repository<SalesOrderLine>, ISalesOrderLineRepository
    {
        private readonly ApplicationDbContext _appContext;

        public SalesOrderLineRepository(DbContext context) : base(context)
        {
            _appContext = (ApplicationDbContext)context;
        }

        public async Task<SalesOrderLine> CreateSalesOrderLine(SalesOrderLine item)
        {
            var res = await _appContext.salesorderline.AddAsync(item);
            await _appContext.SaveChangesAsync();
            return res.Entity;
        }

        public async Task<bool> DeleteSalesOrderLine(Guid id)
        {
            var item = await _appContext.salesorderline.FindAsync(id);

            if (item == null)
            {
                return false;
            }

            _appContext.salesorderline.Remove(item);
            await _appContext.SaveChangesAsync();

            return true;
        }

        public async Task<List<SalesOrderLine>> GetSalesOrderLineByHeaderId(Guid id)
        {
            var res = await _appContext.salesorderline.Where(t => t.SalesOrderHeaderId == id).ToListAsync();
            return res;
        }

        public async Task<SalesOrderLine> GetSalesOrderLineById(Guid id)
        {
            var item = await _appContext.salesorderline.FindAsync(id);
            return item;
        }

        public async Task<List<SalesOrderLine>> GetSalesOrderLines()
        {
            var res = await _appContext.salesorderline.ToListAsync();
            return res;
        }

        public async Task<bool> UpdateSalesOrderLine(SalesOrderLine item)
        {
            var existingitem = await _appContext.salesorderline.FindAsync(item.Id);

            if (existingitem == null)
            {
                return false;
            }

            _appContext.Entry(existingitem).CurrentValues.SetValues(item);
            await _appContext.SaveChangesAsync();

            return true;
        }

        //public async Task<bool> InActiveSalesOrderLine(Guid id)
        //{
        //    throw new NotImplementedException();
        //}

        //public async Task<List<SalesOrderLine>> SearchSalesOrderLine(string searchterm)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
