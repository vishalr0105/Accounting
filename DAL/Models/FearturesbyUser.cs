using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class ModulebyUser
    {
        public Guid ModuleId { get; set; }
        public string Name { get; set; }
        public string? Icon { get; set; }
        public int SortOrder { get; set; }
        public List<FeaturebyUser> Features { get; set; }
        public List<string> FeaturesCode { get; set; }
    }

    public class FeaturebyUser
    {
        public Guid FeatureId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Icon { get; set; }
        public string Url { get; set; }
        public int SortOrder{get;set;}
        public List<PermissionbyUser> Permissions { get; set; }
    }

    public class PermissionbyUser
    {
        public Guid PermissionId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
    }
}
