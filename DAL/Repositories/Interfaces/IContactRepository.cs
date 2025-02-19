using DAL.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IContactRepository:IRepository<ContactsMasterTable>
    {
        Task AddContactRange(List<Contact> contact);
        Task DeleteRange(List<Guid> Ids);
        void DeleteContactList(List<Contact> contact);
        Task<List<Contact>> GetContactByClientId(Guid clientId);
    }
}
