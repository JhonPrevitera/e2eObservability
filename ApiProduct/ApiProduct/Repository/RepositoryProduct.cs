using ApiProduct.Data;
using ApiProduct.Models;
using ApiProduct.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace ApiProduct.Repository;

public class RepositoryProduct(ProductDbContext context)
	: IRepositoryProduct
{
	private readonly ProductDbContext _context = context;

	public async Task<IEnumerable<Products>> GetAllAsync() {
		return await _context.Products.AsNoTracking()
			.ToListAsync();
	}

	public async Task<Products?> GetByIdAsync(Guid id)
	{ 
		return await _context.Products.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
	}

	public async Task<Products?> GetBySkuAsync(string sku)
	{
		return await _context.Products.AsNoTracking().FirstOrDefaultAsync(p => p.Sku == sku);
	}

	public async Task Add(Products product)
	{
		_context.Products.Add(product);
		await _context.SaveChangesAsync();
	}

	public async Task Update(Products product)
	{
		_context.Products.Update(product);
		await _context.SaveChangesAsync();
	}

	public async Task Delete(Products product)
	{
		_context.Products.Remove(product);
		await _context.SaveChangesAsync();
	}
	
}