using System;

namespace DAL.Models
{
    public class Pagination
    {
        public int? TotalPages { get; set; }
        public int? TotalItems { get; set; }
        public int? PageSize { get; set; }
        public bool? IsFirstPage { get; set; }
        public bool? IsLastPage { get; set; }
        public int? CurrentPage { get; set; }
    }

    public class SalesData
    {
        public string Id { get; set; }
        //public string Name { get; set; }
        public decimal Amount { get; set; }
        public string? Type { get; set; }
        public string? Customer { get; set; }
        public DateTime Date { get; set; }
    }
}
