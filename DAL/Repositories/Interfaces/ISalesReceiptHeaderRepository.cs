using DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace DAL.Repositories.Interfaces
{
    public interface ISalesReceiptHeaderRepository : IRepository<SalesReceiptHeader>
    {
        Task<List<SalesReceiptHeader>> GetSalesReceiptHeaders();
        Task<SalesReceiptHeader> GetSalesReceiptHeaderById(Guid id);
        Task<SalesReceiptHeader> CreateSalesReceiptHeader(SalesReceiptHeader item);
        Task<bool> UpdateSalesReceiptHeader(SalesReceiptHeader item);
        Task<bool> DeleteSalesReceiptHeader(Guid id);
        //Task<bool> InActiveSalesReceiptHeader(Guid id);
        //Task<List<SalesReceiptHeader>> SearchSalesReceiptHeader(string searchterm);
    }
}
