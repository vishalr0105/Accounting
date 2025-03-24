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

        public async Task<List<Customer>> GetCustomers()
        {
            try
            {
                var res = await _appContext.customer.ToListAsync();
                return res;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Customer> CreateCustomer(Customer cust)
        {
            try
            {
                var res = await _appContext.customer.AddAsync(cust);
                await _appContext.SaveChangesAsync();
                return res.Entity;
            }
            catch (Exception ex)
            {
                throw;
            }
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
                return false; // Customer not found
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
    }
}
