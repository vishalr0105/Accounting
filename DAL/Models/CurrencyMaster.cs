using System.ComponentModel.DataAnnotations;

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
