using DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace DAL.Repositories.Interfaces
{
    public interface ISalesOrderLineRepository : IRepository<SalesOrderLine>
    {
        Task<List<SalesOrderLine>> GetSalesOrderLines();
        Task<SalesOrderLine> GetSalesOrderLineById(Guid id);
        Task<SalesOrderLine> CreateSalesOrderLine(SalesOrderLine item);
        Task<List<SalesOrderLine>> GetSalesOrderLineByHeaderId(Guid id);
        Task<bool> UpdateSalesOrderLine(SalesOrderLine item);
        Task<bool> DeleteSalesOrderLine(Guid id);
        //Task<bool> InActiveSalesOrderLine(Guid id);
        //Task<List<SalesOrderLine>> SearchSalesOrderLine(string searchterm);
    }
}
