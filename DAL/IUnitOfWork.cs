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
        IGeneralLedgerHeaderRepository GeneralLedgerHeaderRepository { get; }
        IGeneralLedgerLineRepository GeneralLedgerLineRepository { get; }
        IGeneralLedgerSettingRepository GeneralLedgerSettingRepository { get; }
        ISalesInvoiceHeaderRepository SalesInvoiceHeaderRepository { get; }
        ISalesInvoiceLineRepository SalesInvoiceLineRepository { get; }
        ISalesOrderHeaderRepository SalesOrderHeaderRepository { get; }
        ISalesOrderLineRepository SalesOrderLineRepository { get; }
        ISalesQuoteHeaderRepository SalesQuoteHeaderRepository { get; }
        ISalesQuoteLineRepository SalesQuoteLineRepository { get; }
        ISalesReceiptHeaderRepository SalesReceiptHeaderRepository { get; }
        ISalesReceiptLineRepository SalesReceiptLineRepository { get; }
        ITaxRepository TaxRepository { get; }
        ITaxGroupRepository TaxGroupGroupRepository { get; }
        IPaymentTermRepository PaymentTermRepository { get; }
        int SaveChanges();

        Task<int> SaveChangesAsync();
    }
}
