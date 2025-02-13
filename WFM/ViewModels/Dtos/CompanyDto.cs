using DAL.Models;
using System.ComponentModel.DataAnnotations;

namespace WFM.ViewModels.Dtos
{
    public class CompanyDto
    {
        public Guid Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        [Required]
        public string CompanyName { get; set; }
        public Guid? IndustryTypeId { get; set; }
        public string? PhoneNumber { get; set; }
        public string? CustomisableAssetRegister { get; set; }
        public string? WebsiteUrl { get; set; }
        public string? Departments { get; set; }
        public string Email { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? TaxRegistrationNumber { get; set; }
        public string? ZipCode { get; set; }
        public string? mailingState { get; set; }
        public string? mailingCity { get; set; }
        public string? mailingZipcode { get; set; }
        public string? mailingAddress { get; set; }
        public Guid? CountryId { get; set; }
        public Guid? mailingCountryId { get; set; }
        public string? Image { get; set; }
        public int? NumberofFieldTechnicians { get; set; }
        public int? NumberofEmployees { get; set; }
        public Guid? SubScriptionPlanId { get; set; }
        public Guid? PaymentId { get; set; }
        public Guid? TaxeId { get; set; }
        public bool? MobileAppPin { get; set; }
        public bool? AssetManagmentFeature { get; set; }
        public bool  IsActive { get; set; }
        public string? Currency { get; set; }
        public string? OtherIndustryType { get; set; }
        public bool? IsReport { get; set; }
        public bool? Invoices_Receipts { get; set; }
        public bool? IsEmails { get; set; }
        public string? CountryName { get; set; }
        public DateTime? CreatedAt { get; set; }
        //public List<BankAccount> bankAccount { get; set; } = new List<BankAccount>();
    }


    public class AllCompanyDto
    {
        public Guid Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string CompanyName { get; set; }
        public string? PhoneNumber { get; set; }
        public string Email { get; set; }
        public string SubscriptionPlan { get; set; }
        public int? Quantity { get; set; }
        public decimal? Amount { get; set; }
        public string StartDate { get; set; }
        public string RenewalDate { get; set; }
    }
}
