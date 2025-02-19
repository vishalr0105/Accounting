using DAL.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface INewRoleRepository
    {
        Task<List<string>> GetAllFeaturesCodeForAdmin();
        Task<List<string>> GetAllFeaturesCode(Guid roleId);
        Task<List<ModulebyUser>> GetAllModules(string userType);
        Task<List<ModulebyUser>> GetAllModulesForAdmin();
        Task<List<Feature>> GetAllFeatures();
    }
}
