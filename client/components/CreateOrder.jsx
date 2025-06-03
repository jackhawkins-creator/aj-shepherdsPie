import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CreateOrder({ loggedInUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [pizzas, setPizzas] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    orderTakerId: 1,
    delivererId: 1,
    tableNum: 1,
    tip: 0,
    isDelivered: false,
  });

  // Add new pizza returned from CreatePizza view
  useEffect(() => {
  if (location.state?.pizzas) {
    setPizzas(location.state.pizzas);
  } else if (location.state?.newPizza) {
    setPizzas(prev => [...prev, location.state.newPizza]);
  }
}, [location.state]);


  const handleAddPizzaClick = () => {
    navigate("/pizza/create", { state: { pizzas } });
  };

  const handleSubmitOrder = () => {
    const order = { ...orderDetails, pizzas };
    // call your createOrder API
    console.log("Submitting order:", order);
  };

  return (
    <>
      <h1>Create Order</h1>
      <button onClick={handleAddPizzaClick}>Add Pizza</button>
      <ul>
        {pizzas.map((p, i) => (
          <li key={i}>
            Pizza #{i + 1}: Size {p.sizeId}, Cheese {p.cheeseId}
          </li>
        ))}
      </ul>
      <button onClick={handleSubmitOrder}>Submit Order</button>
    </>
  );
}
