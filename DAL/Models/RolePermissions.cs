using System;

namespace DAL.Models
{
    public class RolePermissions : BaseEntity
    {
        public Guid RoleId { get; set; }
        public Guid ModuleId { get; set; }
        public Guid FeatureId { get; set; }
        public Guid PermissionId { get; set; }
        public string UserType { get; set; }
    }
}
