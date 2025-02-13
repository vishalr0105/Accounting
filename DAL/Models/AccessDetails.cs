using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.AccessControl;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class AccessDetails
    {
        public string Role { get; set; }

        public IEnumerable<AccessRule> AccessRules { get; set; }
    }
}
