using DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace DAL.Repositories.Interfaces
{
    public interface ISalesOrderHeaderRepository : IRepository<SalesOrderHeader>
    {
        Task<List<SalesOrderHeader>> GetSalesOrderHeaders(int pageSize, int pageNumber, string status, string date);
        Task<SalesOrderHeader> GetSalesOrderHeaderById(Guid id);
        Task<SalesOrderHeader> CreateSalesOrderHeader(SalesOrderHeader item);
        Task<bool> UpdateSalesOrderHeader(SalesOrderHeader item);
        Task<bool> DeleteSalesOrderHeader(Guid id);
        Task<bool> InActiveSalesOrderHeader(Guid id);
        Task<List<SalesOrderHeader>> SearchSalesOrderHeader(string searchterm);
        Task<string> GetNextNo();
        Task<int> GetSalesOrderCountAsync(string status = "all", string date = "all");
        Task<List<string>> GetDistinctStatuses();
    }
}
