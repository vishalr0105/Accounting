using DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace DAL.Repositories.Interfaces
{
    public interface ISalesQuoteHeaderRepository : IRepository<SalesQuoteHeader>
    {
        Task<List<SalesQuoteHeader>> GetSalesQuoteHeaders(int pageSize, int pageNumber, string status, string date);
        Task<SalesQuoteHeader> GetSalesQuoteHeaderById(Guid id);
        Task<SalesQuoteHeader> CreateSalesQuoteHeader(SalesQuoteHeader item);
        Task<bool> UpdateSalesQuoteHeader(SalesQuoteHeader item);
        Task<bool> DeleteSalesQuoteHeader(Guid id);
        Task<string> GetNextNo();
        Task<List<string>> GetDistinctStatuses();
        Task<int> GetSalesQuoteCountAsync(string status = "all", string date = "all");

        //Task<bool> InActiveSalesQuoteHeader(Guid id);
        //Task<List<SalesQuoteHeader>> SearchSalesQuoteHeader(string searchterm);
    }
}
