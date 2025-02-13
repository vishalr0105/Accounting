using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories
{
    public class ContactRepository : Repository<ContactsMasterTable>, IContactRepository
    {
        public ContactRepository(DbContext context) : base(context)
        { }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

        public async Task<List<Contact>> GetContactByClientId(Guid clientId)
        {
            return await _appContext.Contacts.Where(C => C.ClientAndSuppliersId.Equals(clientId)).ToListAsync();
        }

        public async Task AddContactRange(List<Contact> contacts)
        {
            contacts.ForEach(c => c.CreatedAt = DateTime.UtcNow);
            await _appContext.Contacts.AddRangeAsync(contacts);
        }

        public void DeleteContactList(List<Contact> contact)
        {
            _appContext.Contacts.RemoveRange(contact);
        }

        public async Task DeleteRange(List<Guid> Ids)
        {
            List<Contact> list = await _appContext.Contacts.Where(C => Ids.Contains(C.Id)).ToListAsync();
            if (list.Count > 0)
            {
                _appContext.Contacts.RemoveRange(list);
            }
        }
    }
}
