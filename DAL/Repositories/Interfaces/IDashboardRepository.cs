using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IDashboardRepository
    {
        Task<List<Dashboard>> GetDashboards(bool isActive = true);
        Task<ActionResult<List<NotificationDto>>> GetNotifications(Guid userId, bool isNew);
        void MarkNotificationAsRead(Guid userid);
    }
}
