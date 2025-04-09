using System.Collections.Generic;
using System;

namespace DAL.Models
{
    public class InvoiceCreateReq
    {
        public string? CompanyName { get; set; }
        public string? CompanyAddress { get; set; }
        public decimal BalanceDue { get; set; }
        public Customer1 SelectedCustomer { get; set; }
        public string Terms { get; set; }
        public DateTime InvoiceDate { get; set; }
        public DateTime DueDate { get; set; }
        public string? Tags { get; set; }
        public string? CustomerNote { get; set; }
        public string? PaymentInstructions { get; set; }
        public string? InternalNote { get; set; }
        public string? StatementMemo { get; set; }
        public List<InvoiceItem> Items { get; set; }
        public decimal SelectedTaxRate { get; set; }
        public decimal Subtotal { get; set; }
        public decimal TaxableSubtotal { get; set; }
        public decimal SalesTax { get; set; }
        public decimal InvoiceTotal { get; set; }
        public Dictionary<string, string>? Attachments { get; set; }
    }

    public class Customer1
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public decimal UnbilledCharges { get; set; }
    }

    public class InvoiceItem
    {
        public Guid Product { get; set; }
        public string Description { get; set; }
        public int Qty { get; set; }
        public decimal Rate { get; set; }
        public bool Tax { get; set; }
    }

    public class InvoiceListItem
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string No { get; set; }
        public string Customer { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; }
    }
}
