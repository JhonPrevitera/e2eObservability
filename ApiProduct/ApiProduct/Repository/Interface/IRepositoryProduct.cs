using ApiProduct.Models;

namespace ApiProduct.Repository.Interface;

public interface IRepositoryProduct
{
    Task<IEnumerable<Products>> GetAllAsync();
    Task<Products?> GetByIdAsync(Guid id);
    Task<Products?> GetBySkuAsync(string sku);
    Task Add(Products product);
    Task Update(Products product);
    Task Delete(Products product);
}