import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllUserProfiles } from "../managers/userProfileManager";
import { updateOrder, createOrder } from "../managers/orderManager";
import { getPizzasByOrderId } from "../managers/pizzaManager";

export default function CreateOrder({ loggedInUser }) {
  const [isDelivery, setIsDelivery] = useState(false);
  const [userProfiles, setUserProfiles] = useState([]);
  const [selectedDelivererId, setSelectedDelivererId] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [tip, setTip] = useState(0);
  const [pizzas, setPizzas] = useState([]);
  const [orderId, setOrderId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getAllUserProfiles().then(setUserProfiles);

    const passedOrderId = location.state?.orderId;
    const newPizza = location.state?.newPizza;

    if (passedOrderId) {
      setOrderId(passedOrderId);
      getPizzasByOrderId(passedOrderId).then(setPizzas);
    }

    if (newPizza) {
      setPizzas((prev) => [...prev, newPizza]);
    }
  }, [location.state]);

  const handleRemovePizza = (pizzaId) => {
    setPizzas((prev) => prev.filter((p) => p.id !== pizzaId));
  };

  const handleSubmit = () => {
    const orderDetails = {
      orderTakerId: loggedInUser.id,
      tip: parseFloat(tip),
      tableNum: isDelivery ? null : parseInt(tableNumber),
      delivererId: isDelivery ? parseInt(selectedDelivererId) : null,
      isDelivered: false,
      pizzas: pizzas,
    };

    if (orderId) {
      updateOrder({ id: orderId, ...orderDetails }).then(() => navigate("/"));
    } else {
      createOrder(orderDetails).then((createdOrder) => {
        setOrderId(createdOrder.id);
        navigate("/", { state: { orderId: createdOrder.id } });
      });
    }
  };

  return (
    <div>
      <h1>Create Order</h1>
      <p>Order Taker: {loggedInUser.name}</p>

      <label>
        <input
          type="radio"
          name="type"
          checked={!isDelivery}
          onChange={() => setIsDelivery(false)}
        />
        Dine-in
      </label>
      <label>
        <input
          type="radio"
          name="type"
          checked={isDelivery}
          onChange={() => setIsDelivery(true)}
        />
        Delivery
      </label>

      {isDelivery ? (
        <select
          className="form-control"
          value={selectedDelivererId}
          onChange={(e) => setSelectedDelivererId(e.target.value)}
        >
          <option value="">Select Driver</option>
          {userProfiles.map((u) => (
            <option key={u.id} value={u.id}>
              {u.firstName} { u.lastName}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="number"
          placeholder="Table #"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          className="form-control"
        />
      )}

      <label>Tip Amount</label>
      <input
        type="number"
        className="form-control"
        value={tip}
        onChange={(e) => setTip(e.target.value)}
      />

      <div>
        {pizzas.length > 0 ? (
          <ul>
            {pizzas.map((pizza, index) => (
              <li key={pizza.id || index}>
                Pizza #{index + 1}: Size -{" "}
                {pizza.size?.name || `ID: ${pizza.sizeId}`}, Cheese -{" "}
                {pizza.cheese?.name || `ID: ${pizza.cheeseId}`}, Sauce -{" "}
                {pizza.sauce?.name || `ID: ${pizza.sauceId}`}
                <br />
                Toppings:{" "}
                {pizza.pizzaToppings && pizza.pizzaToppings.length > 0
                  ? pizza.pizzaToppings
                      .map((pt) =>
                        pt.topping?.name
                          ? pt.topping.name
                          : `Topping ID ${pt.toppingId}`
                      )
                      .join(", ")
                  : "None"}
                <br />
                {pizza.id && (
                  <>
                    <button onClick={() => navigate(`/pizza/edit/${pizza.id}`)}>
                      Edit
                    </button>
                    <button onClick={() => handleRemovePizza(pizza.id)}>
                      Remove
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No pizzas in order</p>
        )}
      </div>

      <button
        onClick={() =>
          navigate("/pizza/create", { state: { orderId, pizzas } })
        }
      >
        Add Pizza
      </button>

      <button className="btn btn-primary" onClick={handleSubmit}>
        Submit Order
      </button>
    </div>
  );
}
