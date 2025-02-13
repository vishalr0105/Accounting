// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

using WFM.Helpers;
using System.ComponentModel.DataAnnotations;

namespace WFM.ViewModels
{
    public class UserViewModel : UserBaseViewModel
    {
        public bool IsLockedOut { get; set; }
        [MinLength(8, ErrorMessage = "New Password must be at least 8 characters")]
        public string NewPassword { get; set; }

        [MinimumCount(1, ErrorMessage = "Roles cannot be empty")]
        public string[] Roles { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Image { get; set; }
        public Guid? CompanyId { get; set; }
        public string? CompanyName { get; set; }
    }

    public class UserEditViewModel : UserBaseViewModel
    {
        public string CurrentPassword { get; set; }

        [MinLength(8, ErrorMessage = "New Password must be at least 8 characters")]
        public string NewPassword { get; set; }

        [MinimumCount(1, ErrorMessage = "Roles cannot be empty")]
        public string[] Roles { get; set; }
        public string Image { get; set; }
        public Guid? CompanyId { get; set; }
    }

    public class UserPatchViewModel
    {
        public string FullName { get; set; }

        public string JobTitle { get; set; }

        public string PhoneNumber { get; set; }

        public string Configuration { get; set; }
        public Guid? CompanyId { get; set; }
    }

    public class UserCreateModel
    {
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string JobTitle { get; set; }
        public string[] Roles { get; set; }
        public Guid? CompanyId { get; set; }
    }

    public abstract class UserBaseViewModel
    {
        public string Id { get; set; }

        [Required(ErrorMessage = "Username is required"), StringLength(200, MinimumLength = 2, ErrorMessage = "Username must be between 2 and 200 characters")]
        public string UserName { get; set; }

        public string FullName { get; set; }

        [Required(ErrorMessage = "Email is required"), StringLength(200, ErrorMessage = "Email must be at most 200 characters"), EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; }

        public string JobTitle { get; set; }

        public string PhoneNumber { get; set; }

        public string Configuration { get; set; }

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
    }

    public class UserProfilePatchViewModel
    {
        public string FullName { get; set; }

        public string JobTitle { get; set; }

        public string PhoneNumber { get; set; }

        public string CompanyName { get; set; }
        public Guid? CompanyId { get; set; }
        public string Id { get; set; }

    }
}
