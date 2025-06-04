import { useEffect, useState } from "react";
import { deleteOrder, getAllOrders } from "../managers/orderManager";
import { useNavigate } from "react-router-dom";


export default function HomePage({loggedInUser}) {
  const [orders, setOrders] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const navigate = useNavigate();

  const getOrders = () => {
    getAllOrders().then(setOrders);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you certain you wish to delete?")) {
      deleteOrder(id).then(() => {
        getAllOrders().then(setOrders);
      });
    }
  };


  const filteredOrders = orders.filter((order) => {
    if (!filterDate) return true;

    const orderDate = new Date(order.createdAt).toISOString().split("T")[0];
    return orderDate === filterDate;
  });


  return (
    <div>
      <label>Filter By Day</label>
      <input
        type="date"
        id="filterDate"
        className="form-control"
        value={filterDate}
        onChange={(event) => setFilterDate(event.target.value)}
      ></input>
      <h6>Orders</h6>
       <ul>
  {filteredOrders.map((order) => (
    <li key={order.id} style={{ marginBottom: "1rem" }}>
      <strong>Order #{order.id}</strong>
      <div>Order Taker: {order.orderTaker?.firstName} {order.orderTaker?.lastName}</div>
      
      {order.tableNum !== null ? (
        <div>Table #: {order.tableNum}</div>
      ) : (
        <div>Delivery Driver: {order.deliverer?.firstName} {order.deliverer?.lastName}</div>
      )}

      <div>
        <strong>Pizzas:</strong>
        <ul>
          {order.pizzas.map((pizza, index) => (
            <li key={pizza.id}>
              Pizza #{index + 1}: 
              Size - {pizza.size?.name}, 
              Cheese - {pizza.cheese?.name}, 
              Sauce - {pizza.sauce?.name}
              <br />
              Toppings:{" "}
              {pizza.pizzaToppings.length > 0
                ? pizza.pizzaToppings.map((pt) => pt.topping?.name).join(", ")
                : "None"}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={() => navigate(`/order/edit/${order.id}`)}>
        Edit Order
      </button>
      <button onClick={() => handleDelete(order.id)}>
        Cancel Order
      </button>
    </li>
  ))}
</ul>


<button className="btn btn-primary" onClick={() => navigate(`/order/create`)}>
        Create Order
      </button>
    </div>
  );
}