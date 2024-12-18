using ApiProduct.Models;

namespace ApiProduct.Service.Interface;

public interface IServiceProduct
{
	Task<IEnumerable<Products>> GetAllProducts();
	Task<Products?> GetProductById(Guid id);
	Task<Products?> GetProductBySku(string sku); 
	Task CreateProduct(Products product);
	Task UpdateProductAsync(Guid id, Products updatedProduct);
	Task DeleteProductAsync(Guid id);
}