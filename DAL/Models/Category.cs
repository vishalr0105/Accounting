using System;

namespace DAL.Models
{
    public class Category : BaseEntity
    {
        public Guid Id { get; set; }
        public string CategoryName { get; set; }
        public string Discription { get; set; }
        //public IList<JobAndJobCategories> JobAndJobCategories { get; set; }
        public string Description { get; set; }
        public Guid? CompanyId { get; set; }


    }
}
