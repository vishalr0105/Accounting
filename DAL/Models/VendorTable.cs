using System;

namespace DAL.Models
{
    public class VendorTable : BaseEntity
    {
        public Guid? CompanyID { get; set; }
        public string ActivityStatus { get; set; }
        public string Name { get; set; }
        public string ContactPerson { get; set; }
        public string EmailID { get; set; }
        public string PhoneNo { get; set; }
        public string Website { get; set; }
        public string Address { get; set; }
        public string serviceCity { get; set; }
        public string serviceState { get; set; }
        public string serviceCountry { get; set; }
        public string RegisterNumber { get; set; }
        public string ServiceAddressZipcodeId { get; set; }
    }
}

