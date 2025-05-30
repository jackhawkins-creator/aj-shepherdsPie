namespace ShepherdsPies.Models;

public class Order
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public decimal Tip { get; set; }
    public int OrderTakerId { get; set; }
    public Employee? OrderTaker { get; set; }
    public int DelivererId { get; set; }
    public Employee? Deliverer { get; set; }
    public int TableNum { get; set; }
    public bool IsDelivered { get; set; }
    public List<Pizza> Pizzas { get; set; }
}
