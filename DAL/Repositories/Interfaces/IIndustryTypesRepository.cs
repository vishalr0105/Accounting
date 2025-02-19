using DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IIndustryTypesRepository
    {
        Task<List<IndustryType>> GetIndustryType();
    }
}
