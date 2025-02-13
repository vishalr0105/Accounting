using DAL.DTOS;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IMasterUserRepository
    {
        Task<bool> Register(MasterUser input);
        Task<List<MasterUser>> GetMasterUsers();
        Task<MasterUser> GetMasterUserById(string userId);
        Task<bool> UpdateProfile(MasterUser input);
    }
}
