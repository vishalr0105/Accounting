﻿using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    [Table("productsandservices", Schema = "public")]
    public class ProductAndService
    {
        [Column("id")]
        public Guid Id { get; set; }

        [Column("name")]
        public string Name { get; set; }

        [Column("itemtype")]
        public string ItemType { get; set; }

        [Column("sku")]
        public string Sku { get; set; }

        [Column("category")]
        public string Category { get; set; }

        [Column("salesdescription")]
        public string SalesDescription { get; set; }

        [Column("salesprice")]
        public string SalesPrice { get; set; }

        [Column("incomeaccount")]
        public string IncomeAccount { get; set; }

        [Column("salestaxcategory")]
        public string SalesTaxCategory { get; set; }

        [Column("purchasedescription")]
        public string PurchaseDescription { get; set; }

        [Column("purchasecost")]
        public string PurchaseCost { get; set; }

        [Column("expenseaccount")]
        public string ExpenseAccount { get; set; }

        [Column("preferredvendor")]
        public string PreferredVendor { get; set; }

        [Column("createdat")]
        public string CreatedAt { get; set; }

        [Column("createdby")]
        public string CreatedBy { get; set; }

        [Column("updatedat")]
        public string UpdatedAt { get; set; }

        [Column("updatedby")]
        public string UpdatedBy { get; set; }

        [Column("tenantid")]
        public Guid TenantId { get; set; }

        [Column("initialqty")]
        public string InitialQty { get; set; }

        [Column("inventoryasofdate")]
        public string InventoryAsOfDate { get; set; }

        [Column("reorderpoints")]
        public string ReorderPoints { get; set; }

        [Column("inventoryassetaccount")]
        public string InventoryAssetAccount { get; set; }

        [Column("isseller")]
        public bool IsSeller { get; set; }

        [Column("ispurchaser")]
        public bool IsPurchaser { get; set; }

        [Column("isactive")]
        public bool IsActive { get; set; }
    }
}
