using DAL.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IVendorRepository
    {
        Task<List<VendorTable>> getVendor(Guid? companyId);
        Task<VendorTable> AddVendor(VendorTable vehicle);
        void Delete(VendorTable contacts);
        VendorTable UpdateAccount(VendorTable accountTable);
    }
}
