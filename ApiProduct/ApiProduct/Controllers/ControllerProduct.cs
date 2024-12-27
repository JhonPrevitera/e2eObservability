using ApiProduct.Models;
using ApiProduct.Service.Interface;
using Microsoft.AspNetCore.Mvc;

namespace ApiProduct.Controllers;

public class ControllerProduct(ILogger<ControllerProduct> logger, IServiceProduct serviceProduct) : ControllerBase
{
    
    [HttpGet("/api/[controller]/produto")]
    public Task<String> GetProduct()
    {
        try
        {
            return Task.FromResult("Produto 6");
        }
        catch (Exception e)
        {
            logger.LogError(e.Message);
            return Task.FromResult(e.Message);
        }
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var product = await serviceProduct.GetProductById(id);
        if (product == null) return NotFound();
        return Ok(product);
    }

    [HttpGet("sku/{sku}")]
    public async Task<IActionResult> GetBySku(string sku)
    {
        var product = await serviceProduct.GetProductBySku(sku);
        if (product == null) return NotFound();
        return Ok(product);
    }

    [HttpPost("/api/[controller]/produto")]
    public async Task<IActionResult> Create([FromBody] Products product)
    {
        await serviceProduct.CreateProduct(product);
        return StatusCode(201, product);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] Products product)
    {
        await serviceProduct.UpdateProductAsync(id, product);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await serviceProduct.DeleteProductAsync(id);
        return NoContent();
    }
}