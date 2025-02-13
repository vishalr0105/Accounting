using DAL.Models;
using System;

namespace DAL
{
    public class AccountDetailDTO
    {
        public AccountTableDto AccountDetail { get; set; }
    }

    public class EmpBasicInfoDTO
    {
        public string EmpId { get; set; }
        public string EmpType { get; set; }
        public string EmpDesignation { get; set; }
        public Guid EmpDepartment { get; set; }
        public Guid EmpReportsTo { get; set; }
        public DateTime EmpJoinedOn { get; set; }
    }

    public class AccountDetailsDTO
    {
        public string EmailId { get; set;}
    }

    public class ContactDetailsDTO
    {
        public string MobileNum { get; set; }
        public string PhoneNum { get; set; }
    }

    public class PersonalDetailsDTO 
    { 
        public DateTime DateOfBirth { get; set;}
        public string BloodGroup { get; set;}
        public string BaseLocation { get; set;}
        public string SocialSecurityNum { get; set;}
        public string DrivingLicence { get; set; }
        public string AssignedMobileIMEI { get; set; }
    }
}
