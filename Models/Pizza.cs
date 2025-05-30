using System.Text.Json.Serialization;
namespace ShepherdsPies.Models;

public class Pizza
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int SizeId { get; set; }
    public int CheeseId { get; set; }
    public int SauceId { get; set; }
    public List<PizzaTopping> PizzaToppings { get; set; }
    [JsonIgnore]
    public Sauce? Sauce { get; set; }
    [JsonIgnore]
    public Cheese? Cheese { get; set; }
    [JsonIgnore]
    public Size? Size { get; set; }
}
