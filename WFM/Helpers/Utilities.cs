// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

using System.Security.Claims;

namespace WFM.Helpers
{
    public static class Utilities
    {
        static ILoggerFactory _loggerFactory;
        public static void ConfigureLogger(ILoggerFactory loggerFactory)
        {
            _loggerFactory = loggerFactory;

        }

        public static ILogger CreateLogger<T>()
        {
            //Usage: Utilities.CreateLogger<SomeClass>().LogError(LoggingEvents.SomeEventId, ex, "An error occurred because of xyz");

            if (_loggerFactory == null)
            {
                throw new InvalidOperationException($"{nameof(ILogger)} is not configured. {nameof(ConfigureLogger)} must be called before use");
                //_loggerFactory = new LoggerFactory().AddConsole().AddDebug();
            }

            return _loggerFactory.CreateLogger<T>();
        }

        public static string GetUserId(ClaimsPrincipal user)
        {
            if (user.Claims.Any(x => x.Type == "userId"))
            {
                return user.Claims.FirstOrDefault(x => x.Type == "userId").Value;
            }
            else
            {
                return "";
            }
        }

        public static string GetUserType(ClaimsPrincipal user)
        {
            if (user.Claims.Any(x => x.Type == "usertype"))
            {
                var type = user.Claims.FirstOrDefault(x => x.Type == "usertype").Value;
                return type;
            }
            else
            {
                return null;
            }
        }

        public static Guid? GetCompanyId(ClaimsPrincipal user)
        {
            if (user.Claims.Any(x => x.Type == "companyId"))
            {
                return Guid.TryParse(user.Claims.FirstOrDefault(x => x.Type == "companyId").Value, out Guid companyId) ? companyId : null;
            }
            else
            {
                return null;
            }
        }
    }
}
