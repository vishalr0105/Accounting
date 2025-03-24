using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    [Table("salesquoteheader", Schema = "public")]
    public class SalesQuoteHeader
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [Column("customerid")]
        public Guid CustomerId { get; set; }

        [Column("paymenttermid")]
        public Guid? PaymentTermId { get; set; }

        [Column("referenceno")]
        public string? ReferenceNo { get; set; }

        [Column("no")]
        public string? No { get; set; }

        [Column("status")]
        public int? Status { get; set; }

        [Required]
        [Column("date")]
        public DateTime Date { get; set; }

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
        //[ForeignKey("PaymentTermId")]
        //public virtual PaymentTerm? PaymentTerm { get; set; }
    }
}
