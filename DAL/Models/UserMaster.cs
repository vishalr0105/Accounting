using System;

namespace DAL.Models
{
	public class UserMaster : BaseEntity
    {
        public Guid CompanyId { get; set; }
        public Guid? RollId { get; set; }
        public Guid? RollPermissionId { get; set; }
        public string UserImage { get; set; }
        public string FullName { get; set; }
        public string EmployeeID { get; set; }
        public string UserType { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string EmailID { get; set; }
        public bool Status { get; set; }
        public bool Twostepverification { get; set; }
        public string MobileNumber { get; set; }
        public string BaseLocation { get; set; }
        public DateTime JoiningDate { get; set; }
        public DateTime?DateofLeaving { get; set; }
        public string? RefreshToken { get; set; }
        public Guid? AccountId { get; set; }
        public string BaseAddress { get; set; }
    }
}