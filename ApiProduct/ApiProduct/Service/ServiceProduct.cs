using System.ComponentModel.DataAnnotations;
using ApiProduct.Models;
using ApiProduct.Repository.Interface;
using ApiProduct.Service.Interface;

namespace ApiProduct.Service;

public class ServiceProduct(IRepositoryProduct repositoryProduct) : IServiceProduct
{
	public async Task<IEnumerable<Products>> GetAllProducts()
	{
		return await repositoryProduct.GetAllAsync();
	}

	public async Task<Products?> GetProductById(Guid id)
	{
		return await repositoryProduct.GetByIdAsync(id);
	}

	public async Task<Products?> GetProductBySku(string sku)
	{
		return await repositoryProduct.GetBySkuAsync(sku);
	}

	public async Task CreateProduct(Products product)
	{
		await repositoryProduct.Add(product);
	}

	public async Task UpdateProductAsync(Guid id, Products updatedProduct)
	{
		var existingProduct = await repositoryProduct.GetByIdAsync(id);
		if (existingProduct == null) throw new KeyNotFoundException("Product not found");

		existingProduct.Name = updatedProduct.Name;
		existingProduct.Description = updatedProduct.Description;
		existingProduct.Price = updatedProduct.Price;
		existingProduct.Sku = updatedProduct.Sku;
		existingProduct.StockQuantity = updatedProduct.StockQuantity;

		await repositoryProduct.Update(existingProduct);
		
	}

	public async Task DeleteProductAsync(Guid id)
	{
		var product = await repositoryProduct.GetByIdAsync(id);
		if (product == null) throw new KeyNotFoundException("Product not found");

		await repositoryProduct.Delete(product);
	}
}