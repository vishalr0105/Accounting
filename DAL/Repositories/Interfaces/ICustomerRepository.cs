using DAL.Models;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface ICustomerRepository : IRepository<Customer>
    {
        Task<List<Customer>> GetCustomers(int pageSize, int currentPage);
        Task<List<CustomerListItem>> CustomerList(int pageSize, int currentPage);
        Task<Customer> GetCustomerById(Guid custId);
        Task<List<Customer>> GetCustomersByIds(List<Guid> customerIds);
        Task<Customer> CreateCustomer(Customer cust);
        Task<bool> UpdateCustomer(Customer cust);
        Task<bool> DeleteCustomer(Guid custId);
        Task<bool> InActiveCustomer(Guid custId);
        Task<List<Customer>> SearchCustomer(string searchterm);
        Task<int> GetTotalCustomerCount();
    }
}
