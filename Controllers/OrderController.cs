using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using ShepherdsPies.Data;
using ShepherdsPies.Models;

namespace ShepherdsPies.Controllers;

[ApiController]
[Route("api/[controller]")]

public class OrderController : ControllerBase
{
    private ShepherdsPiesDbContext _dbContext;

    public OrderController(ShepherdsPiesDbContext context)
    {
        _dbContext = context;
    }

    //GET all Orders
    [HttpGet]
    [Authorize]
    public IActionResult GetAllOrders()
    {
        return Ok(_dbContext.Orders.Include(o => o.OrderTaker)
        .Include(o => o.Deliverer)
        .Include(o => o.Pizzas)
            .ThenInclude(p => p.PizzaToppings)
            .ThenInclude(tp => tp.Topping)
        .OrderByDescending(o => o.CreatedAt).ToList());
    }

    //GET single Order
    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetOrderById(int id)
    {
        return Ok(_dbContext.Orders.Include(o => o.OrderTaker)
        .Include(o => o.Deliverer)
        .Include(o => o.Pizzas)
            .ThenInclude(p => p.PizzaToppings)
                .ThenInclude(pt => pt.Topping)
        .Include(o => o.Pizzas)
            .ThenInclude(p => p.Size)
        .Include(o => o.Pizzas)
            .ThenInclude(p => p.Cheese)
        .Include(o => o.Pizzas)
            .ThenInclude(p => p.Sauce)
        .FirstOrDefault(o => o.Id == id));
    }

    //DELETE single Order
    [HttpDelete("{id}")]
    [Authorize]
    public IActionResult DeleteOrder(int id)
    {
        Order order = _dbContext.Orders.SingleOrDefault(o => o.Id == id);

        if (order == null)
        {
            return NotFound();
        }

        _dbContext.Orders.Remove(order);
        _dbContext.SaveChanges();

        return NoContent();
    }
}