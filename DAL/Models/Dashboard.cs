namespace DAL.Models
{
    public class Dashboard : BaseEntity
    {
        public string Key { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
    }
}
