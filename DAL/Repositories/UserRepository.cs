using DAL.DTOS;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DAL.Repositories.CompanyReposirory;

using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace DAL.Repositories
{
    public class UserRepository : Repository<UserMaster>, IUserRepository
    {
        public UserRepository(DbContext context) : base(context)
        { }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

        public async Task<Guid> AddUser(UserMaster args)
        {
            args.CreatedAt = DateTime.UtcNow;
            await _appContext.UserMaster.AddAsync(args);
            return args.Id;
        }

        public string Base64ToImage(FileUploadInputModel Input)
        {
            var ValidFileInput = ValidInput(Input);
            if (!string.IsNullOrWhiteSpace(ValidFileInput))
                return ValidFileInput;

            CreateDirectory(Input.SaveTo);

            var Image = Convert.FromBase64String(Input.ContentURL);
            string path = GetSuggestedDirectory(Input.SaveTo, Input.FileName);

            if (Image.Length > 0)
            {
                try
                {
                    System.IO.File.WriteAllBytes(path, Image);
                }
                catch (Exception e)
                {
                    e.ToString();
                }
            }

            return GetFileName(Input.SaveTo, Input.FileName);
        }

        public string ValidInput(FileUploadInputModel Input)
        {
            if (Input == null)
                return FileUploadErrorMessages.InvalidInput;
            if (string.IsNullOrWhiteSpace(Input.ContentURL))
                return FileUploadErrorMessages.InvalidContentURL;
            if (string.IsNullOrWhiteSpace(Input.FileName))
                return FileUploadErrorMessages.InvalidMEMEType;
            if (string.IsNullOrWhiteSpace(Input.SaveTo))
                return FileUploadErrorMessages.InvalidPath;
            return string.Empty;
        }

        public void CreateDirectory(string SaveTo)
        {
            if (!Directory.Exists(SaveTo))
            {
                Directory.CreateDirectory(SaveTo);
            }
        }

        public string GetSuggestedDirectory(string SaveTo, string AccessFile)
        {
            return Path.Combine(Directory.GetCurrentDirectory(), SaveTo, AccessFile);
        }

        public string GetFileName(string SaveTo, string FileName)
        {
            return SaveTo + "/" + FileName;
        }

        public void Profileupdate(UserMaster userMaster)
        {
            _appContext.Entry(userMaster).State = EntityState.Modified;
            _appContext.Update(userMaster);
        }

        public void newsavepasswords(UserMaster userMaster)
        {
            _appContext.Entry(userMaster).State = EntityState.Modified;
            _appContext.Update(userMaster);
        }

        public void SaveProfilecheck(UserMaster userMaster)
        {
            _appContext.Entry(userMaster).State = EntityState.Modified;
            _appContext.Update(userMaster);
        }

        public async Task UpdateUser(UserMaster userMaster)
        {
            userMaster.UpdatedAt = DateTime.Now;
            _appContext.Entry(userMaster).State = EntityState.Modified;
            _appContext.Update(userMaster);
        }

        public void UpdateUserPassword(UserMaster userMaster)
        {
            _appContext.Entry(userMaster).State = EntityState.Modified;
            _appContext.Update(userMaster);
        }

        public async Task<MasterUser> GetUserByEmail(string email)
        {
            return await _appContext.masterusers
                                    .AsNoTracking()
                                    .FirstOrDefaultAsync(w => w.Email == email);
        }

        public async Task<UserMaster> CheckPassword(Guid Id, string password)
        {
            return await _appContext.UserMaster
                                    .AsNoTracking()
                                    .FirstOrDefaultAsync(w => w.Id == Id && w.Password == password);
        }

        public async Task<UserMaster> GetUserById(Guid id)
        {
            return await _appContext.UserMaster
                                    .AsNoTracking()
                                    .FirstOrDefaultAsync(w => w.Id == id);
        }

        public async Task DeleteUser(Guid id)
        {
            UserMaster teamMember = await _appContext.UserMaster.FirstOrDefaultAsync(t => t.Id == id);
            if (teamMember != null)
            {
                _appContext.UserMaster.Remove(teamMember);
            }
        }

        public async Task<MasterUser> GetMasterUserByEmail(string Email)
        {
            try
            {
                return await _appContext.masterusers
                                       .AsNoTracking()
                                       .FirstOrDefaultAsync(w => w.Email == Email);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
