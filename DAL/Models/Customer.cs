using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    [Table("customer", Schema = "public")]
    public class Customer
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; }

        [Column("no")]
        public string? No { get; set; }

        [Column("title")]
        public string? Title { get; set; }

        [Column("firstname")]
        public string? FirstName { get; set; }

        [Column("middlename")]
        public string? MiddleName { get; set; }

        [Column("lastname")]
        public string? LastName { get; set; }

        [Column("email")]
        public string? Email { get; set; }

        [Column("autocollection")]
        public string? AutoCollection { get; set; }

        [Column("nettermdays")]
        public string? NetTermDays { get; set; }

        [Column("allowdirectdebit")]
        public bool? AllowDirectDebit { get; set; }

        [Column("createdfromip")]
        public string? CreatedFromIp { get; set; }

        [Column("taxability")]
        public string? Taxability { get; set; }

        [Column("piicleared")]
        public string? PiiCleared { get; set; }

        [Column("channel")]
        public string? Channel { get; set; }

        [Column("resourceversion")]
        public long? ResourceVersion { get; set; }

        [Column("deleted")]
        public bool? Deleted { get; set; }

        [Column("objecttype")]
        public string? ObjectType { get; set; }

        [Column("billingaddressfirstname")]
        public string? BillingAddressFirstName { get; set; }

        [Column("billingaddresslastname")]
        public string? BillingAddressLastName { get; set; }

        [Column("billingaddressline1")]
        public string? BillingAddressLine1 { get; set; }

        [Column("billingaddressline2")]
        public string? BillingAddressLine2 { get; set; }

        [Column("billingaddresscity")]
        public string? BillingAddressCity { get; set; }

        [Column("billingaddressstatecode")]
        public string? BillingAddressStateCode { get; set; }

        [Column("billingaddresszipcode")]
        public string? BillingAddressZipCode { get; set; }

        [Column("billingaddressstate")]
        public string? BillingAddressState { get; set; }

        [Column("billingaddresscountry")]
        public string? BillingAddressCountry { get; set; }

        [Column("shippingaddressfirstname")]
        public string? ShippingAddressFirstName { get; set; }

        [Column("shippingaddresslastname")]
        public string? ShippingAddressLastName { get; set; }

        [Column("shippingaddressline1")]
        public string? ShippingAddressLine1 { get; set; }

        [Column("shippingaddressline2")]
        public string? ShippingAddressLine2 { get; set; }

        [Column("shippingaddresscity")]
        public string? ShippingAddressCity { get; set; }

        [Column("shippingaddressstatecode")]
        public string? ShippingAddressStateCode { get; set; }

        [Column("shippingaddressstate")]
        public string? ShippingAddressState { get; set; }

        [Column("shippingaddresscountry")]
        public string? ShippingAddressCountry { get; set; }

        [Column("shippingaddresszipcode")]
        public string? ShippingAddressZipCode { get; set; }

        [Column("issubcustomer")]
        public bool? IsSubCustomer { get; set; }

        [Column("notesandattachments")]
        public string? NotesAndAttachments { get; set; }


        [Column("istaxexempt")]
        public bool? IsTaxExempt { get; set; }

        [Column("reasonforexemption")]
        public string? ReasonForExemption { get; set; }

        [Column("openingbalance")]
        public string? OpeningBalance { get; set; }

        [Column("parentcustomer")]
        public Guid? ParentCustomer { get; set; }

        [Column("cardstatus")]
        public string? CardStatus { get; set; }

        [Column("promotionalcredits")]
        public int? PromotionalCredits { get; set; }

        [Column("refundablecredits")]
        public int? RefundableCredits { get; set; }

        [Column("excesspayments")]
        public int? ExcessPayments { get; set; }

        [Column("unbilledcharges")]
        public int? UnbilledCharges { get; set; }

        [Column("preferredcurrencycode")]
        public string? PreferredCurrencyCode { get; set; }

        [Column("mrr")]
        public decimal? MRR { get; set; }

        [Column("primarypaymentsourceid")]
        public string? PrimaryPaymentSourceId { get; set; }

        [Column("paymentmethodobjecttype")]
        public string? PaymentMethodObjectType { get; set; }

        [Column("phonenumber")]
        public string? PhoneNumber { get; set; }

        [Column("partyid")]
        public Guid? PartyId { get; set; }

        [Column("primarycontactid")]
        public Guid? PrimaryContactId { get; set; }

        [Column("taxgroupid")]
        public Guid? TaxGroupId { get; set; }

        [Column("accountsreceivableaccountid")]
        public Guid? AccountsReceivableAccountId { get; set; }

        [Column("salesaccountid")]
        public Guid? SalesAccountId { get; set; }

        [Column("salesdiscountaccountid")]
        public Guid? SalesDiscountAccountId { get; set; }

        [Column("promptpaymentdiscountaccountid")]
        public Guid? PromptPaymentDiscountAccountId { get; set; }

        [Column("paymenttermid")]
        public Guid? PaymentTermId { get; set; }

        [Column("customeradvancesaccountid")]
        public Guid? CustomerAdvancesAccountId { get; set; }

        [Column("tenantid")]
        public Guid? TenantId { get; set; }

        [Column("createdby")]
        public string? CreatedBy { get; set; }

        [Column("updatedby")]
        public string? UpdatedBy { get; set; }

        [Column("createdat")]
        public string? CreatedAt { get; set; }

        [Column("updatedat")]
        public string? UpdatedAt { get; set; }
    }

    public class CustomerListItem
    {
        public Guid Id { get; set; }
        public string? No { get; set; }
        public string? Title { get; set; }
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? BillingAddressFirstName { get; set; }
        public string? BillingAddressLastName { get; set; }
        public string? BillingAddressLine1 { get; set; }
        public string? BillingAddressLine2 { get; set; }
        public string? BillingAddressCity { get; set; }
        public string? BillingAddressStateCode { get; set; }
        public string? BillingAddressZipCode { get; set; }
        public string? BillingAddressState { get; set; }
        public string? BillingAddressCountry { get; set; }
        public string? ShippingAddressFirstName { get; set; }
        public string? ShippingAddressLastName { get; set; }
        public string? ShippingAddressLine1 { get; set; }
        public string? ShippingAddressLine2 { get; set; }
        public string? ShippingAddressCity { get; set; }
        public string? ShippingAddressStateCode { get; set; }
        public string? ShippingAddressState { get; set; }
        public string? ShippingAddressCountry { get; set; }
        public string? ShippingAddressZipCode { get; set; }
    }
}
