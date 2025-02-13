using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace DAL.Models
{
    public class Tenant
    {
        [Key]
        [Column("tenant_id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TenantId { get; set; }

        [Required]
        [Column("name")]
        [StringLength(255)]
        public string Name { get; set; }

        [Column("domain")]
        [StringLength(255)]
        public string? Domain { get; set; }

        [Column("credit_threshold", TypeName = "numeric(10,2)")]
        public decimal CreditThreshold { get; set; } = 0.00m;

        [Column("credit_usage", TypeName = "numeric(10,2)")]
        public decimal CreditUsage { get; set; } = 0.00m;

        [Required]
        [Column("billing_cycle")]
        [StringLength(50)]
        public string BillingCycle { get; set; }

        [Required]
        [Column("contact_email")]
        [StringLength(100)]
        public string ContactEmail { get; set; }

        [Column("contact_phone")]
        [StringLength(15)]
        public string? ContactPhone { get; set; }

        [Column("address", TypeName = "jsonb")]
        [JsonIgnore]
        public string? AddressJson { get; set; }

        [NotMapped]
        public JsonDocument? Address
        {
            get => AddressJson == null ? null : JsonDocument.Parse(AddressJson);
            set => AddressJson = value?.RootElement.GetRawText();
        }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("created_by")]
        public int? CreatedBy { get; set; }

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        [Column("last_updated_by")]
        public int? LastUpdatedBy { get; set; }
    }
}
