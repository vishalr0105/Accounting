using System;

namespace DAL.Models
{
    public class Contact : BaseEntity
    {
        public string Salutation { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string DeskPhone { get; set; }
        public string HandPhone { get; set; }
        public string Title { get; set; }
        public string Department { get; set; }
        public string SocialProfile { get; set; }
        public DateTime? Birthday { get; set; }
        public DateTime? Anniversary { get; set; }
        public string Celebrates { get; set; }
        public string Type { get; set; }
        public string PreferredEngineerId { get; set; }
        public virtual ApplicationUser PreferredEngineer { get; set; }
        public Guid? ClientAndSuppliersId { get; set; }
    }
}
