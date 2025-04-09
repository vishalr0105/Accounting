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
        IGeneralLedgerHeaderRepository _generalLedgerHeaderRepository;
        IGeneralLedgerLineRepository _generalLedgerLineRepository;
        IGeneralLedgerSettingRepository _generalLedgerSettingRepository;
        ISalesInvoiceHeaderRepository _salesInvoiceHeaderRepository;
        ISalesInvoiceLineRepository _salesInvoiceLineRepository;
        ISalesOrderHeaderRepository _salesOrderHeaderRepository;
        ISalesOrderLineRepository _salesOrderLineRepository;
        ISalesQuoteHeaderRepository _salesQuoteHeaderRepository;
        ISalesQuoteLineRepository _salesQuoteLineRepository;
        ISalesReceiptHeaderRepository _salesReceiptHeaderRepository;
        ISalesReceiptLineRepository _salesReceiptLineRepository;
        ITaxRepository _taxRepository;
        ITaxGroupRepository _taxGroupRepository;
        IPaymentTermRepository _paymentTermRepository;

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

        public IGeneralLedgerHeaderRepository GeneralLedgerHeaderRepository
        {
            get
            {
                _generalLedgerHeaderRepository ??= new GeneralLedgerHeaderRepository(_context);
                return _generalLedgerHeaderRepository;
            }
        }

        public IGeneralLedgerLineRepository GeneralLedgerLineRepository
        {
            get
            {
                _generalLedgerLineRepository ??= new GeneralLedgerLineRepository(_context);
                return _generalLedgerLineRepository;
            }
        }

        public IGeneralLedgerSettingRepository GeneralLedgerSettingRepository
        {
            get
            {
                _generalLedgerSettingRepository ??= new GeneralLedgerSettingRepository(_context);
                return _generalLedgerSettingRepository;
            }
        }

        public ISalesInvoiceHeaderRepository SalesInvoiceHeaderRepository
        {
            get
            {
                _salesInvoiceHeaderRepository ??= new SalesInvoiceHeaderRepository(_context);
                return _salesInvoiceHeaderRepository;
            }
        }

        public ISalesInvoiceLineRepository SalesInvoiceLineRepository
        {
            get
            {
                _salesInvoiceLineRepository ??= new SalesInvoiceLineRepository(_context);
                return _salesInvoiceLineRepository;
            }
        }

        public ISalesOrderHeaderRepository SalesOrderHeaderRepository
        {
            get
            {
                _salesOrderHeaderRepository ??= new SalesOrderHeaderRepository(_context);
                return _salesOrderHeaderRepository;
            }
        }

        public ISalesOrderLineRepository SalesOrderLineRepository
        {
            get
            {
                _salesOrderLineRepository ??= new SalesOrderLineRepository(_context);
                return _salesOrderLineRepository;
            }
        }

        public ISalesQuoteHeaderRepository SalesQuoteHeaderRepository
        {
            get
            {
                _salesQuoteHeaderRepository ??= new SalesQuoteHeaderRepository(_context);
                return _salesQuoteHeaderRepository;
            }
        }

        public ISalesQuoteLineRepository SalesQuoteLineRepository
        {
            get
            {
                _salesQuoteLineRepository ??= new SalesQuoteLineRepository(_context);
                return _salesQuoteLineRepository;
            }
        }

        public ISalesReceiptHeaderRepository SalesReceiptHeaderRepository
        {
            get
            {
                _salesReceiptHeaderRepository ??= new SalesReceiptHeaderRepository(_context);
                return _salesReceiptHeaderRepository;
            }
        }

        public ISalesReceiptLineRepository SalesReceiptLineRepository
        {
            get
            {
                _salesReceiptLineRepository ??= new SalesReceiptLineRepository(_context);
                return _salesReceiptLineRepository;
            }
        }

        public ITaxRepository TaxRepository
        {
            get
            {
                _taxRepository ??= new TaxRepository(_context);
                return _taxRepository;
            }
        }

        public ITaxGroupRepository TaxGroupGroupRepository
        {
            get
            {
                _taxGroupRepository ??= new TaxGroupRepository(_context);
                return _taxGroupRepository;
            }
        }

        public IPaymentTermRepository PaymentTermRepository
        {
            get
            {
                _paymentTermRepository ??= new PaymentTermRepository(_context);
                return _paymentTermRepository;
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
