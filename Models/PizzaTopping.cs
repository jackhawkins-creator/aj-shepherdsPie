using System.Text.Json.Serialization;

namespace ShepherdsPies.Models;

public class PizzaTopping
{
    public int Id { get; set; }
    public int PizzaId { get; set; }
    public int ToppingId { get; set; }
    [JsonIgnore]
    public Topping? Topping { get; set; }
}
