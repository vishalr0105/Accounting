using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class NotificationSetting
    {
        [Key]
        public int NSettingId { get; set; }
        public int N_TypeId { get; set; }
        public string CompanyId { get; set; }
        public bool Subscribed { get; set; }
    }

    public class NotificationType
    {
        [Key]
        public int N_TypeId { get; set; }
        public int N_CatId { get; set; }
        public string Notification_Type { get; set;}
        public bool Subscribed { get; set; }
        public string NotificationIcon { get; set; }
    }

    public class NotificationCategory
    {
        [Key]
        public int NCatId { get; set;}
        public string NCategory { get; set; }
        public bool IsEnable { get; set;}
    }
}
