using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class CreateCustomerRequest
    {
        public NameAndContact NameAndContact { get; set; }
        public Address Address { get; set; }
        public NotesAttachments NotesAttachments { get; set; }
        public Payments Payments { get; set; }
        public AdditionalInfo AdditionalInfo { get; set; }
    }

    public class NameAndContact
    {
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Suffix { get; set; }
        public string CompanyName { get; set; }
        public string CustomerDisplayName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Cc { get; set; }
        public string Bcc { get; set; }
        public string MobileNumber { get; set; }
        public string Fax { get; set; }
        public string Other { get; set; }
        public string Website { get; set; }
        public string NameOnCheck { get; set; }
        public bool IsSubCustomer { get; set; }
        public string ParentCustomer { get; set; }
        public bool BillParentCustomer { get; set; }
    }

    public class Address
    {
        public string BillingStreet1 { get; set; }
        public string BillingStreet2 { get; set; }
        public string BillingCity { get; set; }
        public string BillingState { get; set; }
        public string BillingZip { get; set; }
        public string BillingCountry { get; set; }
        public bool SameAsBilling { get; set; }
        public string ShippingStreet1 { get; set; }
        public string ShippingStreet2 { get; set; }
        public string ShippingCity { get; set; }
        public string ShippingState { get; set; }
        public string ShippingZip { get; set; }
        public string ShippingCountry { get; set; }
    }

    public class NotesAttachments
    {
        public string Notes { get; set; }
        public object Attachment { get; set; }
    }

    public class Payments
    {
        public string PaymentMethod { get; set; }
        public string Terms { get; set; }
        public string DeliveryOptions { get; set; }
        public string InvoiceLanguage { get; set; }
        public long CreditLimit { get; set; }
    }

    public class AdditionalInfo
    {
        public string CustomerType { get; set; }
        public bool IsTaxExempt { get; set; }
        public string ExemptionReason { get; set; }
        public string ExemptionDetails { get; set; }
        public decimal OpeningBalance { get; set; }
        public DateTime AsOfDate { get; set; }
    }

    public class ApiRequest
    {
        public NameAndContact NameAndContact { get; set; }
        public Address Address { get; set; }
        public NotesAttachments NotesAttachments { get; set; }
        public Payments Payments { get; set; }
        public AdditionalInfo AdditionalInfo { get; set; }
    }
}
