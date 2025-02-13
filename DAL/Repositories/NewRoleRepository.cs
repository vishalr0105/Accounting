using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Repositories.Interfaces;
namespace DAL.Repositories
{
    public class NewRoleRepository : Repository<NewRole>, INewRoleRepository
    {
        public NewRoleRepository(DbContext context) : base(context) { }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

        public async Task<List<string>> GetAllFeaturesCode(Guid roleId)
        {
            var data = await (from rp in _appContext.RolePermissions
                              join m in _appContext.Modules on rp.ModuleId equals m.Id into ps
                              from p in ps.DefaultIfEmpty()
                              join f in _appContext.Features on rp.FeatureId equals f.Id into pf
                              from fp in pf.DefaultIfEmpty()
                              join p1 in _appContext.Permissions on rp.PermissionId equals p1.Id into pp
                              from fp1 in pp.DefaultIfEmpty()
                              where rp.RoleId == roleId
                              select new Permission
                              {
                                  Code = fp1.Code,
                              }).ToListAsync();

            var list = data.Select(x => x.Code).ToList();
            return list;
        }

        public async Task<List<string>> GetAllFeaturesCodeForAdmin()
        {
            var data = await (from rp in _appContext.RolePermissions
                              join m in _appContext.Modules on rp.ModuleId equals m.Id into ps
                              from p in ps.DefaultIfEmpty()
                              join f in _appContext.Features on rp.FeatureId equals f.Id into pf
                              from fp in pf.DefaultIfEmpty()
                              join p1 in _appContext.Permissions on rp.PermissionId equals p1.Id into pp
                              from fp1 in pp.DefaultIfEmpty()
                              select new Permission
                              {
                                  Code = fp1.Code,
                              }).ToListAsync();
            var list = data.Select(x => x.Code).ToList();
            return list;
        }

        public async Task<List<ModulebyUser>> GetAllModules(string userType)//, Guid companyId)
        {
            var list = new List<ModulebyUser>();
            IQueryable<dynamic> moduleQuery;

            if (userType == "SuperAdmin")
            {
                moduleQuery = from rp in _appContext.CompanySidebar
                              join m in _appContext.Modules on rp.ModuleId equals m.Id
                              where rp.UserType == userType && !rp.IsDeleted
                              orderby m.SortOrder
                              select new
                              {
                                  rp.ModuleId,
                                  m.Name,
                                  m.SortOrder,
                                  m.Icon
                              };
            }
            else if (userType.ToLower() == "user")
            {
                moduleQuery = from rp in _appContext.CompanySidebar
                              join m in _appContext.Modules on rp.ModuleId equals m.Id
                              //where userType.ToLower() == "user" && !rp.IsDeleted
                              where rp.UserType.ToLower() == "user" && !rp.IsDeleted //&& rp.CompanyId == companyId
                              orderby m.SortOrder
                              select new
                              {
                                  rp.ModuleId,
                                  m.Name,
                                  m.SortOrder,
                                  m.Icon
                              };
            }
            else
            {
                moduleQuery = from rp in _appContext.CompanySidebar
                              join m in _appContext.Modules on rp.ModuleId equals m.Id
                              where
                               rp.UserType.ToLower() == userType.ToLower() &&
                              !rp.IsDeleted //&& rp.CompanyId == companyId
                              orderby m.SortOrder
                              select new
                              {
                                  rp.ModuleId,
                                  m.Name,
                                  m.SortOrder,
                                  m.Icon
                              };
            }

            var moduleData = await moduleQuery.ToListAsync();
            var groupedModules = moduleData.GroupBy(x => x.ModuleId);
            foreach (var module in groupedModules)
            {
                var firstModule = module.First();

                var moduleModel = new ModulebyUser
                {
                    ModuleId = (Guid)firstModule.ModuleId,
                    Name = firstModule.Name,
                    SortOrder = firstModule.SortOrder,
                    Icon = firstModule.Icon,
                    Features = new List<FeaturebyUser>()
                };

                moduleModel.Features = await (from f in _appContext.Features
                                              where f.ModuleId == moduleModel.ModuleId
                                                    && !f.IsDeleted
                                                    && (userType.ToLower() != "user" || f.Name != "Vendors")
                                              select new FeaturebyUser
                                              {
                                                  Name = f.Name,
                                                  Code = f.Code,
                                                  FeatureId = f.Id,
                                                  Url = f.Url,
                                                  Icon = f.Icon,
                                                  SortOrder = f.SortOrder
                                              }).OrderBy(x => x.SortOrder).ToListAsync();

                moduleModel.Features = moduleModel.Features.GroupBy(x => x.FeatureId)
                                                            .Select(x => x.First())
                                                            .ToList();
                if (moduleModel.Name.ToLower() == "sales" && userType.ToLower() == "user")
                {
                    continue;
                }
                list.Add(moduleModel);
            }

            return list;
        }

