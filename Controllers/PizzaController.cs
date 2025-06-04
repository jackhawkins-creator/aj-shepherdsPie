using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using ShepherdsPies.Data;
using ShepherdsPies.Models;
using ShepherdsPies.Models.DTOs;

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
    [Authorize]
    public IActionResult GetAllToppings()
    {
        return Ok(_dbContext.Toppings.ToList());
    }

    //GET single pizza by id expand with topping
    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetPizzaById(int id)
    {
        return Ok(_dbContext.Pizzas.Include(p => p.Size)
        .Include(p => p.Sauce)
        .Include(p => p.Cheese)
        .Include(p => p.PizzaToppings)
            .ThenInclude(pt => pt.Topping)
        .FirstOrDefault(p => p.Id == id));
    }
    // POST add pizza to order
    [HttpPost]
    [Authorize]
    public IActionResult CreatePizza(Pizza pizza)
    {
        // Validate foreign key references
        Order order = _dbContext.Orders.FirstOrDefault(o => o.Id == pizza.OrderId);
        Size size = _dbContext.Sizes.FirstOrDefault(s => s.Id == pizza.SizeId);
        Cheese cheese = _dbContext.Cheeses.FirstOrDefault(c => c.Id == pizza.CheeseId);
        Sauce sauce = _dbContext.Sauces.FirstOrDefault(s => s.Id == pizza.SauceId);
        if (order == null || size == null || cheese == null || sauce == null)
        {
            return BadRequest("Invalid OrderId, SizeId, CheeseId, or SauceId.");
        }
        // Clear navigation properties to avoid EF tracking issues
        pizza.Sauce = null;
        pizza.Cheese = null;
        pizza.Size = null;
        if (pizza.PizzaToppings != null)
        {
            foreach (PizzaTopping topping in pizza.PizzaToppings)
            {
                Topping validTopping = _dbContext.Toppings.FirstOrDefault(t => t.Id == topping.ToppingId);
                if (validTopping == null)
                {
                    return BadRequest($"Invalid ToppingId: {topping.ToppingId}");
                }
                topping.Topping = null;
            }
        }
        _dbContext.Pizzas.Add(pizza);
        _dbContext.SaveChanges();
        return Created($"/api/pizza/{pizza.Id}", pizza);
    }

    //DELETE single Pizza
    [HttpDelete("{id}")]
    [Authorize]
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
    // PUT update pizza 
    [HttpPut("{id}")]
    [Authorize]
    public IActionResult UpdatePizza(int id, Pizza pizza)
    {
        Pizza existingPizza = _dbContext.Pizzas
               .Include(p => p.PizzaToppings)
               .FirstOrDefault(p => p.Id == id);

        existingPizza.OrderId = pizza.OrderId;
        existingPizza.SizeId = pizza.SizeId;
        existingPizza.CheeseId = pizza.CheeseId;
        existingPizza.SauceId = pizza.SauceId;

        _dbContext.PizzaToppings.RemoveRange(existingPizza.PizzaToppings);

        existingPizza.PizzaToppings = pizza.PizzaToppings.Select(pt => new PizzaTopping
        {
            PizzaId = id,
            ToppingId = pt.ToppingId
        }).ToList();

        _dbContext.SaveChanges();
        return NoContent();
    }

    //GET All Sauces
    [HttpGet("sauces")]
    [Authorize]
    public IActionResult GetAllSauces()
    {
        return Ok(_dbContext.Sauces.ToList());
    }


    //GET All Sizes
    [HttpGet("sizes")]
    [Authorize]
    public IActionResult GetAllSizes()
    {
        return Ok(_dbContext.Sizes.ToList());
    }

    //GET All Cheeses
    [HttpGet("cheeses")]
    [Authorize]
    public IActionResult GetAllCheeses()
    {
        return Ok(_dbContext.Cheeses.ToList());
    }
}