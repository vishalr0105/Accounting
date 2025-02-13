using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
	public class ItemSet:BaseEntity
	{
        public string nameOfSet { get; set; }
        public string itemCategory { get; set; }
        public string description { get; set; }
        public string status { get; set; }
        public bool returnable { get; set; }
        public string brandName { get; set; }
        public string vendorName { get; set; }
		public string image { get; set; }
    }

    public class ItemSetDto
    {
        public List<ItemNitemSetDto> items { get; set; }
    }

}
