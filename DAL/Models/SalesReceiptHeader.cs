using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    [Table("salesreceiptheader", Schema = "public")]
    public class SalesReceiptHeader
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

        [Column("accounttodebitid")]
        public Guid? AccountToDebitId { get; set; }

        [Column("no")]
        public string? No { get; set; }

        [Column("date")]
        public DateTime? Date { get; set; }

        [Column("amount", TypeName = "numeric(18,2)")]
        public decimal? Amount { get; set; }

        [Column("status")]
        public int? Status { get; set; }

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

        //[ForeignKey("AccountToDebitId")]
        //public virtual Account? AccountToDebit { get; set; }
    }
}
