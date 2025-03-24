using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics.Metrics;

namespace DAL.Models
{
    [Table("salesorderline", Schema = "public")]
    public class SalesOrderLine
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Column("salesorderheaderid")]
        public Guid? SalesOrderHeaderId { get; set; }

        [Column("itemid")]
        public Guid? ItemId { get; set; }

        [Column("measurementid")]
        public Guid? MeasurementId { get; set; }

        [Column("quantity", TypeName = "numeric(18,2)")]
        public decimal? Quantity { get; set; }

        [Column("discount", TypeName = "numeric(18,2)")]
        public decimal? Discount { get; set; }

        [Column("amount", TypeName = "numeric(18,2)")]
        public decimal? Amount { get; set; }

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
        //[ForeignKey("SalesOrderHeaderId")]
        //public virtual SalesOrderHeader? SalesOrderHeader { get; set; }

        //[ForeignKey("ItemId")]
        //public virtual Item? Item { get; set; }

        //[ForeignKey("MeasurementId")]
        //public virtual Measurement? Measurement { get; set; }
    }
}
