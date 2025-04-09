using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    [Table("generalledgerheader", Schema = "public")]
    public class GeneralLedgerHeader
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public Guid Id { get; set; } = Guid.NewGuid();

        //[Required]
        //[Column("date")]
        //public DateTime Date { get; set; }

        [Required]
        [Column("documenttype")]
        public int DocumentType { get; set; }

        [Column("description")]
        public string? Description { get; set; }

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

        // Navigation Property
        //public virtual ICollection<GeneralLedgerLine>? GeneralLedgerLines { get; set; }
    }
}
