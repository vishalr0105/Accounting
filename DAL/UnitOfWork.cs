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
        INewRoleRepository _newRole;
        ICompanyReposirory _company;
        IContactRepository _contact;
        IInvoiceRepository _invoiceRepository;
        IDashboardRepository _dashboardRepository;
        IVendorRepository _VendorRepository;
        IMasterUserRepository _masterUsers;
        ITenantRepository _tenants;
        IIndustryTypesRepository _industryType;
        IJobTitleRepository _jobTitle;
        ICustomerRepository _customer;
        IProductAndServiceRepository _productServicesRepository;

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

        public IInvoiceRepository Invoices
        {
            get
            {
                if (_invoiceRepository == null)
                    _invoiceRepository = new InvoiceRepository(_context);

                return _invoiceRepository;
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


        public IVendorRepository vendorRepository
        {
            get
            {
                _VendorRepository ??= new VendorRepository(_context);
                return _VendorRepository;
            }
        }
                 

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

        public ICustomerRepository CustomerRepository
        {
            get
            {
                _customer ??= new CustomerRepository(_context);
                return _customer;
            }
        }

        public IProductAndServiceRepository ProductAndServiceRepository
        {
            get
            {
                _productServicesRepository ??= new ProductAndServiceRepository(_context);
                return _productServicesRepository;
            }
        }

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
