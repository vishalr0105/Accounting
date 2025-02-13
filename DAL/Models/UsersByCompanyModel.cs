using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class UsersByCompanyModel
    {
        public Guid Id { get; set; }
        public string Status { get; set; }
        public string Designation { get; set; }
        public string UserRole { get; set; }
        public string EmailID { get; set; }
        public string Image { get; set; }
        public string FullName { get; set; }
        public DateTime? JoiningDate { get; set; }
        public int NewMsgsCount { get; set; }
        public string SocketId { get; set; }
        public string LastMsg { get; set; }
        public string LastMsgTime { get; set; }
    }
}