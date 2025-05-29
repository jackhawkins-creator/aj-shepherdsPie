namespace ShepherdsPies.Models.DTOs;

public class OrderDTO
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public decimal Tip { get; set; }
    public int OrderTakerId { get; set; }
    public EmployeeDTO OrderTaker { get; set; }
    public int DelivererId { get; set; }
    public EmployeeDTO Deliverer { get; set; }
    public int TableNum { get; set; }
    public bool IsDelivered { get; set; }
    public List<PizzaDTO> Pizzas { get; set; }
}
