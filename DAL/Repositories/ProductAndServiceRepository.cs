using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class ProductAndServiceRepository : Repository<ProductAndService>, IProductAndServiceRepository
    {
        private readonly ApplicationDbContext _appContext;

        public ProductAndServiceRepository(DbContext context) : base(context)
        {
            _appContext = (ApplicationDbContext)context;
        }

        public async Task<ProductAndService> CreateProductAndService(ProductAndService item)
        {
            try
            {
                var res = await _appContext.productservice.AddAsync(item);
                await _appContext.SaveChangesAsync();
                return res.Entity;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<bool> DeleteProductAndService(Guid id)
        {
            var res = await _appContext.productservice.FindAsync(id);

            if (res == null)
            {
                return false; // Customer not found
            }

            _appContext.productservice.Remove(res);
            await _appContext.SaveChangesAsync();

            return true;
        }

        public async Task<List<ProductAndService>> GetProductsAndServices()
        {
            try
            {
                var res = await _appContext.productservice.Where(i => i.IsActive == true).ToListAsync();
                return res;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ProductAndService> GetProductServiceById(Guid id)
        {
            var res = await _appContext.productservice.Where(i => i.IsActive == true && i.Id == id).FirstOrDefaultAsync();
            return res;
        }

        public async Task<bool> InActiveProductAndService(Guid id)
        {
            var item = await _appContext.productservice.FindAsync(id);

            if (item == null)
            {
                return false;
            }

            item.IsActive = false;
            await _appContext.SaveChangesAsync();

            return true;
        }

        public async Task<List<ProductAndService>> SearchProductAndService(string searchterm)
        {
            var res = await _appContext.productservice.Where(c => c.Name.ToLower().Contains(searchterm)).ToListAsync();
            return res;
        }

        public async Task<bool> UpdateProductAndService(ProductAndService item)
        {
            var existingitem = await _appContext.productservice.FindAsync(item.Id);

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
