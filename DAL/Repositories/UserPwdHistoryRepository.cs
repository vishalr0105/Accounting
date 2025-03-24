using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class UserPwdHistoryRepository : Repository<UserPwdHistory>, IUserPwdHistoryRepository
    {
        private ApplicationDbContext _appContext;
        public UserPwdHistoryRepository(ApplicationDbContext context) : base(context)
        {
            _appContext = context;
        }

        public async Task<Guid> Add(UserPwdHistory item)
        {
            item.CreatedAt = DateTime.UtcNow;
            try
            {
                var res = await _appContext.userpwdhistory.AddAsync(item);
                await _appContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw;
            }
            return item.UserId;
        }

        public async Task<UserPwdHistory> Get(string resetpwdcode)
        {
            var item = await _appContext.userpwdhistory.FirstOrDefaultAsync(u => u.ResetPwdCode == resetpwdcode && u.IsLinkActive);
            return item;
        }
    }
}
