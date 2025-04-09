using DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace DAL.Repositories.Interfaces
{
    public interface ITaxRepository : IRepository<Tax>
    {
        Task<List<Tax>> GetTaxs();
        Task<Tax> GetTaxById(Guid id);
        Task<Tax> CreateTax(Tax item);
        Task<bool> UpdateTax(Tax item);
        Task<bool> DeleteTax(Guid id);
        Task<bool> InActiveTax(Guid id);
    }
}
