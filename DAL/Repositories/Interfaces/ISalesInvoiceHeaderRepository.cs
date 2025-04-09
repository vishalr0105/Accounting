using DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace DAL.Repositories.Interfaces
{
    public interface ISalesInvoiceHeaderRepository : IRepository<SalesInvoiceHeader>
    {
        Task<List<SalesInvoiceHeader>> GetSalesInvoiceHeaders(int pageSize, int pageNumber, string status, string date);
        Task<SalesInvoiceHeader> GetSalesInvoiceHeaderById(Guid id);
        Task<SalesInvoiceHeader> CreateSalesInvoiceHeader(SalesInvoiceHeader item);
        Task<bool> UpdateSalesInvoiceHeader(SalesInvoiceHeader item);
        Task<bool> DeleteSalesInvoiceHeader(Guid id);
        Task<bool> InActiveSalesInvoiceHeader(Guid id);
        Task<List<string>> GetDistinctStatuses();
        Task<int> GetSalesInvoiceCountAsync(string status = "all", string date = "all");
        Task<string> GetNextNo();
    }
}
