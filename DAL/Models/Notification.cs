using System;

namespace DAL.Models
{
    public class Notification:BaseEntity
    {
        public string Notifications { get; set; }
        public bool IsExpired { get; set; }
        public bool IsRead { get; set; }
        public Guid UserId { get; set; }
        public Guid CompanyId { get; set; }
        public int NotificationTypeId { get; set; }
    }
    public class NotificationDto
    {
        public Guid Id { get; set; }
        public string Notifications { get; set; }
        public string  TimeDifference { get; set; }
        public Guid UserId { get; set; }
        public int NotificationTypeId { get; set; }
        public string NotificationIcon { get; set; }
        public bool IsRead { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
