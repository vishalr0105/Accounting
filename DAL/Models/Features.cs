using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Features : BaseEntity
    {
        public Guid Id { get; set; }
        public Guid ModuleId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public string Icon { get; set; }
        public string Description { get; set; }
        public bool IsDeleted { get; set; }
        public int SortOrder { get; set; }
    }
}