        public async Task<List<ModulebyUser>> GetAllModulesForAdmin()
        {
            var list = new List<ModulebyUser>();
            var data1 = await (from rp in _appContext.Modules
                               where rp.IsDeleted == false
                               join m in _appContext.RolePermissions on rp.Id equals m.ModuleId into ps
                               from p in ps.DefaultIfEmpty()
                               orderby rp.SortOrder
                               select new ModulebyUser
                               {
                                   ModuleId = rp.Id.Value,
                                   Name = rp.Name,
                                   SortOrder = rp.SortOrder,
                                   Icon = rp.Icon
                               }).ToListAsync();
            data1 = data1.OrderBy(x => x.SortOrder).ToList();
            var data = data1.GroupBy(x => x.ModuleId);
            foreach (var module in data)
            {
                var model = new ModulebyUser();
                model.ModuleId = module.Key;
                model.Icon = module.First().Icon;
                model.SortOrder = module.First().SortOrder;
                model.Name = _appContext.Modules.FirstOrDefault(x => x.Id == module.Key).Name;
                model.Features = _appContext.Features.Where(x => x.ModuleId == model.ModuleId && x.IsDeleted == false).Select(y => new FeaturebyUser()
                {
                    Name = y.Name,
                    Code = y.Code,
                    FeatureId = y.Id,
                    Url = y.Url,
                    Icon = y.Icon,
                    Permissions = (from rp in _appContext.RolePermissions
                                   join m in _appContext.Permissions on rp.PermissionId equals m.Id
                                   where rp.FeatureId == y.Id
                                   select new PermissionbyUser
                                   {
                                       Code = m.Code,
                                       Name = m.Name,
                                       PermissionId = rp.PermissionId
                                   }).ToList()
                }).ToList();
                list.Add(model);
            }
            return list;
        }

        public async Task<List<Feature>> GetAllFeatures()
        {
            var Features = await _appContext.Features
                .Where(m => m.IsDeleted == false)
                .Select(y => new Feature
                {
                    Code = y.Code,
                    ModuleId = y.ModuleId.ToString(),
                    Description = y.Description,
                    Id = y.Id.ToString(),
                    Name = y.Name
                })
                .OrderBy(S => S.Name)
                .ToListAsync();

            if (Features.Count > 0)
            {
                //Features.Permissions = new List<Permission>();
                foreach (var feature in Features)
                {
                    feature.Permissions = (await GetAllPermission(new Guid(feature.Id))).ToList();
                }
            }

            return Features;
        }

        private async Task<List<Permission>> GetAllPermission(Guid featureId)
        {
            return await _appContext.Permissions.Where(x => x.FeatureId == featureId).Select(y => new Permission
            {
                Code = y.Code,
                FeatureId = y.FeatureId.ToString(),
                Description = y.Description,
                Id = y.Id.ToString(),
                Name = y.Name

            })
                .OrderBy(S => S.Name)
                .ToListAsync();
        }
    }
}
