using DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace DAL.Repositories.Interfaces
{
    public interface IGeneralLedgerLineRepository : IRepository<GeneralLedgerLine>
    {
        Task<List<GeneralLedgerLine>> GetGeneralLedgerLines();
        Task<GeneralLedgerLine> GetGeneralLedgerLineById(Guid id);
        Task<GeneralLedgerLine> CreateGeneralLedgerLine(GeneralLedgerLine item);
        Task<bool> UpdateGeneralLedgerLine(GeneralLedgerLine item);
        Task<bool> DeleteGeneralLedgerLine(Guid id);
        Task<bool> InActiveGeneralLedgerLine(Guid id);
        //Task<List<GeneralLedgerLine>> SearchGeneralLedgerLine(string searchterm);
    }
}
