using DAL.Models;
using DAL;
using Microsoft.EntityFrameworkCore;
using DAL.Filters;
using AppPermissions = DAL.Core.ApplicationPermissions;
using Microsoft.AspNetCore.Identity;
using System.Net;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using DAL.Core;
using WFM.Authorization;
using Microsoft.AspNetCore.Authorization;
using WFM.Helpers;
using WFM;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.HttpOverrides;
using Serilog;
using Serilog.Events;
using Microsoft.Extensions.FileProviders;
using DAL.Repositories.Interfaces;
using DAL.Repositories;
using DAL.DTOS;

try
{
    Log.Information("Application starting up");
    Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning)
    .Enrich.FromLogContext()
    .WriteTo.File("logs/Agent.txt", rollingInterval: RollingInterval.Day, retainedFileCountLimit: null)
    .CreateLogger();

    var builder = WebApplication.CreateBuilder(args);

    // Add services to the container.

    builder.Services.AddControllersWithViews();
    builder.Services.AddHttpClient();
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
                   options.UseNpgsql(
                       builder.Configuration["ConnectionStrings:DefaultConnection"],
                       b => b.MigrationsAssembly("WFM")).EnableSensitiveDataLogging(true))
        ;
    builder.Services.AddIdentity<MasterUser, ApplicationRole>(options =>
    {
        options.SignIn.RequireConfirmedAccount = true;
    })
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

    builder.Services.Configure<ForwardedHeadersOptions>(options =>
    {
        options.KnownProxies.Add(IPAddress.Parse("192.168.0.246"));
    });
    builder.Services.AddSingleton<IConfiguration>(builder.Configuration);
    builder.Services.AddScoped<AuditLogFilter>();
    builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

    // Configure Identity options and password complexity here
    builder.Services.Configure<IdentityOptions>(options =>
    {
        options.User.RequireUniqueEmail = true;
    });
    builder.Services.AddAuthentication(opt =>
    {
        opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
                 .AddJwtBearer(options =>
                 {
                     options.TokenValidationParameters = new TokenValidationParameters
                     {
                         ValidateIssuer = true,
                         ValidateAudience = true,
                         ValidateLifetime = true,
                         ValidateIssuerSigningKey = true,
                         ValidIssuer = builder.Configuration["Jwt:Issuer"],
                         ValidAudience = builder.Configuration["Jwt:Issuer"],
                         IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
                         ClockSkew = TimeSpan.Zero
                     };
                 });
    builder.Services.AddAuthorization(options =>
    {
        options.AddPolicy(WFM.Authorization.Policies.ViewAllUsersPolicy, policy => policy.RequireClaim(ClaimConstants.Permission, AppPermissions.ViewUsers));
        options.AddPolicy(WFM.Authorization.Policies.ManageAllUsersPolicy, policy => policy.RequireClaim(ClaimConstants.Permission, AppPermissions.ManageUsers));
        options.AddPolicy(WFM.Authorization.Policies.ViewAllRolesPolicy, policy => policy.RequireClaim(ClaimConstants.Permission, AppPermissions.ViewRoles));
        options.AddPolicy(WFM.Authorization.Policies.ViewRoleByRoleNamePolicy, policy => policy.Requirements.Add(new ViewRoleAuthorizationRequirement()));
        options.AddPolicy(WFM.Authorization.Policies.ManageAllRolesPolicy, policy => policy.RequireClaim(ClaimConstants.Permission, AppPermissions.ManageRoles));
        options.AddPolicy(WFM.Authorization.Policies.ViewDocumentsPolicy, policy => policy.RequireClaim(ClaimConstants.Permission, AppPermissions.ViewDocument));
        options.AddPolicy(WFM.Authorization.Policies.ManageAssetsPolicy, policy => policy.RequireClaim(ClaimConstants.Permission, AppPermissions.ManageAssets));
        options.AddPolicy(WFM.Authorization.Policies.ManageClientAndSuppliers, policy => policy.RequireClaim(ClaimConstants.Permission, AppPermissions.ManageClientAndSuppliers));
        options.AddPolicy(WFM.Authorization.Policies.ManageReminderPolicy, policy => policy.RequireClaim(ClaimConstants.Permission, AppPermissions.ManageReminder));
        options.AddPolicy(WFM.Authorization.Policies.ManageInventoryPolicy, policy => policy.RequireClaim(ClaimConstants.Permission, AppPermissions.ManageInventory));
        options.AddPolicy(WFM.Authorization.Policies.ViewDashboard, policy => policy.RequireClaim(ClaimConstants.Permission, AppPermissions.ViewDashBoard));
        options.AddPolicy(WFM.Authorization.Policies.AssignAllowedRolesPolicy, policy => policy.Requirements.Add(new AssignRolesAuthorizationRequirement()));
    });


    // Add cors
    builder.Services.AddCors(opt => opt.AddPolicy("CorsPolicy", c =>
    {
        c.AllowAnyOrigin()
           .AllowAnyHeader()
           .AllowAnyMethod();
    }));
    builder.Services.AddSignalR();

    builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = IdentityServerConfig.ApiFriendlyName, Version = "v1" });
        var securityScheme = new OpenApiSecurityScheme()
        {
            Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT" // Optional
        };

        var securityRequirement = new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "bearerAuth"
                            }
                        },
                        new string[] {}
                    }
                };

        c.AddSecurityDefinition("bearerAuth", securityScheme);
        c.AddSecurityRequirement(securityRequirement);

        c.OperationFilter<AuthorizeCheckOperationFilter>();
        c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
        {
            Type = SecuritySchemeType.OAuth2,
            Flows = new OpenApiOAuthFlows
            {
                Password = new OpenApiOAuthFlow
                {
                    TokenUrl = new Uri("/connect/token", UriKind.Relative),
                    Scopes = new Dictionary<string, string>()
                            {
                                { IdentityServerConfig.ApiName, IdentityServerConfig.ApiFriendlyName }
                            }
                }
            }
        });
    });

    builder.Services.AddScoped<AuditLogFilter>();
    builder.Services.AddAutoMapper(typeof(Program));
    builder.Services.Configure<AppSettings>(builder.Configuration);
    builder.Services.AddScoped<IEmailSender, EmailSender>();
    builder.Services.AddScoped<IUnitOfWork, HttpUnitOfWork>();
    builder.Services.AddSession();
    // Auth Handlers
    builder.Services.AddSingleton<IAuthorizationHandler, ViewUserAuthorizationHandler>();
    builder.Services.AddSingleton<IAuthorizationHandler, ManageUserAuthorizationHandler>();
    builder.Services.AddSingleton<IAuthorizationHandler, ViewRoleAuthorizationHandler>();
    builder.Services.AddSingleton<IAuthorizationHandler, AssignRolesAuthorizationHandler>();

    // DB Creation and Seeding
    var app = builder.Build();

    // Configure the HTTP request pipeline.
    if (!app.Environment.IsDevelopment())
    {
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
    }

    AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    app.UseForwardedHeaders(new ForwardedHeadersOptions
    {
        ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto,
        ForwardLimit = 2 // Limit the number of forwarded headers (according the requirement)
                         // (by using this we can prevent Bad Request 400 Too long headers
    });

    app.Use((context, next) =>
    {
        context.Request.Scheme = "https";
        return next();
    });

    app.UseHttpsRedirection();
    app.UseSession();
    app.UseStaticFiles();
    if (!Directory.Exists(Path.Combine(Directory.GetCurrentDirectory(), "Uploads")))
    {
        Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), "Uploads"));
    }
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Uploads")),
        RequestPath = "/Uploads"
    }); ;
    app.UseAuthentication();
    app.UseRouting();
    app.UseCors("CorsPolicy");

    app.UseSwagger();
    app.UseSwaggerUI(x =>
    {
        x.SwaggerEndpoint("/swagger/v1/swagger.json", "v1 doc");

    });
    app.UseAuthorization();
    app.UseEndpoints(routes =>
    {
    });
    app.MapControllerRoute(
        name: "default",
        pattern: "{z}/{action=Index}/{id?}");

    app.MapFallbackToFile("index.html"); ;

    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application start-up failed");
    throw;
}
