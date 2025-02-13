using DAL.Models;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories
{
    public class NotificationTypeRepository : Repository<NotificationType>, INotificationTypeRepository
    {
        public NotificationTypeRepository(ApplicationDbContext context) : base(context) { }

    }
}
