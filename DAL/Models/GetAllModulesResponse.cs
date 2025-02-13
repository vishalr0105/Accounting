using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Module
    {
        public string Name { get; set; }
        public Guid Id { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public List<Feature> Features { get; set; }
        public List<Permission> Permissions { get; set; }
        public string ParentId { get; set; }
    }

    public class Feature
    {
        public string Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
 
        public List<Permission> Permissions { get; set; }
        public string ModuleId { get; set; }
    }

    public class Permission
    {
        public static Permission Allow { get; internal set; }
        public string Id { get; set; }
        public bool? IsSelected { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string FeatureId { get; set; }

    }

    public class UserRole
    {
        public Guid? Id { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public string Name { get; set; }
        public Guid CompanyId { get; set; }
        public string? Description { get; set; }
        public bool CanDelete { get; set; }
        public List<Feature> Features { get; set; }
    }
    public enum FilePermission
    {
        Allow,
        Deny
    }
}

