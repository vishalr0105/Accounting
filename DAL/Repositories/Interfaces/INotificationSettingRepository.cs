using DAL.Models;

namespace DAL.Repositories.Interfaces
{
    public interface INotificationSettingRepository:IRepository<NotificationSetting>
    {
        void IsNotificationSubscribed(Notification notification);
    }
}
