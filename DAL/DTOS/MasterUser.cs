using DAL.Models.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DAL.DTOS
{
    public class MasterUser : IdentityUser<Guid>, IAuditableEntity
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; }

        [Column("user_id")]
        public int UserId { get; set; }

        [Column("username")]
        public string? Username { get; set; }
        
        [Column("firstname")]
        public string? FirstName { get; set; }
        
        [Column("lastname")]
        public string? LastName { get; set; }
        
        [Column("industry")]
        public int? Industry { get; set; }
        
        [Column("jobtitle")]
        public int? JobTitle { get; set; }
        
        [Column("phonenumber")]
        public string? Phonenumber { get; set; }

        [Column("profileimage")]
        public string? ProfileImage { get; set; }

        [Column("notification")]
        public bool? Notification { get; set; }

        #region ignore
        [JsonIgnore] // Ignore the inherited UserName property
        public override string UserName { get; set; }
        [JsonIgnore] // Ignore inherited NormalizedUserName
        public override string NormalizedUserName { get; set; }

        [JsonIgnore] // Ignore inherited EmailConfirmed
        public override bool EmailConfirmed { get; set; }
        [JsonIgnore] // Ignore inherited NormalizedEmail
        public override string NormalizedEmail { get; set; }

        [JsonIgnore] // Ignore inherited SecurityStamp
        public override string SecurityStamp { get; set; }

        [JsonIgnore] // Ignore inherited ConcurrencyStamp
        public override string ConcurrencyStamp { get; set; }

        [JsonIgnore] // Ignore inherited PhoneNumber
        public override string PhoneNumber { get; set; }

        [JsonIgnore] // Ignore inherited PhoneNumberConfirmed
        public override bool PhoneNumberConfirmed { get; set; }

        [JsonIgnore] // Ignore inherited TwoFactorEnabled
        public override bool TwoFactorEnabled { get; set; }

        [JsonIgnore] // Ignore inherited LockoutEnd
        public override DateTimeOffset? LockoutEnd { get; set; }

        [JsonIgnore] // Ignore inherited LockoutEnabled
        public override bool LockoutEnabled { get; set; }

        [JsonIgnore] // Ignore inherited AccessFailedCount
        public override int AccessFailedCount { get; set; }
        #endregion

        [Column("email")]
        public string Email { get; set; }

        [Column("password_hash")]
        public string PasswordHash { get; set; }

        [Column("role")]
        public string Role { get; set; }

        [Column("credits")]
        public double Credits{ get; set; }

        [Column("tenant_id")]
        public int? TenantId { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        [Column("created_by")]
        public int? CreatedBy { get; set; }

        [Column("last_updated_by")]
        public int? UpdatedBy { get; set; }

        // Implement interface explicitly
        string IAuditableEntity.CreatedBy { get => CreatedBy.ToString(); set => CreatedBy = Convert.ToInt32(value); }
        string IAuditableEntity.UpdatedBy { get => UpdatedBy.ToString(); set => UpdatedBy = Convert.ToInt32(value); }

    }

    public class RegisterModel
    {
        public string Username { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public int? Industry { get; set; }

        public int? JobTitle { get; set; }

        public string? Phonenumber { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Role { get; set; }

        public double Credits { get; set; }

    }

    public class LoginRequestModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class ResetPasswordInput
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }

    public class UpdateEmailInput
    {
        public string NewEmail { get; set; }
        public string CurrentPassword { get; set; }
    }
}
