using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DAL.Repositories.Interfaces;
using DAL.Models.TempModels;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;

namespace DAL.Repositories
{
    public class CompanyReposirory : Repository<Company>, ICompanyReposirory
    {
        public CompanyReposirory(DbContext context) : base(context)
        { }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

        public async Task<Guid> AddCompany(Company company, string password)
        {
            using (var context = _appContext)
            {
                using (var tr = context.Database.BeginTransaction())
                {
                    try
                    {
                        company.CreatedAt = DateTime.UtcNow;
                        if (company.Image != null)
                        {
                            company.Image = SaveBase64Image(company.Image);
                        }
                        company.Image = "Uploads/Profileimage/638639985781449698.png";
                        
                        await _appContext.Company.AddAsync(company);
                        //AddDefaultRoles(company.Id);
                        UserMaster userMaster = new UserMaster()
                        {
                            UserName = company.Email,
                            Status = true,
                            CompanyId = company.Id,
                            EmailID = company.Email,
                            Password = password,
                            FullName = company.FirstName + " " + company.LastName,
                            CreatedAt = DateTime.UtcNow,
                            UpdatedAt = DateTime.UtcNow,
                            UserType = "Admin",
                            UserImage= company.Image,
                        };
                        _appContext.UserMaster.Add(userMaster);

                        var moduleData = _appContext.Modules.Where(x=>!x.IsDeleted).ToList();

                        var companySidebarEntries = new List<CompanySidebar>();

                        foreach (var module in moduleData)
                        {
                            CompanySidebar data = new CompanySidebar()
                            {
                                ModuleId = module.Id,
                                CompanyId = company.Id, 
                                UserType = module.UserType,
                                Name = module.Name,
                                Description = module.Description,
                                IsDeleted = module.IsDeleted,
                                Code = module.Code,
                                TenantId = module.TenantId,
                                CreatedAt = DateTime.UtcNow,
                                UpdatedAt = DateTime.UtcNow,
                                SortOrder = module.SortOrder,
                                RollId = module.RollId,
                                Icon = module.Icon
                            };

                            companySidebarEntries.Add(data); 
                        }

                        await _appContext.CompanySidebar.AddRangeAsync(companySidebarEntries);
                        await _appContext.SaveChangesAsync(); 
                        var notificationtypes = _appContext.NotificationTypes.ToList();
                        var notificationsetting = new List<NotificationSetting>();
                        int maxNSettingId = _appContext.NotificationSettings.OrderByDescending(x => x.NSettingId).FirstOrDefault().NSettingId;
                        foreach (var item in notificationtypes)
                        {
                            maxNSettingId += 1;
                            notificationsetting.Add(new NotificationSetting{
                                    CompanyId = company.Id.ToString(),
                                    N_TypeId = item.N_TypeId,
                                    NSettingId= maxNSettingId,
                                    Subscribed = true,
                                });
                        }
                        _appContext.NotificationSettings.AddRange(notificationsetting);
                        tr.Commit();
                        context.SaveChanges();

                        //var adminroleid = _appContext.TeamRoles
                        //    .Where(t => t.CompanyId == company.Id
                        //    && t.Name == "Admin"
                        //    ).FirstOrDefault();
                        //userMaster.RollId = adminroleid.Id;
                        _appContext.Update(userMaster);
                        _appContext.SaveChanges();
                    }
                    catch (Exception ex)
                    {
                        tr.Rollback();
                        throw ex;
                    }
                }
            }
            return company.Id;
        }

        public class FileUploadInputModel
        {
            public string ContentURL { get; set; } = string.Empty;
            public string FileName { get; set; } = string.Empty;
            public string SaveTo { get; set; } = string.Empty;
        }
        public class FileUploadErrorMessages
        {
            public static string InvalidInput { get; set; } = "Invalid Input";
            public static string InvalidContentURL { get; set; } = "Invalid Content URL";
            public static string InvalidMEMEType { get; set; } = "Invalid MEMEType";
            public static string InvalidPath { get; set; } = "Invalid path to store downloaded data";
        }

        public async Task<Company> GetCompany(Guid id)
        {
            return await _appContext.Company.FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<bool> CompanyExist(string companyName)
        {
            return await _appContext.Company.AnyAsync(c => c.CompanyName.ToLower() == companyName.ToLower());
        }

        public void UpdateCompany(Company company)
        {
            if (!string.IsNullOrEmpty(company.Image) && !company.Image.Contains("Uploads"))
            {
                // Validate Base64 string
                if (IsBase64String(company.Image))
                {
                    company.Image = Base64ToImage(new FileUploadInputModel
                    {
                        ContentURL = company.Image ?? "",
                        FileName = DateTime.UtcNow.Ticks.ToString() + ".png",
                        SaveTo = "Uploads/CompanyImage"
                    });
                }
                else
                {
                    throw new ArgumentException("The provided image data is not a valid Base64 string.");
                }
            }

            _appContext.Entry(company).State = EntityState.Modified;
            _appContext.Update(company);
        }

        private bool IsBase64String(string base64String)
        {
            if (string.IsNullOrEmpty(base64String))
                return false;

            // Remove potential data URL prefixes
            base64String = base64String
                .Replace("data:image/png;base64,", "")
                .Replace("data:image/jpeg;base64,", "")
                .Replace("data:image/gif;base64,", "");

            // Check if the length is valid and contains only Base64 characters
            bool isBase64 = (base64String.Length % 4 == 0) && Regex.IsMatch(base64String, @"^[a-zA-Z0-9\+/=]*$");
            if (!isBase64)
            {
               // Log.Warning("String is not a valid Base64: Length - " + base64String.Length + " | String: " + base64String);
            }
            return isBase64;
        }

        private string Base64ToImage(FileUploadInputModel inputModel)
        {
            try
            {
                // Clean up and log the input Base64 string
                string cleanedBase64 = inputModel.ContentURL
                    .Replace("data:image/png;base64,", "")
                    .Replace("data:image/jpeg;base64,", "")
                    .Replace("data:image/gif;base64,", "");

               // Log.Information("Base64 String Length: " + cleanedBase64.Length);

                byte[] imageBytes = Convert.FromBase64String(cleanedBase64);

                string filePath = Path.Combine(inputModel.SaveTo, inputModel.FileName);
                File.WriteAllBytes(filePath, imageBytes);

                return filePath;
            }
            catch (FormatException ex)
            {
               // Log.Error("Invalid Base64 string: " + ex.Message + " for string: " + inputModel.ContentURL);
                throw new ArgumentException("Invalid Base64 string.", ex);
            }
        }

        [NonAction]
        public string SaveBase64Image(string base64string)
        {
            string filename = DateTime.Now.Ticks.ToString() + ".png";
            string filePath = Path.Combine(Environment.CurrentDirectory, "Uploads", "Profileimage", filename);
            byte[] byteArray = Convert.FromBase64String(base64string.Split(",")[1]);
            System.IO.File.WriteAllBytes(filePath, byteArray);
            return "Uploads/Profileimage/" + filename;
        }

        public void Delete(Guid Id)
        {
            var company = _appContext.Company.FirstOrDefault(x => x.Id == Id);
            _appContext.Company.Remove(company);
        }
    }
}
