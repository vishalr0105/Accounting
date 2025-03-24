using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    [Table("generalledgerline", Schema = "public")]
    public class GeneralLedgerLine
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [Column("generalledgerheaderid")]
        public Guid GeneralLedgerHeaderId { get; set; }

        [Required]
        [Column("accountid")]
        public Guid AccountId { get; set; }

        [Required]
        [Column("drcr")]
        public int DrCr { get; set; }  // Debit (0) or Credit (1)

        [Required]
        [Column("amount", TypeName = "numeric(18,2)")]
        public decimal Amount { get; set; }

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
        //[ForeignKey("GeneralLedgerHeaderId")]
        //public virtual GeneralLedgerHeader? GeneralLedgerHeader { get; set; }

        //[ForeignKey("AccountId")]
        //public virtual Account? Account { get; set; }
    }
}
