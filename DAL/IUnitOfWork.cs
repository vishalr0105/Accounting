// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

using DAL.Models;
//using EtapriseWFM;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository User { get; }
        INewRoleRepository NewRole { get; }
        ICompanyReposirory Company { get; }
        IContactRepository Contact { get; }
        IDashboardRepository Dashboard { get; }
        IInvoiceRepository Invoices { get; }
        IVendorRepository vendorRepository { get; }
        IMasterUserRepository MasterUsers { get; }
        ITenantRepository TenantsRepository { get; }
        IIndustryTypesRepository IndustryType { get; }
        IJobTitleRepository JobTitle { get; }
        IUserPwdHistoryRepository UserPwdHistoryRepository { get; }
        ICustomerRepository CustomerRepository { get; }
        IProductAndServiceRepository ProductAndServiceRepository { get; }
        int SaveChanges();

        Task<int> SaveChangesAsync();
    }
} 
