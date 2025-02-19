using DAL.Models;
using System;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IUserPwdHistoryRepository
    {
        Task<Guid> Add(UserPwdHistory add);
        Task<UserPwdHistory> Get(string resetpwdcode);

    }
}
