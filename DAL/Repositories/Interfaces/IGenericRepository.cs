using DAL.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task AddItem(T add);
        Task<IEnumerable<T>> GetAllList();
        Task<T> GetById(Guid id);
        void UpdateItem(T update);
        Task DeleteItem(Guid id);
        public int SaveChanges();
    }
}
