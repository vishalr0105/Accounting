using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Modules : BaseEntity
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsDeleted { get; set; }
        public string Code { get; set; }
        public string? Icon { get; set; }
        public int TenantId { get; set; }
        public int SortOrder { get; set; }
        public Guid RollId { get; set; }
        public string UserType { get; set; }
    }
}
