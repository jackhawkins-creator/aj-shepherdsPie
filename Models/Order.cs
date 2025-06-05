namespace ShepherdsPies.Models;

public class Order
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public decimal Tip { get; set; }
    public int OrderTakerId { get; set; }
    public UserProfile? OrderTaker { get; set; }
    public int? DelivererId { get; set; }
    public UserProfile? Deliverer { get; set; }
    public int? TableNum { get; set; }
    public bool IsDelivered { get; set; }
    public List<Pizza> Pizzas { get; set; }

    public decimal TotalOrderCost
    {
        get
        {
            decimal total = 0;

            if (Pizzas != null)
            {
                foreach (var pizza in Pizzas)
                {
                    total += pizza.TotalPizzaCost;
                }
            }

            return total + Tip;
        }
    }

}
