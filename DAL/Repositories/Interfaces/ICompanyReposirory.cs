using DAL.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface ICompanyReposirory:IRepository<Company>
    {
        public Task<Guid> AddCompany(Company company,string password);
        public Task<bool> CompanyExist(string companyName);
        public void UpdateCompany(Company company);
        public void Delete(Guid Id);
        public Task<Company> GetCompany(Guid id);
    }
}
