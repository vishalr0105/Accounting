using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace DAL.Repositories
{
    public class NotificationSettingRepository : Repository<NotificationSetting>, INotificationSettingRepository
    {
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

        public NotificationSettingRepository(DbContext context) : base(context)
        {

        }

        public void IsNotificationSubscribed(Notification notification)
        {
            try
            {
                var isSubscribed = _appContext.NotificationSettings
                                .Where(n => n.N_TypeId == notification.NotificationTypeId
                                && n.CompanyId == notification.CompanyId.ToString()
                                ).FirstOrDefault();
                if (isSubscribed != null && isSubscribed.Subscribed == true)
                {
                    _appContext.NotificationTable.Add(notification);
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
