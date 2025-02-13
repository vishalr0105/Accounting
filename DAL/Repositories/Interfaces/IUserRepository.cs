using DAL.DTOS;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<Guid> AddUser(UserMaster args);
        Task UpdateUser(UserMaster userMaster);
        Task<UserMaster> GetUserById(Guid id);
        Task DeleteUser(Guid id);
        Task<UserMaster> CheckPassword(Guid Id, string password);
        //Task<UserMaster> GetUserByEmail(string email);
        Task<MasterUser> GetUserByEmail(string email);
        void UpdateUserPassword(UserMaster userMaster);
        void Profileupdate(UserMaster userMaster);
        void SaveProfilecheck(UserMaster userMaster);
        void newsavepasswords(UserMaster userMaster);
        Task<MasterUser> GetMasterUserByEmail(string Email);
    }
}