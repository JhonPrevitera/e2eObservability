using ApiProduct.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiProduct.Data
{
	public class ProductDbContext : DbContext
	{
		public ProductDbContext(DbContextOptions<ProductDbContext> options) : base(options) { }
		public DbSet<Products> Products { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<Products>(entity =>
			{
				entity.HasKey(e => e.Id);

				entity.Property(e => e.Name)
					.IsRequired()
					.HasMaxLength(100);

				entity.Property(e => e.Sku)
					.IsRequired()
					.HasMaxLength(50);

				entity.Property(e => e.Price)
					.HasColumnType("decimal(18, 2)"); // Especifica precisão e escala para acomodar valores de decimal

				entity.Property(e => e.CreatedAt);

				entity.Property(e => e.IsActive);

				entity.HasIndex(e => e.Sku).IsUnique();
			});
		}
	}
}