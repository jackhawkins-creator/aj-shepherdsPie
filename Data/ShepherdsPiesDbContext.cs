using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using ShepherdsPies.Models;
using Microsoft.AspNetCore.Identity;

namespace ShepherdsPies.Data;

public class ShepherdsPiesDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;

    public DbSet<UserProfile> UserProfiles { get; set; }
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
        modelBuilder.Entity<IdentityUser>().HasData(adminUser,
            new IdentityUser
            {
                Id = "user-id-2",
                UserName = "tony@example.com",
                NormalizedUserName = "TONY@EXAMPLE.COM",
                Email = "tony@example.com",
                NormalizedEmail = "TONY@EXAMPLE.COM",
                EmailConfirmed = true,
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, "P@ssword1")
            },
            new IdentityUser
            {
                Id = "user-id-3",
                UserName = "lucia@example.com",
                NormalizedUserName = "LUCIA@EXAMPLE.COM",
                Email = "lucia@example.com",
                NormalizedEmail = "LUCIA@EXAMPLE.COM",
                EmailConfirmed = true,
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, "P@ssword1")
            },
            new IdentityUser
            {
                Id = "user-id-4",
                UserName = "gino@example.com",
                NormalizedUserName = "GINO@EXAMPLE.COM",
                Email = "gino@example.com",
                NormalizedEmail = "GINO@EXAMPLE.COM",
                EmailConfirmed = true,
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, "P@ssword1")
            },
            new IdentityUser
            {
                Id = "user-id-5",
                UserName = "sofia@example.com",
                NormalizedUserName = "SOFIA@EXAMPLE.COM",
                Email = "sofia@example.com",
                NormalizedEmail = "SOFIA@EXAMPLE.COM",
                EmailConfirmed = true,
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, "P@ssword1")
            }
        );

        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = adminId,
            FirstName = "Admina",
            LastName = "Strator",
            Address = "101 Main Street"
        },
    new UserProfile
    {
        Id = 2,
        IdentityUserId = "user-id-2",
        FirstName = "Tony",
        LastName = "Rigatoni",
        Address = "22 Pasta Lane"
    },
    new UserProfile
    {
        Id = 3,
        IdentityUserId = "user-id-3",
        FirstName = "Lucia",
        LastName = "Marinara",
        Address = "303 Olive Blvd"
    },
    new UserProfile
    {
        Id = 4,
        IdentityUserId = "user-id-4",
        FirstName = "Gino",
        LastName = "Calzone",
        Address = "44 Parmesan Ave"
    },
    new UserProfile
    {
        Id = 5,
        IdentityUserId = "user-id-5",
        FirstName = "Sofia",
        LastName = "Pizzetti",
        Address = "505 Mozzarella Dr"
    }
);


        modelBuilder.Entity<Order>().HasData(
    new Order
    {
        Id = 1,
        CreatedAt = DateTime.UtcNow, // Now
        Tip = 5.00m,
        OrderTakerId = 1,
        DelivererId = 1,
        TableNum = 3,
        IsDelivered = false
    },
    new Order
    {
        Id = 2,
        CreatedAt = DateTime.UtcNow.AddDays(-1), // Yesterday
        Tip = 3.00m,
        OrderTakerId = 2,
        DelivererId = 3,
        TableNum = 5,
        IsDelivered = true
    },
    new Order
    {
        Id = 3,
        CreatedAt = DateTime.UtcNow.AddDays(-3), // 3 days ago
        Tip = 7.50m,
        OrderTakerId = 1,
        DelivererId = 4,
        TableNum = 7,
        IsDelivered = true
    },
    new Order
    {
        Id = 4,
        CreatedAt = DateTime.UtcNow.AddDays(-10), // 10 days ago
        Tip = 4.25m,
        OrderTakerId = 3,
        DelivererId = 2,
        TableNum = 2,
        IsDelivered = false
    },
    new Order
    {
        Id = 5,
        CreatedAt = DateTime.UtcNow.AddDays(-30), // 1 month ago
        Tip = 6.00m,
        OrderTakerId = 4,
        DelivererId = 1,
        TableNum = 1,
        IsDelivered = true
    }
);


        modelBuilder.Entity<Size>().HasData(
            new Size { Id = 1, Name = "Small" },
            new Size { Id = 2, Name = "Medium" },
            new Size { Id = 3, Name = "Large" }
        );

        modelBuilder.Entity<Cheese>().HasData(
            new Cheese { Id = 1, Name = "Buffalo Mozzarella" },
            new Cheese { Id = 2, Name = "Four Cheese" },
            new Cheese { Id = 3, Name = "Vegan" },
            new Cheese { Id = 4, Name = "None" }
        );


        modelBuilder.Entity<Sauce>().HasData(
            new Sauce { Id = 1, Name = "Marinara" },
            new Sauce { Id = 2, Name = "Arrabbiata" },
            new Sauce { Id = 3, Name = "Garlic White" },
            new Sauce { Id = 4, Name = "None" }
        );


        modelBuilder.Entity<Topping>().HasData(
            new Topping { Id = 1, Name = "Sausage", Price = 0.50m },
            new Topping { Id = 2, Name = "Pepperoni", Price = 0.50m },
            new Topping { Id = 3, Name = "Mushroom", Price = 0.50m },
            new Topping { Id = 4, Name = "Onion", Price = 0.50m },
            new Topping { Id = 5, Name = "Green Pepper", Price = 0.50m },
            new Topping { Id = 6, Name = "Black Olive", Price = 0.50m },
            new Topping { Id = 7, Name = "Basil", Price = 0.50m },
            new Topping { Id = 8, Name = "Extra Cheese", Price = 0.50m }
        );


        modelBuilder.Entity<Pizza>().HasData(
            new Pizza { Id = 1, OrderId = 1, SizeId = 2, CheeseId = 1, SauceId = 1 },
            new Pizza { Id = 2, OrderId = 2, SizeId = 1, CheeseId = 2, SauceId = 2 },
            new Pizza { Id = 3, OrderId = 2, SizeId = 3, CheeseId = 3, SauceId = 3 },
            new Pizza { Id = 4, OrderId = 3, SizeId = 2, CheeseId = 4, SauceId = 4 }
        );

        modelBuilder.Entity<PizzaTopping>().HasData(
            new PizzaTopping { Id = 1, PizzaId = 1, ToppingId = 1 },
            new PizzaTopping { Id = 2, PizzaId = 1, ToppingId = 2 },
            new PizzaTopping { Id = 3, PizzaId = 2, ToppingId = 3 },
            new PizzaTopping { Id = 4, PizzaId = 2, ToppingId = 4 },
            new PizzaTopping { Id = 5, PizzaId = 3, ToppingId = 5 },
            new PizzaTopping { Id = 6, PizzaId = 3, ToppingId = 6 },
            new PizzaTopping { Id = 7, PizzaId = 4, ToppingId = 7 },
            new PizzaTopping { Id = 8, PizzaId = 4, ToppingId = 8 }
        );
    }
}