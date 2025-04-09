using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class PaymentTermRepository : Repository<PaymentTerm>, IPaymentTermRepository
    {
        private readonly ApplicationDbContext _appContext;

        public PaymentTermRepository(DbContext context) : base(context)
        {
            _appContext = (ApplicationDbContext)context;
        }

        public async Task<PaymentTerm> CreatePaymentTerm(PaymentTerm item)
        {
            var res = await _appContext.paymentterm.AddAsync(item);
            await _appContext.SaveChangesAsync();
            return res.Entity;
        }

        public async Task<bool> DeletePaymentTerm(Guid id)
        {
            var item = await _appContext.paymentterm.FindAsync(id);

            if (item == null)
            {
                return false;
            }

            _appContext.paymentterm.Remove(item);
            await _appContext.SaveChangesAsync();

            return true;
        }

        public async Task<PaymentTerm> GetPaymentTermById(Guid id)
        {
            var item = await _appContext.paymentterm.FindAsync(id);
            return item;
        }

        public async Task<List<PaymentTerm>> GetPaymentTerms()
        {
            var res = await _appContext.paymentterm.ToListAsync();
            return res;
        }

        public async Task<bool> InActivePaymentTerm(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> UpdatePaymentTerm(PaymentTerm item)
        {
            var existingitem = await _appContext.paymentterm.FindAsync(item.Id);

            if (existingitem == null)
            {
                return false;
            }

            _appContext.Entry(existingitem).CurrentValues.SetValues(item);
            await _appContext.SaveChangesAsync();

            return true;
        }
    }
}
