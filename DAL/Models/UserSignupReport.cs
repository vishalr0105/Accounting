using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class UserSignupReport
    {
        public int ThisMonthSignUps { get; set; }
        public int LastMonthSignUps { get; set; }
        public int TodaySignUps { get; set; }
        public int YesterdaySignUps { get; set; }
    }
}
