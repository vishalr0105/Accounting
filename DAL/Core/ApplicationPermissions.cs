// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

using System.Collections.Generic;
using System.Linq;
using System.Collections.ObjectModel;

namespace DAL.Core
{
    public static class ApplicationPermissions
    {
        public static ReadOnlyCollection<ApplicationPermission> AllPermissions;

        public const string UsersPermissionGroupName = "User Permissions";
        public static ApplicationPermission ViewUsers = new ApplicationPermission("View Users", "users.view", UsersPermissionGroupName, "Permission to view other users account details");
        public static ApplicationPermission ManageUsers = new ApplicationPermission("Manage Users", "users.manage", UsersPermissionGroupName, "Permission to create, delete and modify other users account details");
        public const string RolesPermissionGroupName = "Role Permissions";
        public static ApplicationPermission ViewRoles = new ApplicationPermission("View Roles", "roles.view", RolesPermissionGroupName, "Permission to view available roles");
        public static ApplicationPermission ManageRoles = new ApplicationPermission("Manage Roles", "roles.manage", RolesPermissionGroupName, "Permission to create, delete and modify roles");
        public static ApplicationPermission AssignRoles = new ApplicationPermission("Assign Roles", "roles.assign", RolesPermissionGroupName, "Permission to assign roles to users");
        public static ApplicationPermission ViewDocument = new ApplicationPermission("View Document", "roles.document", RolesPermissionGroupName, "Permission to view document");
        public static ApplicationPermission ManageAssets = new ApplicationPermission("Manage Assets", "roles.assets", RolesPermissionGroupName, "Permission to manage assets");
        public static ApplicationPermission ManageClientAndSuppliers = new ApplicationPermission("Manage Client And Suppliers", "roles.clientAndSupplier", RolesPermissionGroupName, "Permission to manage client and suppliers");
        public static ApplicationPermission ManageReminder = new ApplicationPermission("Manage Reminder", "roles.reminder", RolesPermissionGroupName, "permission to manage reminders");
        public static ApplicationPermission ManageInventory = new ApplicationPermission("Manage Inventory", "roles.inventory", RolesPermissionGroupName, "permission to manage inventory");
        public static ApplicationPermission ViewDashBoard = new ApplicationPermission("View DashBoard", "roles.dashboard", RolesPermissionGroupName, "Permission to View Dashboard");
        public static ApplicationPermission CustomerDashboard = new ApplicationPermission("Customer Dashboard", "roles.customer.dashboard", RolesPermissionGroupName, "Permission to view customer dashboard");
        public static ApplicationPermission CustomerAppointments = new ApplicationPermission("Customer Appointments", "roles.customer.appointments", RolesPermissionGroupName, "Permission to view customer appointments");

        static ApplicationPermissions()
        {
            List<ApplicationPermission> allPermissions = new()
            {
                ViewUsers,
                ManageUsers,
                ViewRoles,
                ManageRoles,
                AssignRoles,
                ViewDocument,
                ManageAssets,
                ManageClientAndSuppliers,
                ManageReminder,
                ManageInventory,
                ViewDashBoard,
                CustomerDashboard,
                CustomerAppointments
            };

            AllPermissions = allPermissions.AsReadOnly();
        }

        public static ApplicationPermission GetPermissionByName(string permissionName)
        {
            return AllPermissions.Where(p => p.Name == permissionName).SingleOrDefault();
        }

        public static ApplicationPermission GetPermissionByValue(string permissionValue)
        {
            return AllPermissions.Where(p => p.Value == permissionValue).SingleOrDefault();
        }

        public static string[] GetAllPermissionValues()
        {
            return AllPermissions.Select(p => p.Value).ToArray();
        }

        public static string[] GetAdministrativePermissionValues()
        {
            return new string[] { ManageUsers, ManageRoles, AssignRoles };
        }
    }

    public class ApplicationPermission
    {
        public ApplicationPermission()
        { }

        public ApplicationPermission(string name, string value, string groupName, string description = null)
        {
            Name = name;
            Value = value;
            GroupName = groupName;
            Description = description;
        }

        public string Name { get; set; }
        public string Value { get; set; }
        public string GroupName { get; set; }
        public string Description { get; set; }
        public override string ToString()
        {
            return Value;
        }

        public static implicit operator string(ApplicationPermission permission)
        {
            return permission.Value;
        }
    }
}
