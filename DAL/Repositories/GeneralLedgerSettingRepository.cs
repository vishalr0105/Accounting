using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class GeneralLedgerSettingRepository : Repository<GeneralLedgerSetting>, IGeneralLedgerSettingRepository
    {
        private readonly ApplicationDbContext _appContext;

        public GeneralLedgerSettingRepository(DbContext context) : base(context)
        {
            _appContext = (ApplicationDbContext)context;
        }

        public async Task<GeneralLedgerSetting> CreateGeneralLedgerSetting(GeneralLedgerSetting item)
        {
            var res = await _appContext.generalledgersetting.AddAsync(item);
            await _appContext.SaveChangesAsync();
            return res.Entity;
        }

        public async Task<bool> DeleteGeneralLedgerSetting(Guid id)
        {
            var item = await _appContext.generalledgersetting.FindAsync(id);

            if (item == null)
            {
                return false;
            }

            _appContext.generalledgersetting.Remove(item);
            await _appContext.SaveChangesAsync();

            return true;
        }

        public async Task<GeneralLedgerSetting> GetGeneralLedgerSettingById(Guid id)
        {
            var item = await _appContext.generalledgersetting.FindAsync(id);
            return item;
        }

        public async Task<List<GeneralLedgerSetting>> GetGeneralLedgerSettings()
        {
            var res = await _appContext.generalledgersetting.ToListAsync();
            return res;
        }

        public async Task<bool> InActiveGeneralLedgerSetting(Guid id)
        {
            throw new NotImplementedException();
        }

        //public async Task<List<GeneralLedgerSetting>> SearchGeneralLedgerSetting(string searchterm)
        //{
        //    var res = await _appContext.generalledgersetting.Where(c => c.ToLower().Contains(searchterm)).ToListAsync();
        //    return res;
        //}

        public async Task<bool> UpdateGeneralLedgerSetting(GeneralLedgerSetting item)
        {
            var existingitem = await _appContext.generalledgersetting.FindAsync(item.Id);

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
