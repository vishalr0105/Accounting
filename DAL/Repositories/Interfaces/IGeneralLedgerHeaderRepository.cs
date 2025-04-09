using DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace DAL.Repositories.Interfaces
{
    public interface IGeneralLedgerHeaderRepository : IRepository<GeneralLedgerHeader>
    {
        Task<List<GeneralLedgerHeader>> GetGeneralLedgerHeaders();
        Task<GeneralLedgerHeader> GetGeneralLedgerHeaderById(Guid id);
        Task<GeneralLedgerHeader> CreateGeneralLedgerHeader(GeneralLedgerHeader item);
        Task<bool> UpdateGeneralLedgerHeader(GeneralLedgerHeader item);
        Task<bool> DeleteGeneralLedgerHeader(Guid id);
        Task<bool> InActiveGeneralLedgerHeader(Guid id);
        Task<List<GeneralLedgerHeader>> SearchGeneralLedgerHeader(string searchterm);
    }
}
