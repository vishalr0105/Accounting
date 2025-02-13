using System;

namespace DAL.Models
{
    public class TeamMember : BaseEntity
    {
        public Guid CompanyId { get; set; }
        public string FullName { get; set; }
        public string Status { get; set; }
        public string UserRole { get; set; }
        public string Image { get; set; }
        public string EmployeeId { get; set; }
        public string Designation { get; set; }
        public string EmploymentType { get; set; }
        public string Department { get; set; }
        public string ReportingManager { get; set; }
        public DateTime? JoiningDate { get; set; }
        public Boolean IsCurrentlyWorking { get; set; }
        public string Bonus { get; set; }
        public string OverTimeCharges { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string BloodGroup { get; set; }
        public string BaseLocation { get; set; }
        public string EmailAddress { get; set; }
        public string MobileNumber { get; set; }
        public string EmergencyContactNo { get; set; }
        public string InsuranceNo { get; set; }
        public string SocialSecurityNo { get; set; }
        public string DrivingLicense { get; set; }
        public string AssignedMobileIMEI { get; set; }

    }
}
