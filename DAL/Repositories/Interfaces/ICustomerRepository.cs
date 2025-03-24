using DAL.Models;
using iTextSharp.text;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface ICustomerRepository:IRepository<Customer>
    {
        Task<List<Customer>> GetCustomers();
        Task<Customer> GetCustomerById(Guid custId);
        Task<Customer> CreateCustomer(Customer cust);
        Task<bool> UpdateCustomer(Customer cust);
        Task<bool> DeleteCustomer(Guid custId);
        Task<bool> InActiveCustomer(Guid custId);
        Task<List<Customer>> SearchCustomer(string searchterm);
    }
}
