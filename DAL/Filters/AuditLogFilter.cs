using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
