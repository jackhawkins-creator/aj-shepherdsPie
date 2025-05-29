using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using ShepherdsPies.Data;
using ShepherdsPies.Models;

namespace ShepherdsPies.Controllers;

[ApiController]
[Route("api/[controller]")]

public class PizzaController : ControllerBase
{
    private ShepherdsPiesDbContext _dbContext;

    public PizzaController(ShepherdsPiesDbContext context)
    {
        _dbContext = context;
    }

    //GET all toppings 
    [HttpGet("toppings")]
    //[Authorize]
    public IActionResult GetAllToppings()
    {
        return Ok(_dbContext.Toppings.ToList());
    }

    //GET single pizza by id expand with topping
    [HttpGet("{id}")]
    //[Authorize]
    public IActionResult GetPizzaById(int id)
    {
        return Ok(_dbContext.Pizzas.Include(p => p.Size)
        .Include(p => p.Sauce)
        .Include(p => p.Cheese)
        .Include(p => p.PizzaToppings)
            .ThenInclude(pt => pt.Topping)
        .FirstOrDefault(p => p.Id == id));
    }

    //DELETE single Pizza
    [HttpDelete("{id}")]
    //[Authorize]
    public IActionResult DeletePizza(int id)
    {
        Pizza pizza = _dbContext.Pizzas.SingleOrDefault(p => p.Id == id);

        if (pizza == null)
        {
            return NotFound();
        }

        _dbContext.Pizzas.Remove(pizza);
        _dbContext.SaveChanges();

        return NoContent();
    }
}