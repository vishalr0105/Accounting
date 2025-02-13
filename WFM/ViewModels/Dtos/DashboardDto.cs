namespace WFM.ViewModels.Dtos
{
    public class DashboardDto
    {
        public Guid? Id { get; set; }
        public string Key { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
    }
}
