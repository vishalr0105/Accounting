using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class CreditManagement
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("userid")]
        public Guid UserId { get; set; }
        [Column("creditsspent")]
        public decimal? CreditsSpent { get; set; }
        [Column("creditspurchased")]
        public decimal? CreditsPurchased { get; set; }
        [Column("createdat")]
        public DateTime? CreatedAt { get; set; }
    }
}
