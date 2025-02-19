using DAL.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;
using DAL.Models.Interfaces;
using DAL.Core;
using DAL.DTOS;
using Microsoft.AspNetCore.Identity;

namespace DAL
{
    //public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    public class ApplicationDbContext : IdentityDbContext<MasterUser, ApplicationRole, Guid>
    {
        public string CurrentUserId { get; set; }
        public DbSet<AccountTable> AccountTable { get; set; }
        public DbSet<ContactsMasterTable> ContactsMasterTable { get; set; }
        public DbSet<ActivityStatusTable> ActivityStatusTable { get; set; }
        public DbSet<AccountTableLog> AccountTableLog { get; set; }
        public DbSet<ContactsTableLog> ContactsTableLog { get; set; }
        public DbSet<Models.CreditNote> CreditNotes { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<NewRole> NewRole { get; set; }
        public DbSet<Company> Company { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Dashboard> Dashboards { get; set; }
        public DbSet<Models.Invoice> Invoices { get; set; }
        public DbSet<InvoiceModel> InvoicesTable { get; set; }
        public DbSet<Modules> Modules { get; set; }
        public DbSet<Features> Features { get; set; }
        public DbSet<Permissions> Permissions { get; set; }
        public DbSet<RolePermissions> RolePermissions { get; set; }
        public DbSet<UserMaster> UserMaster { get; set; }
        public DbSet<MasterUser> masterusers { get; set; }
        public DbSet<Tenant> tenants { get; set; }
        public DbSet<Notification> NotificationTable { get; set; }
        public DbSet<NotificationSetting> NotificationSettings { get; set; }
        public DbSet<NotificationType> NotificationTypes { get; set; }
        public DbSet<VendorTable> VendorTable { get; set; }
        public DbSet<CurrencyMaster> CurrencyMaster { get; set; }
        public DbSet<CompanySidebar> CompanySidebar { get; set; }
        public DbSet<IndustryType> industrytypes { get; set; }
        public DbSet<JobTitle> jobtitle { get; set; }

        public DbSet<UserPwdHistory> userpwdhistory { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            DefaultDataSeeding.SeedDefaultData(builder);

            builder.Entity<IdentityUserRole<Guid>>()
            .HasKey(r => new { r.UserId, r.RoleId });

           //builder.Entity<ApplicationUserRole>()
           //.HasOne<ApplicationRole>()
           //.WithMany() // ApplicationRole has many Users
           //.HasForeignKey(ur => ur.RoleId)
           //.HasPrincipalKey(r => r.Id);

            builder.Entity<IdentityRoleClaim<Guid>>()
            .HasOne<IdentityRole<Guid>>()
            .WithMany()
            .HasForeignKey(rc => rc.RoleId)
            .HasPrincipalKey(r => r.Id);

            builder.Entity<MasterUser>(entity =>
            {
                entity.ToTable("masterusers");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();
                entity.Property(e => e.UserId).HasColumnName("user_id");
                entity.Property(e => e.Username).HasColumnName("username").IsRequired(false).HasMaxLength(100);
                entity.Property(e => e.FirstName).HasColumnName("firstname").IsRequired(false).HasMaxLength(100);
                entity.Property(e => e.LastName).HasColumnName("lastname").IsRequired(false).HasMaxLength(100);
                entity.Property(e => e.Industry).HasColumnName("industry").IsRequired(false).HasMaxLength(100);
                entity.Property(e => e.JobTitle).HasColumnName("jobtitle").IsRequired(false).HasMaxLength(100);
                entity.Property(e => e.Phonenumber).HasColumnName("phonenumber").IsRequired(false).HasMaxLength(100);
                entity.Property(e => e.ProfileImage).HasColumnName("profileimage").IsRequired(false).HasMaxLength(100);
                entity.Property(e => e.Credits).HasColumnName("credits").IsRequired().HasMaxLength(100);
                entity.Property(e => e.Notification).HasColumnName("notification").IsRequired(false);
                entity.Property(e => e.Email).HasColumnName("email").IsRequired().HasMaxLength(100);
                entity.Property(e => e.PasswordHash).HasColumnName("password_hash").IsRequired().HasMaxLength(255);
                entity.Property(e => e.Role).HasColumnName("role").IsRequired().HasMaxLength(50);
                entity.Property(e => e.TenantId).HasColumnName("tenant_id");
                entity.Property(e => e.CreatedAt).HasColumnName("created_at").HasDefaultValueSql("now()");
                entity.Property(e => e.UpdatedAt).HasColumnName("updated_at").HasDefaultValueSql("now()");
                // Map the CreatedBy and UpdatedBy columns
                entity.Property(e => e.CreatedBy).HasColumnName("created_by").IsRequired(false); // Make it nullable if needed
                entity.Property(e => e.UpdatedBy).HasColumnName("last_updated_by").IsRequired(false); // Make it nullable if needed
                entity.HasIndex(e => e.Email).IsUnique().HasDatabaseName("masterusers_email_key");
                entity.HasIndex(e => e.Username).IsUnique().HasDatabaseName("masterusers_username_key");

                entity.Ignore(e => e.UserName);
            });

            builder.Entity<IndustryType>(entity =>
            {
                entity.ToTable("industrytypes");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();
                entity.Property(e => e.IndustryName).HasColumnName("industry_name").IsRequired().HasMaxLength(100);
            });

            builder.Entity<JobTitle>(entity =>
            {
                entity.ToTable("jobtitle");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();
                entity.Property(e => e.JobName).HasColumnName("job_name").IsRequired().HasMaxLength(100);
            });

            const string priceDecimalType = "decimal(18,2)";
            builder.Entity<ApplicationUser>(a =>
            {
                a.HasOne(a => a.Company).WithMany(c => c.ApplicationUsers).HasForeignKey(a => a.CompanyId).OnDelete(DeleteBehavior.Cascade);
                a.HasMany(u => u.Claims).WithOne().HasForeignKey(c => c.UserId).IsRequired().OnDelete(DeleteBehavior.Cascade);
                a.HasMany(u => u.Roles).WithOne().HasForeignKey(r => r.UserId).IsRequired().OnDelete(DeleteBehavior.Cascade);
            });
            builder.Entity<ApplicationRole>().HasMany(r => r.Claims).WithOne().HasForeignKey(c => c.RoleId).IsRequired().OnDelete(DeleteBehavior.Cascade);
            builder.Entity<ApplicationRole>().HasMany(r => r.Users).WithOne().HasForeignKey(r => r.RoleId).IsRequired().OnDelete(DeleteBehavior.Cascade);
            builder.Entity<InvoiceModel>(q =>
            {
                //q.HasMany(c => c.servicesInInvoices).WithOne(c => c.Invoice).HasForeignKey(x => x.InvoiceId).OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<ContactsMasterTable>(cs =>
            {
                cs.HasIndex(c => c.AccountId);
                cs.HasOne(c => c.Account).WithMany(c => c.Contacts)
                .HasForeignKey(c => c.AccountId)
                .OnDelete(DeleteBehavior.Cascade);
                cs.HasOne(c => c.Company).WithMany().HasForeignKey(c => c.CompanyID).OnDelete(DeleteBehavior.Cascade);
            });
            builder.Entity<Company>(c =>
            {
                c.HasIndex(c => c.CountryId);
                c.HasIndex(c => c.BusinessTypeId);
                c.HasIndex(c => c.IndustryTypeId);
                c.HasIndex(c => c.SubScriptionPlanId);
                c.HasIndex(c => c.PaymentId);
            });
        }

        public override int SaveChanges()
        {
            UpdateAuditEntities();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            UpdateAuditEntities();
            return base.SaveChangesAsync(cancellationToken);
        }

        private void UpdateAuditEntities()
        {
            var modifiedEntries = ChangeTracker.Entries()
                .Where(x => x.Entity is IAuditableEntity && (x.State == EntityState.Added || x.State == EntityState.Modified));
            foreach (var entry in modifiedEntries)
            {
                var entity = (IAuditableEntity)entry.Entity;
                DateTime now = DateTime.UtcNow;
                if (entry.State == EntityState.Added)
                {
                    entity.CreatedAt = now;
                    entity.CreatedBy ??= CurrentUserId;
                }
                else
                {
                    base.Entry(entity).Property(x => x.CreatedBy).IsModified = false;
                    base.Entry(entity).Property(x => x.CreatedAt).IsModified = false;
                }
                entity.UpdatedAt = now;
                entity.UpdatedBy ??= CurrentUserId;
            }
        }
    }
}