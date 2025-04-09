using System;
using System.Collections.Generic;

namespace DAL.Models
{
    public class SalesOrderCreateReq
    {
        public OrderInfo OrderInfo { get; set; }
        public CustomerInfo CustomerInfo { get; set; }
        public List<Item> Items { get; set; }
        public Notes Notes { get; set; }
        public Summary Summary { get; set; }
    }

    public class OrderInfo
    {
        public DateTime OrderDate { get; set; }
        public string OrderNumber { get; set; }
    }

    // Customer information
    public class CustomerInfo
    {
        public string Customer { get; set; }
        public string ContactInfo { get; set; }
        public string BillTo { get; set; }
        public string ShipTo { get; set; }
    }

    // Customer details
    //public class Customer2
    //{
    //    public Guid Id { get; set; }
    //    public string Name { get; set; }
    //    public string Email { get; set; }
    //    public decimal UnbilledCharges { get; set; }
    //    public string PhoneNumber { get; set; }
    //    public Address1 BillingAddress { get; set; }
    //}

    // Address details
    public class Address1
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Line1 { get; set; }
        public string Line2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
    }

    // Item details in the order
    public class Item
    {
        public Guid Product { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public decimal Rate { get; set; }
        public decimal Amount { get; set; }
        public bool Taxable { get; set; }
    }

    // Notes (customer and internal)
    public class Notes
    {
        public string CustomerNotes { get; set; }
        public string InternalNotes { get; set; }
    }

    // Summary (subtotal, tax, total)
    public class Summary
    {
        public decimal Subtotal { get; set; }
        public decimal TaxRate { get; set; }
        public decimal Tax { get; set; }
        public decimal Total { get; set; }
    }
}
