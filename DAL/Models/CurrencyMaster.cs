using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class CurrencyMaster
    {
        [Key]
        public int Id { get; set; }
        public string Currency { get; set; }
        public string SymbolIcon { get; set; }
        public bool IsEnable { get; set; }
    }
}
