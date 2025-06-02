import { useEffect, useState } from "react";
import { deleteOrder, getAllOrders } from "../managers/orderManager";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
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
          <li key={order.id}>
            order #{order.id}
            <button onClick={() => navigate(`/order/edit/{order.id}`)}>
              Edit Order
            </button>
            <button onClick={() => handleDelete(order.id)}>Cancel Order</button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate(`/order/create`)}>Create Order</button>
    </div>
  );
}
