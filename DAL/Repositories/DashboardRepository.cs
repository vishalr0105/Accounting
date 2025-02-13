using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
namespace DAL.Repositories
{
    public class DashboardRepository : Repository<Dashboard>, IDashboardRepository
    {
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
        string[] WeekDays = { "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" };
        string[] months = { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" };

        public DashboardRepository(DbContext context) : base(context) { }

        public async Task<List<Dashboard>> GetDashboards(bool isActive = true)
        {
            return await _appContext.Dashboards
                .Where(d => d.IsActive == isActive)
                .ToListAsync();
        }

        public async Task<ActionResult<List<NotificationDto>>> GetNotifications(Guid userId,bool isNew)
        {
            var notificationList = await _appContext.NotificationTable
                .Where(n=>n.UserId==userId)
                .Join(_appContext.NotificationTypes,x=>x.NotificationTypeId,y=>y.N_TypeId, (a, b) => new
                NotificationDto{
                    NotificationTypeId=b.N_TypeId,
                    NotificationIcon=b.NotificationIcon,
                    Notifications=a.Notifications,
                    Id=a.Id,
                    IsRead=a.IsRead,
                    UserId=a.UserId,
                    CreatedAt=a.CreatedAt,
                })
                .OrderByDescending(x => x.CreatedAt).ToListAsync();
            
            if (isNew == true)
            {
                notificationList = notificationList
                    .Where(x => x.IsRead == false).ToList();
            }
            else
            {
                this.MarkNotificationAsRead(userId);
            }
            return notificationList;
        }
        
        public void MarkNotificationAsRead(Guid userid)
        {
            var notification = _appContext.NotificationTable.Where(n => n.UserId == userid
            && n.IsRead == false
            ).ToList();
            foreach (var item in notification)
            {
                item.IsRead = true;
            }
            _appContext.NotificationTable.UpdateRange(notification);
            _appContext.SaveChanges();
        }
    }
}