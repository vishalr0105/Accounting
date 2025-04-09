using DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace DAL.Repositories.Interfaces
{
    public interface ISalesQuoteLineRepository : IRepository<SalesQuoteLine>
    {
        Task<List<SalesQuoteLine>> GetSalesQuoteLines();
        Task<SalesQuoteLine> GetSalesQuoteLineById(Guid id);
        Task<SalesQuoteLine> CreateSalesQuoteLine(SalesQuoteLine item);
        Task<List<SalesQuoteLine>> GetSalesQuoteLineByHeaderId(Guid id);
        Task<bool> UpdateSalesQuoteLine(SalesQuoteLine item);
        Task<bool> DeleteSalesQuoteLine(Guid id);
        //Task<bool> InActiveSalesQuoteLine(Guid id);
        //Task<List<SalesQuoteLine>> SearchSalesQuoteLine(string searchterm);
    }
}
