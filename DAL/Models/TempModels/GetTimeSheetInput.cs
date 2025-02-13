using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models.TempModels
{
    public class GetTimeSheetInput
    {
        public DateTime? start {  get; set; }
        public DateTime? end {  get; set; }
    }
}
