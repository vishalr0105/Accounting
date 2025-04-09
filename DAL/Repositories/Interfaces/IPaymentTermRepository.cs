using DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace DAL.Repositories.Interfaces
{
    public interface IPaymentTermRepository : IRepository<PaymentTerm>
    {
        Task<List<PaymentTerm>> GetPaymentTerms();
        Task<PaymentTerm> GetPaymentTermById(Guid id);
        Task<PaymentTerm> CreatePaymentTerm(PaymentTerm item);
        Task<bool> UpdatePaymentTerm(PaymentTerm item);
        Task<bool> DeletePaymentTerm(Guid id);
        Task<bool> InActivePaymentTerm(Guid id);
        //Task<List<PaymentTerm>> SearchPaymentTerm(string searchterm);
    }
}
