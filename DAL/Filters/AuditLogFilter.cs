using Microsoft.AspNetCore.Mvc.Filters;

namespace DAL.Filters
{
    public class AuditLogFilter : ActionFilterAttribute
    {
        public AuditLogFilter()
        {

        }
        public override async void OnActionExecuting(ActionExecutingContext filterContext)
        {

        }
    }
}
