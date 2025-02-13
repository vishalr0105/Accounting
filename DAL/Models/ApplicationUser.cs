// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using DAL.Models.Interfaces;

namespace DAL.Models
{
    public class ApplicationUser : IdentityUser<Guid>, IAuditableEntity
    {
        public virtual string FriendlyName
        {
            get
            {
                string friendlyName = string.IsNullOrWhiteSpace(FullName) ? UserName : FullName;

                if (!string.IsNullOrWhiteSpace(JobTitle))
                    friendlyName = $"{JobTitle} {friendlyName}";

                return friendlyName;
            }
        }


        public string JobTitle { get; set; }
        public string FullName { get; set; }
        public string Configuration { get; set; }
        public string Image { get; set; }
        public bool IsEnabled { get; set; }
        public bool? WebDashboardAcccess { get; set; }
        public bool? MobileAppAccess { get; set; }
        public bool? InventoryProducts { get; set; }
        public bool? CreateJobsOnMobile { get; set; }
        public bool? CreateClient { get; set; }
        public bool? ViewClient { get; set; }
        public bool? CreateAndViewQuotes { get; set; }
        public bool? UnassociateMobileDevice { get; set; }
        public bool? AutoComplatePendingJob { get; set; }
        public bool? PasswordReset { get; set; }
        public bool? AssignJobNotification { get; set; }
        public bool? RejectJobNotification { get; set; }
        public bool? UnassignJobNotificaion { get; set; }
        public bool? PendingJobForm { get; set; }
        public bool? ComplateJobForm { get; set; }
        public bool? ExternalCalender { get; set; }
        public bool? AssetServiceReminder { get; set; }
        public bool? ComplateJobEmail { get; set; }
        public bool IsLockedOut => this.LockoutEnabled && this.LockoutEnd >= DateTimeOffset.UtcNow;
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }


        /// <summary>
        /// Navigation property for the roles this user belongs to.
        /// </summary>
        public virtual ICollection<IdentityUserRole<Guid>> Roles { get; set; }

        /// <summary>
        /// Navigation property for the claims this user possesses.
        /// </summary>
        public virtual ICollection<IdentityUserClaim<Guid>> Claims { get; set; }

        public Guid? CompanyId { get; set; }
        public virtual Company Company { get; set; }
    }
}
