using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
