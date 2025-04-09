using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class GeneralLedgerHeaderRepository : Repository<GeneralLedgerHeader>, IGeneralLedgerHeaderRepository
    {
        private readonly ApplicationDbContext _appContext;

        public GeneralLedgerHeaderRepository(DbContext context) : base(context)
        {
            _appContext = (ApplicationDbContext)context;
        }

        public async Task<GeneralLedgerHeader> CreateGeneralLedgerHeader(GeneralLedgerHeader item)
        {
            var res = await _appContext.generalledgerheader.AddAsync(item);
            await _appContext.SaveChangesAsync();
            return res.Entity;
        }

        public async Task<bool> DeleteGeneralLedgerHeader(Guid id)
        {
            var item = await _appContext.generalledgerheader.FindAsync(id);

            if (item == null)
            {
                return false;
            }

            _appContext.generalledgerheader.Remove(item);
            await _appContext.SaveChangesAsync();

            return true;
        }

        public async Task<GeneralLedgerHeader> GetGeneralLedgerHeaderById(Guid id)
        {
            var item = await _appContext.generalledgerheader.FindAsync(id);
            return item;
        }

        public async Task<List<GeneralLedgerHeader>> GetGeneralLedgerHeaders()
        {
            var res = await _appContext.generalledgerheader.ToListAsync();
            return res;
        }

        public async Task<List<GeneralLedgerHeader>> SearchGeneralLedgerHeader(string searchterm)
        {
            var res = await _appContext.generalledgerheader.Where(c => c.Description.ToLower().Contains(searchterm)).ToListAsync();
            return res;
        }

        public async Task<bool> UpdateGeneralLedgerHeader(GeneralLedgerHeader item)
        {
            var existingitem = await _appContext.generalledgerheader.FindAsync(item.Id);

            if (existingitem == null)
            {
                return false;
            }

            _appContext.Entry(existingitem).CurrentValues.SetValues(item);
            await _appContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> InActiveGeneralLedgerHeader(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
