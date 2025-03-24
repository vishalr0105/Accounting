using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    [Table("salesreceiptline", Schema = "public")]
    public class SalesReceiptLine
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [Column("salesreceiptheaderid")]
        public Guid SalesReceiptHeaderId { get; set; }

        [Column("salesinvoicelineid")]
        public Guid? SalesInvoiceLineId { get; set; }

        [Column("itemid")]
        public Guid? ItemId { get; set; }

        [Column("accounttocreditid")]
        public Guid? AccountToCreditId { get; set; }

        [Column("measurementid")]
        public Guid? MeasurementId { get; set; }

        [Column("quantity", TypeName = "numeric(18,2)")]
        public decimal? Quantity { get; set; }

        [Column("discount", TypeName = "numeric(18,2)")]
        public decimal? Discount { get; set; }

        [Column("amount", TypeName = "numeric(18,2)")]
        public decimal? Amount { get; set; }

        [Column("amountpaid", TypeName = "numeric(18,2)")]
        public decimal? AmountPaid { get; set; }

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
        //[ForeignKey("SalesReceiptHeaderId")]
        //public virtual SalesReceiptHeader SalesReceiptHeader { get; set; }

        //[ForeignKey("SalesInvoiceLineId")]
        //public virtual SalesInvoiceLine? SalesInvoiceLine { get; set; }

        //[ForeignKey("ItemId")]
        //public virtual Item? Item { get; set; }

        //[ForeignKey("AccountToCreditId")]
        //public virtual Account? AccountToCredit { get; set; }

        //[ForeignKey("MeasurementId")]
        //public virtual Measurement? Measurement { get; set; }
    }
}
