using DAL.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IInvoiceRepository:IRepository<Invoice>
    {
        Invoice GetInvoiceByUserId(string UserId);

        Task<IEnumerable<Invoice>> GetInvoicesByUserId(string UserId, DateTime FromDate, DateTime ToDate);
        Task<IEnumerable<Invoice>> GetInvoicesByUserId(string UserId);

        Guid CreateInvoice(Invoice args);

        Task<bool> UpdateInvoice(Invoice args);

        Task<bool> DeleteInvoiceById(Guid id);

        Task<bool> DeleteInvoiceByUserId(string userId);

    }
}
