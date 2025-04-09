using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class GeneralLedgerLineRepository : Repository<GeneralLedgerLine>, IGeneralLedgerLineRepository
    {
        private readonly ApplicationDbContext _appContext;

        public GeneralLedgerLineRepository(DbContext context) : base(context)
        {
            _appContext = (ApplicationDbContext)context;
        }

        public async Task<GeneralLedgerLine> CreateGeneralLedgerLine(GeneralLedgerLine item)
        {
            var res = await _appContext.generalledgerline.AddAsync(item);
            await _appContext.SaveChangesAsync();
            return res.Entity;
        }

        public async Task<bool> DeleteGeneralLedgerLine(Guid id)
        {
            var item = await _appContext.generalledgerline.FindAsync(id);

            if (item == null)
            {
                return false;
            }

            _appContext.generalledgerline.Remove(item);
            await _appContext.SaveChangesAsync();

            return true;
        }

        public async Task<GeneralLedgerLine> GetGeneralLedgerLineById(Guid id)
        {
            var item = await _appContext.generalledgerline.FindAsync(id);
            return item;
        }

        public async Task<List<GeneralLedgerLine>> GetGeneralLedgerLines()
        {
            var res = await _appContext.generalledgerline.ToListAsync();
            return res;
        }

        public async Task<bool> UpdateGeneralLedgerLine(GeneralLedgerLine item)
        {
            var existingitem = await _appContext.generalledgerline.FindAsync(item.Id);

            if (existingitem == null)
            {
                return false;
            }

            _appContext.Entry(existingitem).CurrentValues.SetValues(item);
            await _appContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> InActiveGeneralLedgerLine(Guid id)
        {
            throw new NotImplementedException();
        }

        //public async Task<List<GeneralLedgerLine>> SearchGeneralLedgerLine(string searchterm)
        //{
        //    var res = await _appContext.generalledgerline.Where(c => c.DrCr.ToLower().Contains(searchterm)).ToListAsync();
        //    return res;
        //}
    }
}
