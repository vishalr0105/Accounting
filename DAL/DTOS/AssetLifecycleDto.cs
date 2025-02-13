using System;

namespace DAL.DTOS
{
    public class AssetLifecycleDto
    {
        public Guid AssetId { get; set; }
        public string? AssetName { get; set; }
        public Guid ServiceId { get; set; }
        public string? ServiceName { get; set; }
        public string? AssetStage { get; set; }
    }
}
