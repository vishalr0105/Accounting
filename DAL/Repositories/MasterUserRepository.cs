using DAL.DTOS;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class MasterUserRepository : Repository<MasterUser>, IMasterUserRepository
    {
        public MasterUserRepository(DbContext context) : base(context) { }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

        public async Task<MasterUser> GetMasterUserById(string userId)
        {
            try
            {
                var res = await _appContext.masterusers.Where(m => m.Id.ToString().ToLower() == userId.ToLower()).FirstOrDefaultAsync();
                return res;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<MasterUser>> GetMasterUsers()
        {
            try
            {
                var res = await _appContext.masterusers.ToListAsync();
                return res; 
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<bool> Register(MasterUser input)
        {
            try
            {
                await _appContext.AddAsync(input);
                await _appContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> UpdateProfile(MasterUser input)
        {
            try
            {
                var existingUser = await _appContext.masterusers.FindAsync(input.Id);
                if (existingUser == null) return false;

                _appContext.Entry(existingUser).CurrentValues.SetValues(input);
                await _appContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
