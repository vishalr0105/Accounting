using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class Company : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Required]
        public string CompanyName { get; set; }
        public Guid? BusinessTypeId { get; set; }
        public Guid? IndustryTypeId { get; set; }
        public string PhoneNumber { get; set; }
        public string WebsiteUrl { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string MailingAddress { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string mailingCity { get; set; }
        public string mailingZipcode { get; set; }
        public string MailingState { get; set; }
        public string ZipCode { get; set; }
        public Guid? CountryId { get; set; }
        public string? MailingCountryId { get; set; }
        public string LegalInformation { get; set; }
        public string Image { get; set; }
        public int? NumberOfEmployees { get; set; }
        public int? NumberofFieldTechnicians { get; set; }
        public Guid? SubScriptionPlanId { get; set; }
        public bool IsActive { get; set; } = true;
        public Guid? PaymentId { get; set; }
        public Guid? TaxeId { get; set; }
        public bool? MobileAppPin { get; set; }
        public bool? AssetManagmentFeature { get; set; }
        public bool? IsReport { get; set; }
        public bool? Invoices_Receipts { get; set; }
        public bool? IsEmails { get; set; }
        public bool? CustomisableAssetRegister { get; set; }
        public string? TaxRegistrationNumber { get; set; }
        public List<ApplicationUser> ApplicationUsers { get; set; }
        public string Currency { get; set; }
        public string? CountryName { get; set; }
        public string? StripeAccount { get; set; }
        public string? PaypalAccount { get; set; }
    }
}
