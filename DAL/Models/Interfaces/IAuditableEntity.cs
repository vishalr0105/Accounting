// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

using System;

namespace DAL.Models.Interfaces
{
    public interface IAuditableEntity
    {
        string CreatedBy { get; set; }
        string UpdatedBy { get; set; }
        DateTime CreatedAt { get; set; }
        DateTime UpdatedAt { get; set; }
    }
}
