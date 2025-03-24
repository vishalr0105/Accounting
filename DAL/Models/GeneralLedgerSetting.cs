using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    [Table("generalledgersetting", Schema = "public")]
    public class GeneralLedgerSetting
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; }

        [Column("companyid")]
        public Guid? CompanyId { get; set; }

        [Column("payableaccountid")]
        public Guid? PayableAccountId { get; set; }

        [Column("purchasediscountaccountid")]
        public Guid? PurchaseDiscountAccountId { get; set; }

        [Column("goodsreceiptnoteclearingaccountid")]
        public Guid? GoodsReceiptNoteClearingAccountId { get; set; }

        [Column("salesdiscountaccountid")]
        public Guid? SalesDiscountAccountId { get; set; }

        [Column("shippingchargeaccountid")]
        public Guid? ShippingChargeAccountId { get; set; }

        [Column("permanentaccountid")]
        public Guid? PermanentAccountId { get; set; }

        [Column("incomesummaryaccountid")]
        public Guid? IncomeSummaryAccountId { get; set; }

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
    }
}
