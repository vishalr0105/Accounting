using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class CreateOrderRequest
    {
        public string DataProduct { get; set; }
        public string DisplayName { get; set; }
        public List<string> Tags { get; set; } = new List<string>();
        public Dictionary<string, object> Params { get; set; } = new Dictionary<string, object>();
        public FeatureCollectionReq FeatureCollection { get; set; }
    }

    public class FeatureCollectionReq
    {
        public string Type { get; set; }
        public List<FeatureReq> Features { get; set; } = new List<FeatureReq>();
    }

    public class FeatureReq
    {
        public string Type { get; set; }
        public FeatureProperties Properties { get; set; }
    }

    public class FeatureProperties
    {
        public string Id { get; set; }
    }

    public class OrderApiResponse
    {
        public List<Result> Results { get; set; } = new List<Result>();
        public List<Error> Errors { get; set; } = new List<Error>();
    }

    public class Result
    {
        public int Index { get; set; }
        public string Id { get; set; }
    }

    public class Error
    {
        public int Index { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }
    }
}
