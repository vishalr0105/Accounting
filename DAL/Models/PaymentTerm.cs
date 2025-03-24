using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    [Table("paymentterm", Schema = "public")]
    public class PaymentTerm
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; }

        [Column("description")]
        public string? Description { get; set; }

        [Column("paymenttype")]
        public int PaymentType { get; set; }

        [Column("dueafterdays")]
        public int? DueAfterDays { get; set; }

        [Column("isactive")]
        public bool IsActive { get; set; }

        [Column("createdat")]
        public string? CreatedAt { get; set; }

        [Column("updatedat")]
        public string? UpdatedAt { get; set; }

        [Column("tenantid")]
        public Guid? TenantId { get; set; }

        [Column("createdby")]
        public string? CreatedBy { get; set; }

        [Column("updatedby")]
        public string? UpdatedBy { get; set; }
    }
}
