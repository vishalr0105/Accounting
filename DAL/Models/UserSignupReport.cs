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
