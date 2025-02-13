using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using iTextSharp.text.pdf;
using iTextSharp.text;
using System.IO;
namespace DAL.Repositories
{
    public class InvoiceRepository : Repository<Invoice>, IInvoiceRepository
    {
        private ApplicationDbContext _appContext => (ApplicationDbContext)_appContext;

        public InvoiceRepository(DbContext context) : base(context)
        {
        }

        public Invoice GetInvoiceByUserId(string UserId)
        {
            return _appContext.Invoices.Where(m => m.UserId == UserId).FirstOrDefault();
        }

        public async Task<IEnumerable<Invoice>> GetInvoicesByUserId(string UserId, DateTime FromDate, DateTime ToDate)
        {
            return await _appContext.Invoices.Where(x => x.UserId == UserId && x.CreatedAt >= FromDate && x.CreatedAt <= ToDate).ToListAsync();
        }
        public async Task<IEnumerable<Invoice>> GetInvoicesByUserId(string UserId)
        {
            return await _appContext.Invoices.Where(x => x.UserId == UserId).ToListAsync();
        }

        public Guid CreateInvoice(Invoice args)
        {
            args.CreatedAt = DateTime.UtcNow;
            _appContext.Invoices.Add(args);
            _appContext.SaveChanges();
            return args.Id;
        }

        public async Task<bool> UpdateInvoice(Invoice args)
        {
            args.UpdatedAt = DateTime.UtcNow;
            _appContext.Entry(args).State = EntityState.Modified;
            await _appContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteInvoiceById(Guid id)
        {
            var sub = await _appContext.Invoices.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (sub != null)
            {
                _appContext.Invoices.Remove(sub);
                await _appContext.SaveChangesAsync();
            }
            return true;
        }

        public async Task<bool> DeleteInvoiceByUserId(string userId)
        {
            var subList = await _appContext.Invoices.Where(x => x.UserId == userId).ToListAsync();
            if (subList != null)
            {
                _appContext.Invoices.RemoveRange(subList);
                await _appContext.SaveChangesAsync();
            }
            return true;
        }
    }
}
