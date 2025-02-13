using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface INewRoleRepository
    {
        Task<List<string>> GetAllFeaturesCodeForAdmin();
        Task<List<string>> GetAllFeaturesCode(Guid roleId);
        Task<List<ModulebyUser>> GetAllModules(string userType);//,Guid companyId);
        //Task<List<ModulebyUser>> GetAllModulesSuperAdmin(Guid roleId);
        //Task<IActionResult> AddNewRole(UserRole newRole);
        //Task UpdateRole(UserRole newRole);
        Task<List<ModulebyUser>> GetAllModulesForAdmin();
        //Task DeleteRole(Guid id);
        //Task<UserRole> GetNewRoleById(Guid id);
        //bool IsNameExist(string Name,Guid CompanyId);
        Task<List<Feature>> GetAllFeatures();
    }
}
