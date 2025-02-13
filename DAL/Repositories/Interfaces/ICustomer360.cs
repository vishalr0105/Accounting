using DAL.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface ICustomer360
	{
		Task<bool> GetContactByEmail(string email,Guid? userId);
		Task<bool> GetUserByEmail(string email, Guid? id);
		Task<IEnumerable<AccountTableLog>> GetAccountLog(Guid id, Guid? compId);
		Task<IEnumerable<ContactsTableLog>> GetContactsLog(Guid id, Guid? compId);
		Task<ContactsMasterTable> GetContatactById(Guid id, Guid? compId);
		Task<IEnumerable<ContactsMasterTable>> GetContatactByAccountId(Guid id);
        Task<IEnumerable<ContactsMasterTable>> GetContatactByAccountIdForTechnician(Guid id,string techId);
        Task<AccountTable> GetAccountById(Guid id, Guid? compId);
		Task<AccountDto> GetAccountWithContact(Guid id);
		Task<IEnumerable<AccountDto>> GetAccountsAndContacts(Guid? id);
		AccountTable UpdateAccount(AccountTable accountTable);
		void DeleteAccount(AccountTable accountTable);
		Task<List<AccountTable>> getAccounts(Guid? companyId);
        Task<List<AccountTable>> getAccountsById(Guid? companyId, string technicianId);
        Task<ContactsMasterTable> CreateContacts(ContactsMasterTable contacts, bool AllowCustomerPortal, string pwd);
		ContactsMasterTable UpdateContacts(ContactsMasterTable contacts);
		void DeleteContacts(ContactsMasterTable contacts);
		Task<IEnumerable<ContactsMasterTable>> GetContacts(Guid? companyId);
        Task<IEnumerable<ContactsMasterTable>> GetContactsByTechId(Guid? companyId, string techId);
        Task<IEnumerable<ActivityStatusTable>> GetActivities();
    }
}
