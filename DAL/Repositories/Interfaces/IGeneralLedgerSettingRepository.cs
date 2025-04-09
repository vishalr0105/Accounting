using DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace DAL.Repositories.Interfaces
{
    public interface IGeneralLedgerSettingRepository : IRepository<GeneralLedgerSetting>
    {
        Task<List<GeneralLedgerSetting>> GetGeneralLedgerSettings();
        Task<GeneralLedgerSetting> GetGeneralLedgerSettingById(Guid id);
        Task<GeneralLedgerSetting> CreateGeneralLedgerSetting(GeneralLedgerSetting item);
        Task<bool> UpdateGeneralLedgerSetting(GeneralLedgerSetting item);
        Task<bool> DeleteGeneralLedgerSetting(Guid id);
        Task<bool> InActiveGeneralLedgerSetting(Guid id);
        //Task<List<GeneralLedgerSetting>> SearchGeneralLedgerSetting(string searchterm);
    }
}
