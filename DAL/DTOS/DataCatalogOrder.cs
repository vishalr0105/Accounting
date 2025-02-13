using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.DTOS
{
    public class DataCatalogOrder
    {
        [Key]
        [Column("order_id")]
        public Guid OrderId { get; set; }

        [Column("tenant_id")]
        public int TenantId { get; set; }

        [Column("user_id")]
        public int UserId { get; set; }

        [Column("dataset_id")]
        public int DatasetId { get; set; }

        [Column("status")]
        public string Status { get; set; }

        [Column("order_date")]
        public DateTime OrderDate { get; set; } = DateTime.Now;

        [Column("delivery_date")]
        public DateTime? DeliveryDate { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [Column("created_by")]
        public int CreatedBy { get; set; }

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }

        [Column("last_updated_by")]
        public int LastUpdatedBy { get; set; }

        [Column("order_link")]
        public string? OrderLink { get; set; }

        [Column("can_download")]
        public bool? CanDownload { get; set; }

        [Column("is_link_expired")]
        public bool? IsLinkExpired { get; set; }

        [Column("order_name")]
        public string? OrderName { get; set; }

        [Column("tags")]
        public List<string> Tags { get; set; }

    }
}
