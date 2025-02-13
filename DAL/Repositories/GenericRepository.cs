using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Repositories.Interfaces;
namespace DAL.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly ApplicationDbContext _context;
        private DbSet<T> _entities;
        public GenericRepository(ApplicationDbContext context)
        {
            _context = context;
            _entities = _context.Set<T>();
        }

        public async Task AddItem(T add)
        {
          await _entities.AddAsync(add);
        }

        public async Task DeleteItem(Guid Id)
        {
            var entity = await _entities.FirstOrDefaultAsync(e => e.Id == Id);
           _entities.Remove(entity);
        }

        public async Task<IEnumerable<T>> GetAllList()
        {
            return await _entities.OrderByDescending(E => E.CreatedAt).ToListAsync();
        }

        public async Task<T> GetById(Guid id)
        {
            return await _entities.FirstOrDefaultAsync(S => S.Id == id);
        }

        public void UpdateItem(T update)
        {
            _entities.Update(update);
        }

        public int SaveChanges()
        {
            return _context.SaveChanges();
        }
    }
}
