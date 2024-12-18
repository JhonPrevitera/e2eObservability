namespace ApiProduct.Models;

public class Products
{

    public Guid Id { get; set; }

    public string Name { get; set; }

    public string Sku { get; set; }
    
    public string Description { get; set; }

    public decimal Price { get; set; }

    public int StockQuantity { get; set; }

    public string Category { get; set; }
    
    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public bool IsActive { get; set; }
    
}