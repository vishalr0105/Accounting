using DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace DAL.Repositories.Interfaces
{
    public interface ISalesInvoiceLineRepository : IRepository<SalesInvoiceLine>
    {
        Task<List<SalesInvoiceLine>> GetSalesInvoiceLines();
        Task<SalesInvoiceLine> GetSalesInvoiceLineById(Guid id);
        Task<List<SalesInvoiceLine>> GetSalesInvoiceLineByHeaderId(Guid id);
        Task<SalesInvoiceLine> CreateSalesInvoiceLine(SalesInvoiceLine item);
        Task<bool> UpdateSalesInvoiceLine(SalesInvoiceLine item);
        Task<bool> DeleteSalesInvoiceLine(Guid id);
        Task<bool> InActiveSalesInvoiceLine(Guid id);
    }
}
