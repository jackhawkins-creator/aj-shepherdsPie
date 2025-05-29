using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using ShepherdsPies.Models;
using Microsoft.AspNetCore.Identity;

namespace ShepherdsPies.Data;

public class ShepherdsPiesDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;

    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Employee> Employees { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Pizza> Pizzas { get; set; }
    public DbSet<PizzaTopping> PizzaToppings { get; set; }
    public DbSet<Topping> Toppings { get; set; }
    public DbSet<Sauce> Sauces { get; set; }
    public DbSet<Size> Sizes { get; set; }
    public DbSet<Cheese> Cheeses { get; set; }

    public ShepherdsPiesDbContext(DbContextOptions<ShepherdsPiesDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed Identity User
        string adminId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f";
        var adminUser = new IdentityUser
        {
            Id = adminId,
            UserName = "admin@shepherdspies.com",
            NormalizedUserName = "ADMIN@SHEPHERDSPIES.COM",
            Email = "admin@shepherdspies.com",
            NormalizedEmail = "ADMIN@SHEPHERDSPIES.COM",
            EmailConfirmed = true,
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, "Admin123!")
        };
        modelBuilder.Entity<IdentityUser>().HasData(adminUser);

        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = adminId,
            FirstName = "Admina",
            LastName = "Strator",
            Address = "101 Main Street",
        });

        modelBuilder.Entity<Employee>().HasData(
            new Employee { Id = 1, Name = "John Doe", Email = "john@sp.com", Password = "pass123" },
            new Employee { Id = 2, Name = "Jane Smith", Email = "jane@sp.com", Password = "pass456" }
        );

        modelBuilder.Entity<Order>().HasData(
            new Order
            {
                Id = 1,
                CreatedAt = DateTime.UtcNow,
                Tip = 5.00m,
                OrderTakerId = 1,
                DelivererId = 2,
                TableNum = 3,
                IsDelivered = false
            }
        );

        modelBuilder.Entity<Size>().HasData(
            new Size { Id = 1, Name = "Small" },
            new Size { Id = 2, Name = "Medium" },
            new Size { Id = 3, Name = "Large" }
        );

        modelBuilder.Entity<Cheese>().HasData(
            new Cheese { Id = 1, Name = "Mozzarella" },
            new Cheese { Id = 2, Name = "Cheddar" }
        );

        modelBuilder.Entity<Sauce>().HasData(
            new Sauce { Id = 1, Name = "Tomato" },
            new Sauce { Id = 2, Name = "Alfredo" }
        );

        modelBuilder.Entity<Topping>().HasData(
            new Topping { Id = 1, Name = "Pepperoni", Price = 1.25m },
            new Topping { Id = 2, Name = "Mushrooms", Price = 1.00m }
        );

        modelBuilder.Entity<Pizza>().HasData(
            new Pizza { Id = 1, OrderId = 1, SizeId = 2, CheeseId = 1, SauceId = 1 }
        );

        modelBuilder.Entity<PizzaTopping>().HasData(
            new PizzaTopping { Id = 1, PizzaId = 1, ToppingId = 1 },
            new PizzaTopping { Id = 2, PizzaId = 1, ToppingId = 2 }
        );
    }
}