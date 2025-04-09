using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories
{
    public class CustomerRepository : Repository<Customer>, ICustomerRepository
    {
        private readonly ApplicationDbContext _appContext;

        public CustomerRepository(DbContext context) : base(context)
        {
            _appContext = (ApplicationDbContext)context;
        }

        public async Task<List<Customer>> GetCustomers(int pageSize, int currentPage)
        {
            var res = await _appContext.customer.Skip((currentPage - 1) * pageSize).Take(pageSize).ToListAsync();
            return res;
        }

        public async Task<int> GetTotalCustomerCount()
        {
            return await _appContext.customer.CountAsync();
        }

        public async Task<Customer> CreateCustomer(Customer cust)
        {
            var res = await _appContext.customer.AddAsync(cust);
            await _appContext.SaveChangesAsync();
            return res.Entity;
        }

        public async Task<bool> UpdateCustomer(Customer cust)
        {
            var existingCustomer = await _appContext.customer.FindAsync(cust.Id);

            if (existingCustomer == null)
            {
                return false;
            }

            _appContext.Entry(existingCustomer).CurrentValues.SetValues(cust);
            await _appContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteCustomer(Guid custId)
        {
            var customer = await _appContext.customer.FindAsync(custId);

            if (customer == null)
            {
                return false;
            }

            _appContext.customer.Remove(customer);
            await _appContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> InActiveCustomer(Guid custId)
        {
            var customer = await _appContext.customer.FindAsync(custId);

            if (customer == null)
            {
                return false; // Customer not found
            }

            customer.Deleted = false; // Set isActive to false
            await _appContext.SaveChangesAsync();

            return true;
        }

        public async Task<List<Customer>> SearchCustomer(string searchterm)
        {
            var res = await _appContext.customer.Where(c => c.FirstName.ToLower().Contains(searchterm)
                                                        || c.LastName.ToLower().Contains(searchterm)
                                                        || c.Email.ToLower().Contains(searchterm))
                                                .ToListAsync();
            return res;
        }

        public async Task<Customer> GetCustomerById(Guid custId)
        {
            var customer = await _appContext.customer.FindAsync(custId);
            return customer;
        }

        public async Task<List<Customer>> GetCustomersByIds(List<Guid> customerIds)
        {
            return await _appContext.customer.Where(c => customerIds.Contains(c.Id)).ToListAsync();
        }

        public async Task<List<CustomerListItem>> CustomerList(int pageSize, int currentPage)
        {
            var res = await _appContext.customer.Skip((currentPage - 1) * pageSize).Take(pageSize)
                                .Select(c => new CustomerListItem
                                {
                                    Id = c.Id,
                                    No = c.No,
                                    Title = c.Title,
                                    FirstName = c.FirstName,
                                    MiddleName = c.MiddleName,
                                    LastName = c.LastName,
                                    Email = c.Email
                                }).ToListAsync();
            return res;
        }
    }
}
