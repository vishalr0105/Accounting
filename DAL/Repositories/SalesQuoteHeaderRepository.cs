using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class SalesQuoteHeaderRepository : Repository<SalesQuoteHeader>, ISalesQuoteHeaderRepository
    {
        private readonly ApplicationDbContext _appContext;

        public SalesQuoteHeaderRepository(DbContext context) : base(context)
        {
            _appContext = (ApplicationDbContext)context;
        }

        public async Task<SalesQuoteHeader> CreateSalesQuoteHeader(SalesQuoteHeader item)
        {
            var res = await _appContext.salesquoteheader.AddAsync(item);
            await _appContext.SaveChangesAsync();
            return res.Entity;
        }

        public async Task<bool> DeleteSalesQuoteHeader(Guid id)
        {
            var item = await _appContext.salesquoteheader.FindAsync(id);

            if (item == null)
            {
                return false;
            }

            _appContext.salesquoteheader.Remove(item);
            await _appContext.SaveChangesAsync();

            return true;
        }

        public async Task<string> GetNextNo()
        {
            var res = await _appContext.salesquoteheader
                               .OrderByDescending(t => t.CreatedAt).Select(t => t.No).FirstOrDefaultAsync();
            if (string.IsNullOrEmpty(res))
            {
                return "001";
            }

            if (int.TryParse(res, out int invoiceNo))
            {
                invoiceNo++;
                return invoiceNo.ToString("D3");
            }
            else
            {
                return "001";
            }
        }

        public async Task<SalesQuoteHeader> GetSalesQuoteHeaderById(Guid id)
        {
            var item = await _appContext.salesquoteheader.FindAsync(id);
            return item;
        }

        public async Task<List<SalesQuoteHeader>> GetSalesQuoteHeaders(int pageSize, int pageNumber, string status, string date)
        {
            IQueryable<SalesQuoteHeader> query = _appContext.salesquoteheader;
            if (status != "all")
            {
                var statusEnum = Enum.TryParse<InvoiceStatus>(status, true, out var parsedStatus) ? parsedStatus : InvoiceStatus.Draft;
                query = query.Where(i => i.Status == (int)statusEnum);
            }

            if (date != "all" && DateTime.TryParse(date, out DateTime parsedDate))
            {
                query = query.Where(i => DateTime.Parse(i.CreatedAt).Date == parsedDate.Date);
            }

            if (pageSize > 0 && pageNumber > 0)
            {
                query = query.Skip((pageNumber - 1) * pageSize).Take(pageSize);
            }
            return await query.ToListAsync();
        }

        public async Task<bool> UpdateSalesQuoteHeader(SalesQuoteHeader item)
        {
            var existingitem = await _appContext.salesquoteheader.FindAsync(item.Id);

            if (existingitem == null)
            {
                return false;
            }

            _appContext.Entry(existingitem).CurrentValues.SetValues(item);
            await _appContext.SaveChangesAsync();

            return true;
        }

        public async Task<List<string>> GetDistinctStatuses()
        {

            var statuses = await _appContext.salesquoteheader.Select(si => si.Status).Distinct().ToListAsync();

            var statusStrings = statuses.Select(status => ((InvoiceStatus)status).ToString()).ToList();

            return statusStrings;
        }

        public async Task<int> GetSalesQuoteCountAsync(string status = "all", string date = "all")
        {
            var query = _appContext.salesquoteheader.AsQueryable();

            if (status != "all")
            {
                if (Enum.TryParse(status, true, out InvoiceStatus parsedStatus))
                {
                    query = query.Where(s => s.Status == (int)parsedStatus);
                }
                else
                {
                    return 0;
                }
            }

            if (date != "all" && DateTime.TryParse(date, out DateTime parsedDate))
            {
                query = query.Where(s => s.DueDate == parsedDate.Date.ToString());
            }

            return await query.CountAsync();
        }
    }
}
