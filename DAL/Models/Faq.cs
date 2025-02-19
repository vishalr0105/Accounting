using System.ComponentModel.DataAnnotations;

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
