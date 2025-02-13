using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Workday : BaseEntity
    {
        public DateTime Fulldate { get; set; }
        public Guid YearId { get; set; }
        public Guid DayofWeekId { get; set; }
        public Guid MonthNameId { get; set; }
    }
}
