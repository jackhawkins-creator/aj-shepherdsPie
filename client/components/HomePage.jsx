import { useEffect, useState } from "react";
import { deleteOrder, getAllOrders } from "../managers/orderManager";
import { useNavigate } from "react-router-dom";

export default function HomePage({ loggedInUser }) {
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
    />
    <h6>Orders</h6>
    <ul>
      {filteredOrders.map((order) => (
          <li key={order.id}>
            <strong>Order #{order.id}</strong>
            <button
              onClick={() =>
                navigate("/pizza/create", { state: { orderId: order.id } })
              }
            >
              Add Pizza
            </button>
            <div>
              Order Taker: {loggedInUser.firstName} {loggedInUser.lastName}
            </div>

            {order.tableNum !== null ? (
              <div>Table #: {order.tableNum}</div>
            ) : (
              <div>
                Delivery Driver:{" "}
                {order.deliverer?.firstName} {order.deliverer?.lastName}
              </div>
            )}

            <div>
              <strong>Pizzas:</strong>
              <ul>
                {order.pizzas.map((pizza, index) => (
                  <li key={pizza.id}>
                    <div>
                      <strong>Pizza #{index + 1}:</strong> Size -{" "}
                      {pizza.size?.name}, Cheese - {pizza.cheese?.name}, Sauce -{" "}
                      {pizza.sauce?.name}
                      <br />
                      Toppings:{" "}
                      {pizza.pizzaToppings.length > 0
                        ? pizza.pizzaToppings
                            .map((pt) => pt.topping?.name)
                            .join(", ")
                        : "None"}
                    </div>
                    <button
                      onClick={() => navigate(`/pizza/edit/${pizza.id}`)}
                    >
                      Edit Pizza
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <strong>Grand Total: ${order.totalOrderCost}</strong>
            </div>

            {/* ✅ Order Date/Time */}
            <div>
              Ordered at: {new Date(order.createdAt).toLocaleString()}
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

    <button
      className="btn btn-primary"
      onClick={() => navigate(`/order/create`)}
    >
      Create Order
    </button>
  </div>
);

}
