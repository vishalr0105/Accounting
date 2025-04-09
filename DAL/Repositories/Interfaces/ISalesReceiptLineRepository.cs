using DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace DAL.Repositories.Interfaces
{
    public interface ISalesReceiptLineRepository : IRepository<SalesReceiptLine>
    {
        Task<List<SalesReceiptLine>> GetSalesReceiptLines();
        Task<SalesReceiptLine> GetSalesReceiptLineById(Guid id);
        Task<SalesReceiptLine> CreateSalesReceiptLine(SalesReceiptLine item);
        Task<bool> UpdateSalesReceiptLine(SalesReceiptLine item);
        Task<bool> DeleteSalesReceiptLine(Guid id);
        //Task<bool> InActiveSalesReceiptLine(Guid id);
        //Task<List<SalesReceiptLine>> SearchSalesReceiptLine(string searchterm);
    }
}
