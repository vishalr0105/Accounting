namespace WFM.ViewModels.Dtos
{
    public class TeamDto
    {
        public Guid Id { get; set; }
        public string TeamName { get; set; }
        public string Discription { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<UserViewModel> TeamMembers {get; set;}
        public Guid? CompanyId { get; set; }
        public bool? Status { get; set; }

    }

    public class AddTeamDto
    {
        public Guid? Id { get; set; }
        public string? TeamName { get; set; }
        public string? Discription { get; set; }
        public DateTime? CreatedAt { get; set; }
        public string? UserId { get; set; }
        public Guid? CompanyId { get; set; }
        public bool? Status { get; set; }
        public Guid[]? TeamMemberIds { get; set; }
    }
}
