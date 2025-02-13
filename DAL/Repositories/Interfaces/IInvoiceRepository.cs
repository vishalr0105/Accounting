using DAL.Models;
//using DAL.TechnicianPortal.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

        //public ActionResult<ResponseModel> AddInvoices(InvoiceModel invoiceTable);
        //public ActionResult<ResponseModel> AddPayment(PaymentsModel payment);
        //public ActionResult<ResponseModel> GetInvoices(DateTime? fromDate, DateTime? endDate, string? paymentStatus);
        //public ActionResult<ResponseModel> GetInvoicesByCustId(Guid id, DateTime? fromDate, DateTime? endDate, string? paymentStatus);

        //public ActionResult<ResponseModel> GetInvoicesByTechId(Guid id);
       

    }
}
