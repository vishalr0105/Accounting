using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    [Table("salesinvoiceheader", Schema = "public")]
    public class SalesInvoiceHeader
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [Column("customerid")]
        public Guid CustomerId { get; set; }

        [Column("generalledgerheaderid")]
        public Guid? GeneralLedgerHeaderId { get; set; }

        [Column("no")]
        public string? No { get; set; }

        [Required]
        [Column("shippinghandlingcharge", TypeName = "numeric(18,2)")]
        public decimal ShippingHandlingCharge { get; set; }

        [Column("paymenttermid")]
        public Guid? PaymentTermId { get; set; }

        [Column("referenceno")]
        public string? ReferenceNo { get; set; }

        [Column("status")]
        public int? Status { get; set; }

        [Column("amount")]
        public decimal Amount { get; set; }

        [Column("subtotal")]
        public decimal SubTotal { get; set; }
        
        [Column("taxablesubtotal")]
        public decimal TaxableSubtotal { get; set; }

        [Column("taxpercent")]
        public decimal TaxPercent { get; set; }

        [Column("taxamount")]
        public decimal TaxAmount { get; set; }

        [Column("terms")]
        public string Terms { get; set; }
        
        [Column("duedate")]
        public string? DueDate { get; set; }

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

        //// Navigation Properties
        //[ForeignKey("GeneralLedgerHeaderId")]
        //public virtual GeneralLedgerHeader? GeneralLedgerHeader { get; set; }
    }
}
