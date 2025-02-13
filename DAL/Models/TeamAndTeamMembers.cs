using System;

namespace DAL.Models
{
    public class TeamAndTeamMembers
    {
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public Guid? TeamId { get; set; }
        public Team Team { get; set; }
    }
}
