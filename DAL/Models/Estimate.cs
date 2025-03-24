using System;

namespace DAL.Models
{
    public class Estimate: BaseEntity
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
        public decimal Amount { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public int PostalCode { get; set; }
        public InvoiceStatus EstimateStatus { get; set; }
    }
}
