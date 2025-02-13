namespace DAL.CustomerPortal
{
    public class CustomerQuoteDto
    {
        public int QuoteNo { get; set; }
        public string CompanyName { get; set; }
        public string AccountName { get; set; }
        public double MaterialCost { get; set; }
        public double MaterialDisc { get; set; }
        public double ServiceCost { get; set; }
        public double ServiceDisc { get; set; }
        public double PartsCost { get; set; }
        public double PartsDisc { get; set; }
        public double TaxAmount { get; set; }
        public double QuoteValue { get; set; }
        public double LogisticCost { get; set; }
        public string CreatedOn { get; set; }
        public string ValidTillDays { get; set; }
        public string Status { get; set; }
    }
}
