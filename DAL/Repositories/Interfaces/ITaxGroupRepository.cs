using DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace DAL.Repositories.Interfaces
{
    public interface ITaxGroupRepository : IRepository<TaxGroup>
    {
        Task<List<TaxGroup>> GetTaxGroups();
        Task<TaxGroup> GetTaxGroupById(Guid id);
        Task<TaxGroup> CreateTaxGroup(TaxGroup item);
        Task<bool> UpdateTaxGroup(TaxGroup item);
        Task<bool> DeleteTaxGroup(Guid id);
        Task<bool> InActiveTaxGroup(Guid id);
    }
}
