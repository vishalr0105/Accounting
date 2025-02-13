using System;
using System.Collections.Generic;

namespace DAL.Models
{
    public class ItemAndItemSet:BaseEntity
	{
        public Guid ItemId { get; set; }
        public ItemSet ItemSet { get; set; }
        public Guid ItemSetId { get; set; }
        public int quantity { get; set; }
    }

    public class ItemNitemSetDto {
        public ItemSet ItemSetInfo { get; set; }
        public List<ItemsList> ItemsList { get; set; }
    }

    public class ItemsList {
        public Guid ItemId { get; set; }
        public int Quantity { get; set; }
    }


}
