import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderbyId, updateOrder } from "../managers/orderManager";
import { getAllUserProfiles } from "../managers/userProfileManager";

export default function EditOrder({ loggedInUser }) {
  const [order, setOrder] = useState(null);
  const [userProfiles, setUserProfiles] = useState([]);
  const [isDelivery, setIsDelivery] = useState(false);
  const navigate = useNavigate();
  const { orderId } = useParams();

  useEffect(() => {
    getOrderbyId(orderId).then((data) => {
      setOrder(data);
      setIsDelivery(data.delivererId !== null);
    });
    getAllUserProfiles().then(setUserProfiles);
  }, [orderId]);

  const handleChange = (field, value) => {
    setOrder((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const updatedOrder = {
    id: order.id,
    createdAt: order.createdAt,
    tip: parseFloat(order.tip),
    orderTakerId: order.orderTakerId,
    delivererId: isDelivery ? parseInt(order.delivererId) : null,
    tableNum: isDelivery ? null : parseInt(order.tableNum),
    isDelivered: false,
    pizzas: order.pizzas // 🔥 Preserve the pizzas!
  };

  updateOrder(updatedOrder)
    .then(() => navigate("/"))
    .catch((err) => {
      console.error("Failed to update order:", err);
      alert("Something went wrong updating the order.");
    });
};


  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Order #{order.id}</h2>

      <label>
        <input
          type="radio"
          name="type"
          checked={!isDelivery}
          onChange={() => {
            setIsDelivery(false);
            setOrder((prev) => ({ ...prev, delivererId: null }));
          }}
        />
        Dine-in
      </label>
      <label>
        <input
          type="radio"
          name="type"
          checked={isDelivery}
          onChange={() => {
            setIsDelivery(true);
            setOrder((prev) => ({ ...prev, tableNum: null }));
          }}
        />
        Delivery
      </label>

      {isDelivery ? (
        <>
          <label>Select Driver</label>
          <select
            className="form-control"
            value={order.delivererId || ""}
            onChange={(e) => handleChange("delivererId", e.target.value)}
          >
            <option value="">-- Select a Driver --</option>
            {userProfiles.map((u) => (
              <option key={u.id} value={u.id}>
                {u.firstName} {u.lastName}
              </option>
            ))}
          </select>
        </>
      ) : (
        <>
          <label>Table Number</label>
          <input
            type="number"
            placeholder="Table #"
            value={order.tableNum || ""}
            onChange={(e) => handleChange("tableNum", e.target.value)}
            className="form-control"
          />
        </>
      )}

      <label>Tip Amount</label>
      <input
        type="number"
        className="form-control"
        value={order.tip}
        onChange={(e) => handleChange("tip", e.target.value)}
      />

      <button className="btn btn-primary" onClick={handleSubmit}>
        Save Changes
      </button>
    </div>
  );
}
