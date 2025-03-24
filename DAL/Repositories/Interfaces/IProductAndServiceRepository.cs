using DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace DAL.Repositories.Interfaces
{
    public interface IProductAndServiceRepository: IRepository<ProductAndService>
    {
        Task<List<ProductAndService>> GetProductsAndServices();
        Task<ProductAndService> GetProductServiceById(Guid id);
        Task<ProductAndService> CreateProductAndService(ProductAndService item);
        Task<bool> UpdateProductAndService(ProductAndService item);
        Task<bool> DeleteProductAndService(Guid id);
        Task<bool> InActiveProductAndService(Guid id);
        Task<List<ProductAndService>> SearchProductAndService(string searchterm);
    }
}
