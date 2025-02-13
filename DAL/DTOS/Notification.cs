using System;

namespace DAL.DTOS
{
    public class NotificationUP
    {
        public int NotificationId { get; set; }
        public int UserId { get; set; }
        public string Message { get; set; }
        public string Type { get; set; }
        public string Status { get; set; } = "Unread";
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public int? CreatedBy { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public int? LastUpdatedBy { get; set; }
    }
}
