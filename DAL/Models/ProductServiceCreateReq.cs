using System;

namespace DAL.Models
{
    public class ProductServiceCreateReq
    {
        public BasicInfo BasicInfo { get; set; }
        public InventoryInfo? InventoryInfo { get; set; }
        public Sales Sales { get; set; }
        public Purchasing Purchasing { get; set; }
    }

    public class BasicInfo
    {
        public string Name { get; set; }
        public string ItemType { get; set; }
        public string Sku { get; set; }
        public string Category { get; set; }
    }

    public class Sales
    {
        public bool IsSelling { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public string IncomeAccount { get; set; }
        public string SalesTaxCategory { get; set; }
    }

    public class Purchasing
    {
        public bool IsPurchasing { get; set; }
        public string PurchaseDescription { get; set; }
        public string PurchaseCost { get; set; }
        public string ExpenseAccount { get; set; }
        public string PreferredVendor { get; set; }
    }

    public class InventoryInfo
    {
        public string InitialQuantity { get; set; }
        public string Date { get; set; }
        public string ReorderPoint { get; set; }
        public string InventoryAssetAccount { get; set; }
    }
}
