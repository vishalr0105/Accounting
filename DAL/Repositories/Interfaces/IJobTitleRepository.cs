using DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IJobTitleRepository
    {
        Task<List<JobTitle>> GetJobTitle();
    }
}
