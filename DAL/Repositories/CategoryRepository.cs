using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        public CategoryRepository(DbContext context) : base(context)
        { }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

        public void AddCategory(Category category)
        {
            category.CreatedAt = DateTime.UtcNow;
            _appContext.Add(category);
        }

        public IEnumerable<Category> GetAllCategoryData(Guid? categoryid)
        {
            return _appContext.Category.Where(c=>c.CompanyId==categoryid).OrderBy(c=>c.CategoryName).ToList();

        }

        public Category GetCategoryById(Guid id)
        {
            return _appContext.Category.Where(x => x.Id == id)
                    .FirstOrDefault();
        }

        public void UpdateCategory(Category category)
        {
            _appContext.Update(category);
        }

        public void DeleteCategory(Guid id)
        {
            var category = _appContext.Category.Where(x => x.Id == id).FirstOrDefault();
            _appContext.Category.Remove(category);
        }

        public bool IsCategoryNameExist(string categoryName,Guid companyid)
        {
            return _appContext.Category.Any(c => 
            c.CategoryName.ToLower() == categoryName.ToLower()
            && c.CompanyId==companyid
            );
        }
    }
}
