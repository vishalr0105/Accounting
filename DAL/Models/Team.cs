using System;
using System.Collections.Generic;

namespace DAL.Models
{
    public class Team : BaseEntity
    {
        public string TeamName { get; set; }
        public string Discription { get; set; }
        public ICollection<TeamAndTeamMembers> TeamMemmbers { get; set; }
        public Guid? CompanyId { get; set; }
        public virtual Company Company { get; set; }
        public bool? Status { get; set; }     
    }
}
