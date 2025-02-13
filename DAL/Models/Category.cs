using System;
using System.Collections.Generic;

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

    public class GetCategoryListWithCount
    {
        public Guid Id { get; set; }
        public string CategoryName { get; set; }
        public string Discription { get; set; }
        public Guid? CompanyId { get; set; }
        public int SubCategoryCount { get; set; }
        public int JobDefinationCount { get; set; }
    }
}
