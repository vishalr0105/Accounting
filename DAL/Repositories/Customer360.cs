using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Repositories.Interfaces;
namespace DAL.Repositories
{
    public class Customer360 : ICustomer360
	{
		private readonly ApplicationDbContext _context;

		public Customer360(ApplicationDbContext context)
		{
			_context = context;
		}


        public async Task<ContactsMasterTable> CreateContacts(ContactsMasterTable contacts,bool AllowCustomerPortal, string pwd)
		{
            using (var context = _context)
            {
                using (var tr = context.Database.BeginTransactionAsync())
                {
                    try
                    {
                        await _context.ContactsMasterTable.AddAsync(contacts);
                        await _context.SaveChangesAsync();
                        var model = new ContactsTableLog();
                        model.CreatedBy = contacts.CreatedBy;
                        model.CompanyId = contacts.CompanyID;
                        model.UpdatedBy = contacts.UpdatedBy;
                        model.ContactId = contacts.Id;
                        model.Description = "Account Created";
                        model.Time = DateTime.UtcNow;
                        await _context.ContactsTableLog.AddAsync(model);
                        await _context.SaveChangesAsync();
                        if (AllowCustomerPortal == true)
                        { 
                            _context.UserMaster.Add(new UserMaster
                            {
                                FullName = contacts.ContactName,
                                CompanyId = (Guid)contacts.CompanyID!,
                                EmailID = contacts.EmailID,
                                UserName = contacts.EmailID,
                                UserType = "Customer",
                                Password = pwd,
                                JoiningDate = DateTime.UtcNow,
                                CreatedAt = DateTime.UtcNow,
                                RollId = new Guid("0951f297-270d-4f0f-ba0d-8f23347cc045"),
                            });
                        }
                        tr.Result.Commit();
                        _context.SaveChanges();
                    }
                    catch (Exception ex)
                    {
                       await tr.Result.RollbackAsync();
                    }
                }
            }
                return contacts;
		}

        
        public async void DeleteAccount(AccountTable accountTable)
		{
			_context.AccountTable.Remove(accountTable);
			_context.SaveChanges();
		}

		public void DeleteContacts(ContactsMasterTable contacts)
		{
			_context.ContactsMasterTable.Remove(contacts);
			_context.SaveChanges();
		}

		public async Task<AccountTable> GetAccountById(Guid id, Guid? compId)
		{
			var account = await _context.AccountTable.SingleOrDefaultAsync(x => x.Id == id && x.CompanyID == compId);
			return account;
		}

		public async Task<IEnumerable<AccountTableLog>> GetAccountLog(Guid id, Guid? compId)
		{
			var log = await _context.AccountTableLog.Where(x => x.AccountId == id && x.CompanyId == compId).ToListAsync();
			return log;
		}

		public async Task<bool> GetUserByEmail(string email, Guid? id)
		{
			if (id != null)
			{
				var isExist1 = await _context.AccountTable.AnyAsync(x => (x.CompanyEmailID == email && x.Id != id));
				return isExist1;
			}
			var isExist = await _context.AccountTable.AnyAsync(x => x.CompanyEmailID == email);
			return isExist;
		}

		public async Task<List<AccountTable>> getAccounts(Guid? companyId)
		{
			var accounts = await _context.AccountTable
                .Where(x => x.CompanyID == companyId)
                .OrderBy(c=>c.AccountName)
                .ToListAsync();
			return accounts;
		}


        public async Task<List<AccountTable>> getAccountsById(Guid? companyId,string technicianId)
        {
            var accounts = await _context.AccountTable.Where(x => x.CompanyID == companyId && x.CreatedBy==technicianId).ToListAsync();
            return accounts;
        }

        public async Task<IEnumerable<AccountDto>> GetAccountsAndContacts(Guid? id)
		{
			var accountModel = new List<AccountDto>();
			var accounts = await _context.AccountTable.Where(x => x.CompanyID == id).ToListAsync();

			return accountModel;
		}

		public async Task<AccountDto> GetAccountWithContact(Guid id)
		{

			var account = await _context.AccountTable.SingleOrDefaultAsync(x => x.Id == id);
			var model = new AccountDto();
			return model;
		}

		public async Task<IEnumerable<ActivityStatusTable>> GetActivities()
		{
			var model = await _context.ActivityStatusTable.ToListAsync();
			return model;

		}

		public async Task<IEnumerable<ContactsMasterTable>> GetContacts(Guid? companyId)
		{
			var contacts = await _context.ContactsMasterTable
                .Include(x => x.Company).Include(x => x.Account)
                .Where(x => x.CompanyID == companyId)
                .OrderBy(x=>x.ContactName)
                .ToListAsync();
			return contacts;
		}

        public async Task<IEnumerable<ContactsMasterTable>> GetContactsByTechId(Guid? companyId,string techId)
        {
            var contacts = await _context.ContactsMasterTable.Include(x => x.Company).Include(x => x.Account).Where(x => x.CompanyID == companyId && x.CreatedBy==techId).ToListAsync();
            return contacts;
        }

        public async Task<IEnumerable<ContactsTableLog>> GetContactsLog(Guid id, Guid? compId)
		{
			var log = await _context.ContactsTableLog.Where(x => x.ContactId == id && x.CompanyId == compId).ToListAsync();
			return log;
		}

		public async Task<IEnumerable<ContactsMasterTable>> GetContatactByAccountId(Guid id)
		{
			var contacts = await _context.ContactsMasterTable.Include(x => x.Company).Include(x => x.Account).Where(x => x.AccountId == id).ToListAsync();
			return contacts;
		}

        public async Task<IEnumerable<ContactsMasterTable>> GetContatactByAccountIdForTechnician(Guid id,string techId)
        {
            var contacts = await _context.ContactsMasterTable.Include(x => x.Company).Include(x => x.Account).Where(x => x.AccountId == id && x.CreatedBy==techId ).ToListAsync();
            return contacts;
        }

        public async Task<ContactsMasterTable> GetContatactById(Guid id, Guid? compId)
		{
			var contact = await _context.ContactsMasterTable.SingleOrDefaultAsync(x => x.Id == id && x.CompanyID == compId);
			return contact;
		}

		public AccountTable UpdateAccount(AccountTable accountTable)
		{
			_context.AccountTable.Update(accountTable);
			_context.SaveChanges();
			return accountTable;
		}

		public ContactsMasterTable UpdateContacts(ContactsMasterTable contacts)
		{
			_context.ContactsMasterTable.Update(contacts);
			_context.SaveChanges();
			return contacts;
		}

		public async Task<bool> GetContactByEmail(string email, Guid? userId)
		{
			if (userId != null)
			{
				var contact = await _context.ContactsMasterTable.AnyAsync(x => (x.EmailID == email && x.Id != userId));
				return contact;
			}
			var contact1 = await _context.ContactsMasterTable.AnyAsync(x => (x.EmailID == email));
			return contact1;
		}
    }
}
