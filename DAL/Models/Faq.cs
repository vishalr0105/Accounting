using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Permissions;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class HelpCenter
    {
        [Key]
        public int Id { get; set; }
        public string HelpContext { get; set; }
        public string ContextDescription { get; set; }
        public string HelpTopic { get; set; }
        public string TopicSteps { get; set; }
        public bool IsDeleted { get; set; }

    }
}
