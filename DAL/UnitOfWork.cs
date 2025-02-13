// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

using DAL.Models;
using System.Threading.Tasks;
using DAL.Repositories.Interfaces;
using DAL.DTOS;
namespace DAL.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        readonly ApplicationDbContext _context;
        IUserRepository _user;
        ICustomer360 _customer360;
        ICategoryRepository _category;
        INewRoleRepository _newRole;
        ICompanyReposirory _company;
        ITeamMemberRepository _teamMember;
        ITeamRepository _team;
        ITeamAndTeamMembersRepository _TeamAndTeamMembers;
        IContactRepository _contact;
        IInvoiceRepository _invoiceRepository;
        IDashboardRepository _dashboardRepository;
        IVendorRepository _VendorRepository;
        IMasterUserRepository _masterUsers;
        ITenantRepository _tenants;
        IIndustryTypesRepository _industryType;
        IJobTitleRepository _jobTitle;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }


        public IUserRepository User
        {
            get
            {
                if (_user == null)
                    _user = new UserRepository(_context);
                return _user;
            }
        }

        public ICategoryRepository Category
        {
            get
            {
                if (_category == null)
                    _category = new CategoryRepository(_context);

                return _category;
            }
        }

        public INewRoleRepository NewRole
        {
            get
            {
                if (_newRole == null)
                    _newRole = new NewRoleRepository(_context);
                return _newRole;
            }
        }

        public ICompanyReposirory Company
        {
            get
            {
                if (_company == null)
                    _company = new CompanyReposirory(_context);

                return _company;
            }
        }

        public ITeamMemberRepository TeamMember
        {
            get
            {
                if (_teamMember == null)
                    _teamMember = new TeamMemberRepository(_context);

                return _teamMember;
            }
        }

        public IInvoiceRepository Invoices
        {
            get
            {
                if (_invoiceRepository == null)
                    _invoiceRepository = new InvoiceRepository(_context);

                return _invoiceRepository;
            }
        }

        public ITeamRepository Team
        {
            get
            {
                if (_team == null)
                    _team = new TeamRepository(_context);

                return _team;
            }
        }

        public ITeamAndTeamMembersRepository TeamAndTeamMembers
        {
            get
            {
                if (_TeamAndTeamMembers == null)
                    _TeamAndTeamMembers = new TeamAndTeamMembersRepository(_context);

                return _TeamAndTeamMembers;
            }
        }

        public IContactRepository Contact
        {
            get
            {
                if (_contact == null)
                    _contact = new ContactRepository(_context);

                return _contact;
            }
        }
       
        public IDashboardRepository Dashboard
        {
            get
            {
                _dashboardRepository ??= new DashboardRepository(_context);

                return _dashboardRepository;
            }
        }
       
        public ICustomer360 Customer360
        {
            get
            {
                _customer360 ??= new Customer360(_context);
                return _customer360;
            }
        }


        public IVendorRepository vendorRepository
        {
            get
            {
                _VendorRepository ??= new VendorRepository(_context);
                return _VendorRepository;
            }
        }
                 
        public INotificationSettingRepository NotificationSettingRepository => new NotificationSettingRepository(_context);

        public INotificationTypeRepository NotificationTypeRepository => new NotificationTypeRepository(_context);

        public IMasterUserRepository MasterUsers
        {
            get
            {
                _masterUsers ??= new MasterUserRepository(_context);
                return _masterUsers;
            }
        }


        public IIndustryTypesRepository IndustryType
        {
            get
            {
                _industryType ??= new IndustryTypesRepository(_context);
                return _industryType;
            }
        }

        public IJobTitleRepository JobTitle
        {
            get
            {
                _jobTitle ??= new JobTitleRepository(_context);
                return _jobTitle;
            }
        }

        public ITenantRepository TenantsRepository
        {
            get
            {
                _tenants ??= new TenantRepository(_context);
                return _tenants;
            }
        }

        public IUserPwdHistoryRepository UserPwdHistoryRepository => new UserPwdHistoryRepository(_context);

        public int SaveChanges()
        {
            return _context.SaveChanges();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
