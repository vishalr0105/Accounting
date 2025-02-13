using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Invoice : BaseEntity
    {
        public string UserId { get; set; }
        public string SubscriptionId { get; set; }
        public string Notes { get; set; }
        public string CardNumber { get; set; }
        public string CardHolderName { get; set; }
        public string ExpirationDate { get; set; }
        public string CVV { get; set; }
        public DateTime PaymentDate { get; set; }
        public ePaymentMethod PaymentMethod { get; set; }
        public InvoiceStatus InvoiceStatus { get; set; }
        //public string PaypalId{ get; set; }s
        public decimal Amount { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public int PostalCode { get; set; }
    }
    public enum InvoiceStatus
    {
        Draft = 0,
        PendingApproval = 1,
        Approved = 2,
        Rejected = 3,
        Sent = 4,
        PartialPayment = 5,
        Paid = 6,
        Overdue = 7,
        Void = 8,
        Archived = 9,
        Disputed = 10,
        Processing = 11,
        OnHold = 12,
        PendingPayment = 13
    }
    public enum ePaymentMethod
    {
        Nothing = 0,
        Paypal = 1,
        Card = 2,
        Cash = 3,
        Cheque = 4,
        BankTransfer = 5,
        BankRemittence = 6
    }
}
