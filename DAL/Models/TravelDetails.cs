using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class TravelDetails : BaseEntity
    {
        public Guid? TechnicianId { get; set; }
        public Guid? CompanyId { get; set; }
        public DateTime StartDate { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string StartLocation { get; set; }
        public string EndLocation { get; set; }
        public string Note { get; set; }
        public Guid WoId { get; set; }
        public double DistanceKms { get; set; }
    }
}
