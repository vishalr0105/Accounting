using DAL.Models;
using System;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface ICategoryRepository
    {
        void AddCategory(Category category);
        IEnumerable<Category> GetAllCategoryData(Guid? categoryid);
        Category GetCategoryById(Guid id);
        void UpdateCategory(Category category);
        void DeleteCategory(Guid id);
        bool IsCategoryNameExist(string categoryName, Guid companyid);
        //IEnumerable<GetCategoryListWithCount> GetAllCategoryWithCount(Guid? id);
    }
}
