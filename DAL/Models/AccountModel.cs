using System;
using System.Collections.Generic;

namespace DAL.Models
{
    public class AccountDto
    {
        public AccountTableDto Account { get; set; }
        public IEnumerable<ContactsDto> Contacts { get; set; }
    }

    public class AccountTableLog : BaseEntity
    {
        public Company Company { get; set; }
        public virtual Guid? CompanyId { get; set; }
        public string Description { get; set; }
        public DateTime Time { get; set; }
        public AccountTable Account { get; set; }
        public Guid AccountId { get; set; }
    }

    public class ContactsTableLog : BaseEntity
    {
        public Company Company { get; set; }
        public virtual Guid? CompanyId { get; set; }
        public string Description { get; set; }
        public DateTime Time { get; set; }
        public ContactsMasterTable Contact { get; set; }
        public Guid ContactId { get; set; }
    }

    public class AccountTable : BaseEntity
    {
        public virtual Company Company { get; set; }
        public Guid? CompanyID { get; set; }
        public string AccountType { get; set; }
        public string ActivityStatus { get; set; }
        public string AccountName { get; set; }
        public string CompanyEmailID { get; set; }
        public string CompanyPhoneNo { get; set; }
        public string CompanyWebsite { get; set; }
        public string OfficeAddress { get; set; }
        public string serviceCity { get; set; }
        public string serviceState { get; set; }
        public string serviceCountry { get; set; }
        public string? billingCity { get; set; }
        public string billingCountry { get; set; }
        public string billingState { get; set; }
        public string ZipCodeID { get; set; }
        public string ServiceAddress { get; set; }
        public string ServiceAddressZipcodeId { get; set; }
        public string LatitudeOffice { get; set; }
        public string LongitudeOffice { get; set; }
        public string LatitudeService { get; set; }
        public string LongitudeService { get; set; }

        public List<ContactsMasterTable> Contacts { get; set; }
    }

    public class AccountTableDto : BaseEntity
    {
        public string Company_Name { get; set; }
        public Guid? CompanyID { get; set; }
        public string Account_Type { get; set; }
        public string AccountType { get; set; }
        public string ActivityStatus { get; set; }
        public string AccountName { get; set; }
        public string CompanyEmailID { get; set; }
        public string CompanyPhoneNo { get; set; }
        public string serviceCity { get; set; }
        public string serviceState { get; set; }
        public string serviceCountry { get; set; }
        public string billingCity { get; set; }
        public string billingCountry { get; set; }
        public string billingState { get; set; }
        public string OfficeAddress { get; set; }
        public string ZipCodeID { get; set; }
        public string ServiceAddress { get; set; }
        public string ServiceAddressZipcodeId { get; set; }
        public string LatitudeOffice { get; set; }
        public string LongitudeOffice { get; set; }
        public string LatitudeService { get; set; }
        public string LongitudeService { get; set; }
        //public List<SiteTable> SiteTable { get; set; }
    }

    public class ActivityStatusTable : BaseEntity
    {
        public string ActivityStatus { get; set; }
    }

    public class ContactsMasterTable : BaseEntity
    {
        public virtual Company Company { get; set; }
        public Guid? CompanyID { get; set; }
        public AccountTable Account { get; set; }
        public Guid AccountId { get; set; }
        public string ActivityStatus { get; set; }
        public string ContactName { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
        public string EmailID { get; set; }
        public string MobileNumber { get; set; }
        public string AlternateMobileNumber { get; set; }
        public DateTime Birthday { get; set; }
        public string Notes { get; set; }
        public bool AllowCustomerPortal { get; set; }
    }

    public class ContactsDto
    {
        public Guid Id { get; set; }
        public Guid? CompanyID { get; set; }
        public string Company_name { get; set; }
        public Guid AccountId { get; set; }
        public string Account_Name { get; set; }
        public string ActivityStatus { get; set; }
        public string ContactName { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
        public string EmailID { get; set; }
        public string MobileNumber { get; set; }
        public string AlternateMobileNumber { get; set; }
        public DateTime Birthday { get; set; }
        public string Notes { get; set; } = "";
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
