using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    [Table("tax", Schema = "public")]
    public class Tax
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Column("salesaccountid")]
        public Guid? SalesAccountId { get; set; }

        [Column("purchasingaccountid")]
        public Guid? PurchasingAccountId { get; set; }

        [Column("taxname", TypeName = "character varying(50)")]
        [StringLength(50)]
        public string? TaxName { get; set; }

        [Column("taxcode", TypeName = "character varying(16)")]
        [StringLength(16)]
        public string? TaxCode { get; set; }

        [Column("rate", TypeName = "numeric(18,2)")]
        public decimal? Rate { get; set; }

        [Column("isactive")]
        public bool? IsActive { get; set; }

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
        //[ForeignKey("SalesAccountId")]
        //public virtual Account? SalesAccount { get; set; }

        //[ForeignKey("PurchasingAccountId")]
        //public virtual Account? PurchasingAccount { get; set; }
    }
}
