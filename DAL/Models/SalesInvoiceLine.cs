using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    [Table("salesinvoiceline", Schema = "public")]
    public class SalesInvoiceLine
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [Column("salesinvoiceheaderid")]
        public Guid SalesInvoiceHeaderId { get; set; }

        [Column("salesorderlineid")]
        public Guid? SalesOrderLineId { get; set; }

        [Column("itemid")]
        public Guid? ItemId { get; set; }

        [Column("measurementid")]
        public Guid? MeasurementId { get; set; }

        [Column("inventorycontroljournalid")]
        public Guid? InventoryControlJournalId { get; set; }

        [Column("quantity", TypeName = "numeric(18,2)")]
        public decimal? Quantity { get; set; }

        [Column("discount", TypeName = "numeric(18,2)")]
        public decimal? Discount { get; set; }

        [Column("amount", TypeName = "numeric(18,2)")]
        public decimal? Amount { get; set; }

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

        // Navigation Properties
        //[ForeignKey("SalesInvoiceHeaderId")]
        //public virtual SalesInvoiceHeader? SalesInvoiceHeader { get; set; }

        //[ForeignKey("SalesOrderLineId")]
        //public virtual SalesOrderLine? SalesOrderLine { get; set; }

        //[ForeignKey("ItemId")]
        //public virtual Item? Item { get; set; }

        //[ForeignKey("MeasurementId")]
        //public virtual Measurement? Measurement { get; set; }
    }
}
