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
        ICustomer360 Customer360 { get; }
        ICategoryRepository Category { get; }
        INewRoleRepository NewRole { get; }
        ICompanyReposirory Company { get; }
        ITeamMemberRepository TeamMember { get; }
        ITeamRepository Team { get; }
        ITeamAndTeamMembersRepository TeamAndTeamMembers { get; }
        IContactRepository Contact { get; }
        IDashboardRepository Dashboard { get; }
        IInvoiceRepository Invoices { get; }
        IVendorRepository vendorRepository { get; }
        INotificationSettingRepository NotificationSettingRepository { get; }
        INotificationTypeRepository NotificationTypeRepository { get; }
        IMasterUserRepository MasterUsers { get; }
        ITenantRepository TenantsRepository { get; }
        IIndustryTypesRepository IndustryType { get; }
        IJobTitleRepository JobTitle { get; }
        IUserPwdHistoryRepository UserPwdHistoryRepository { get; }
        int SaveChanges();

        Task<int> SaveChangesAsync();
    }
} 
