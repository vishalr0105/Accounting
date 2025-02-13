using System;
namespace DAL.Models
{
    public class TeamMemberAndZipCodes : BaseEntity
    {
        public virtual Company Company { get; set; }
        public Guid? CompanyId { get; set; }
        public UserMaster User { get; set; }
        public Guid? UserId { get; set; }
        public string ZipCode { get; set; }
    }
}