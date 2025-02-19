using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class UserPwdHistory : BaseEntity
    {
        [Key]
        [Column("id")] // Matches DB column
        public Guid Id { get; set; } = Guid.NewGuid();
        [Column("user_id")]
        public Guid UserId { get; set; }

        [Column("reset_pwd_code")]
        public string? ResetPwdCode { get; set; }

        [Column("old_pwd")]
        public string? OldPwd { get; set; }

        [Column("is_link_active")]
        public bool IsLinkActive { get; set; }

        [Column("created_by")]
        public string CreatedBy { get; set; }

        [Column("updated_by")]
        public string UpdatedBy { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
