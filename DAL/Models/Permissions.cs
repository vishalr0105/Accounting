using System;

namespace DAL.Models
{
    public class Permissions :BaseEntity
    {
        public Guid Id { get; set; }
        public Guid ModuleId { get; set; }
        public Guid FeatureId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsDeleted { get; set; }
    }
}
