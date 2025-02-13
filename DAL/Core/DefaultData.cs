using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Core
{
    public static class DefaultDataSeeding
    {
        public static void SeedDefaultData(ModelBuilder builder)
        {
            //AddWarranties(builder);

        }
        public static void AddDefaultCurrencies(ModelBuilder builder)
        {
            builder.Entity<CurrencyMaster>()
                .HasData(new CurrencyMaster { Currency = "AUD", IsEnable = true, SymbolIcon = "&#36;", Id = 1 });
            builder.Entity<CurrencyMaster>()
                .HasData(new CurrencyMaster { Currency = "NZD", IsEnable = true, SymbolIcon = "&#36;", Id = 2 });
            builder.Entity<CurrencyMaster>()
                .HasData(new CurrencyMaster { Currency = "SGD", IsEnable = true, SymbolIcon = "&#36;", Id = 3 });
            builder.Entity<CurrencyMaster>()
                .HasData(new CurrencyMaster { Currency = "RM", IsEnable = true, SymbolIcon = "", Id = 4 });
            builder.Entity<CurrencyMaster>()
                .HasData(new CurrencyMaster { Currency = "HK", IsEnable = true, SymbolIcon = "&#36;", Id = 5 });
            builder.Entity<CurrencyMaster>()
                .HasData(new CurrencyMaster { Currency = "INR", IsEnable = true, SymbolIcon = "", Id = 6 });
            builder.Entity<CurrencyMaster>()
                .HasData(new CurrencyMaster { Currency = "Thai Bhat", IsEnable = true, SymbolIcon = "&#3647;", Id = 7 });
            builder.Entity<CurrencyMaster>()
                .HasData(new CurrencyMaster { Currency = "Indonesia Rupiah", IsEnable = true, SymbolIcon = "&#82;&#112;", Id = 8 });
            builder.Entity<CurrencyMaster>()
                .HasData(new CurrencyMaster { Currency = "PHP Peso", IsEnable = true, SymbolIcon = "&#8369;", Id = 9 });
            builder.Entity<CurrencyMaster>()
                .HasData(new CurrencyMaster { Currency = "Euro", IsEnable = true, SymbolIcon = "&#8364;", Id = 10 });
            builder.Entity<CurrencyMaster>()
                .HasData(new CurrencyMaster { Currency = "Canadian$", IsEnable = true, SymbolIcon = "&#36;", Id = 11 });
            builder.Entity<CurrencyMaster>()
                .HasData(new CurrencyMaster { Currency = " Japanese Yen", IsEnable = true, SymbolIcon = "&#165;", Id = 12 });
            builder.Entity<CurrencyMaster>()
                .HasData(new CurrencyMaster { Currency = "British Pound", IsEnable = true, SymbolIcon = "&#163;", Id = 13 });


        }
        public static void AddNotificationCategory(ModelBuilder builder)
        {
            builder.Entity<NotificationCategory>().HasData(
                new NotificationCategory { NCatId = 1, NCategory = "Appointments", IsEnable = true },
                         new NotificationCategory { NCatId = 2, NCategory = "Estimate&Quote", IsEnable = true },
                         new NotificationCategory { NCatId = 3, NCategory = "WorkOrder", IsEnable = true },
                         new NotificationCategory { NCatId = 4, NCategory = "Invoice&Payments", IsEnable = true },
                         new NotificationCategory { NCatId = 5, NCategory = "Inventory", IsEnable = true },
                         new NotificationCategory { NCatId = 6, NCategory = "Remote Assistant", IsEnable = true },
                         new NotificationCategory { NCatId = 7, NCategory = "Fleet", IsEnable = true },
                         new NotificationCategory { NCatId = 8, NCategory = "Leave", IsEnable = true },
                         new NotificationCategory { NCatId = 9, NCategory = "Account", IsEnable = true },
                         new NotificationCategory { NCatId = 10, NCategory = "Push", IsEnable = true }
                         );
        }
        public static void AddNotificationTypes(ModelBuilder builder)
        {
            builder.Entity<NotificationType>().HasData(
                new NotificationType { N_TypeId = 1, Notification_Type = "New User Registration", Subscribed = true, N_CatId = 9 },
                         new NotificationType { N_TypeId = 2, Notification_Type = "User Role Change", Subscribed = true, N_CatId = 9, },
                         new NotificationType { N_TypeId = 3, Notification_Type = "User Password Reset", Subscribed = true, N_CatId = 9 },
                         new NotificationType { N_TypeId = 4, Notification_Type = "Reminders", Subscribed = true, N_CatId = 10 },
                         new NotificationType { N_TypeId = 5, Notification_Type = "Comments", Subscribed = true, N_CatId = 10 },
                         new NotificationType { N_TypeId = 6, Notification_Type = "Emails", Subscribed = true, N_CatId = 10 },
                         new NotificationType { N_TypeId = 7, Notification_Type = "New Appointments Booked", Subscribed = true, N_CatId = 1 },
                         new NotificationType { N_TypeId = 8, Notification_Type = "Appointments Cancelled", Subscribed = true, N_CatId = 1 },
                         new NotificationType { N_TypeId = 9, Notification_Type = "Appointments Rescheduled", Subscribed = true, N_CatId = 1 },
                         new NotificationType { N_TypeId = 10, Notification_Type = "Appointments Confirmation Sent To Customer", Subscribed = true, N_CatId = 1 },
                         new NotificationType { N_TypeId = 11, Notification_Type = "New Estimate & Quote created", Subscribed = true, N_CatId = 2 },
                         new NotificationType { N_TypeId = 12, Notification_Type = "Estimated approved by customer", Subscribed = true, N_CatId = 2 },
                         new NotificationType { N_TypeId = 13, Notification_Type = "Estimate rejected by customer", Subscribed = true, N_CatId = 2 },
                         new NotificationType { N_TypeId = 14, Notification_Type = "Estimate Deleted", Subscribed = true, N_CatId = 2 },
                         new NotificationType { N_TypeId = 15, Notification_Type = "New Work Order created", Subscribed = true, N_CatId = 3 },
                         new NotificationType { N_TypeId = 16, Notification_Type = "New Work Order created", Subscribed = true, N_CatId = 3 },
                         new NotificationType { N_TypeId = 17, Notification_Type = "Work order assigned to Technician", Subscribed = true, N_CatId = 3 },
                         new NotificationType { N_TypeId = 18, Notification_Type = "Work order accepted by Technician", Subscribed = true, N_CatId = 3 },
                         new NotificationType { N_TypeId = 19, Notification_Type = "Work order status changed", Subscribed = true, N_CatId = 3 },
                         new NotificationType { N_TypeId = 20, Notification_Type = "Workd order completed", Subscribed = true, N_CatId = 3 },
                         new NotificationType { N_TypeId = 21, Notification_Type = "Workrder tracking message to customer", Subscribed = true, N_CatId = 3 },
                         new NotificationType { N_TypeId = 22, Notification_Type = "Workrder deleted", Subscribed = true, N_CatId = 3 },
                         new NotificationType { N_TypeId = 23, Notification_Type = "New Invoice created", Subscribed = true, N_CatId = 4 },
                         new NotificationType { N_TypeId = 24, Notification_Type = "Invoice sent to customer", Subscribed = true, N_CatId = 4 },
                         new NotificationType { N_TypeId = 25, Notification_Type = "Payment received by customer", Subscribed = true, N_CatId = 4 },
                         new NotificationType { N_TypeId = 26, Notification_Type = "Invoice rejected by customer", Subscribed = true, N_CatId = 4 },
                         new NotificationType { N_TypeId = 27, Notification_Type = "Invocie deleted", Subscribed = true, N_CatId = 4 },
                         new NotificationType { N_TypeId = 28, Notification_Type = "New Part request by technician", Subscribed = true, N_CatId = 5 },
                         new NotificationType { N_TypeId = 29, Notification_Type = "New transfer Order created", Subscribed = true, N_CatId = 5 },
                         new NotificationType { N_TypeId = 30, Notification_Type = "Purchase order created", Subscribed = true, N_CatId = 5 },
                         new NotificationType { N_TypeId = 31, Notification_Type = "New Sales order created", Subscribed = true, N_CatId = 5 },
                         new NotificationType { N_TypeId = 32, Notification_Type = "Order shipped", Subscribed = true, N_CatId = 5 },
                         new NotificationType { N_TypeId = 33, Notification_Type = "Transfer order deleted", Subscribed = true, N_CatId = 5 },
                         new NotificationType { N_TypeId = 34, Notification_Type = "Sales order deleted", Subscribed = true, N_CatId = 5 },
                new NotificationType { N_TypeId = 35, Notification_Type = "New Remote assistance session initiated by technician/expert", Subscribed = true, N_CatId = 6 },
                         new NotificationType { N_TypeId = 36, Notification_Type = "Remote assistance call failed", Subscribed = true, N_CatId = 6 },
                //new NotificationType { N_TypeId = 37, Notification_Type = "New Vehicle profile created", Subscribed = true, N_CatId = 7 },
                         new NotificationType { N_TypeId = 38, Notification_Type = "New Geofence created", Subscribed = true, N_CatId = 7 },
                         //new NotificationType { N_TypeId = 39, Notification_Type = "Vehicle profile deleted", Subscribed = true, N_CatId = 7 },
                         new NotificationType { N_TypeId = 40, Notification_Type = "Technician Clocked In", Subscribed = true, N_CatId = 8 },
                         new NotificationType { N_TypeId = 41, Notification_Type = "Technician Clocked Out", Subscribed = true, N_CatId = 8 },
                new NotificationType { N_TypeId = 42, Notification_Type = "New Leave request", Subscribed = true, N_CatId = 8 },
                         new NotificationType { N_TypeId = 43, Notification_Type = "Leave approved", Subscribed = true, N_CatId = 8 },
                         new NotificationType { N_TypeId = 44, Notification_Type = "Leave rejected", Subscribed = true, N_CatId = 8 }
                         );
        }
    }
}
