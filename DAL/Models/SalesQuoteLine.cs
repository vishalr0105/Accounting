using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    [Table("salesquoteline", Schema = "public")]
    public class SalesQuoteLine
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [Column("salesquoteheaderid")]
        public Guid SalesQuoteHeaderId { get; set; }    

        [Required]
        [Column("itemid")]
        public Guid ItemId { get; set; }

        [Required]
        [Column("measurementid")]
        public Guid MeasurementId { get; set; }

        [Required]
        [Column("quantity")]
        public int Quantity { get; set; }

        [Required]
        [Column("discount", TypeName = "numeric(18,2)")]
        public decimal Discount { get; set; }

        [Required]
        [Column("amount", TypeName = "numeric(18,2)")]
        public decimal Amount { get; set; }

        [Column("tax")]
        public bool Tax { get; set; }

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
        //[ForeignKey("SalesQuoteHeaderId")]
        //public virtual SalesQuoteHeader SalesQuoteHeader { get; set; }

        //[ForeignKey("ItemId")]
        //public virtual Item Item { get; set; }

        //[ForeignKey("MeasurementId")]
        //public virtual Measurement Measurement { get; set; }
    }
}
