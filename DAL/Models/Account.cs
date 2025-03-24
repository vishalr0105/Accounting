using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    [Table("account", Schema = "public")]
    public class Account
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; }

        [Column("accountclassid")]
        public Guid AccountClassId { get; set; }

        [Column("parentaccountid")]
        public Guid? ParentAccountId { get; set; }

        [Column("drorcrside")]
        public int DrOrCrSide { get; set; }

        [Column("companyid")]
        public Guid CompanyId { get; set; }

        [Column("accountcode")]
        public string AccountCode { get; set; } = null!;

        [Column("accountname")]
        public string AccountName { get; set; } = null!;

        [Column("description")]
        public string? Description { get; set; }

        [Column("iscash")]
        public bool IsCash { get; set; }

        [Column("iscontraaccount")]
        public bool IsContraAccount { get; set; }

        [Column("rowversion")]
        public byte[]? RowVersion { get; set; }

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
