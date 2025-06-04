import { useState, useEffect } from "react";
import {
  createPizza,
  getAllCheeses,
  getAllSauces,
  getAllSizes,
  getAllToppings,
  getSizeById,
  getCheeseById,
  getSauceById,
  getToppingById,
} from "../managers/pizzaManager";
import { useNavigate, useLocation } from "react-router-dom";
export default function CreatePizza() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sizes, setSizes] = useState([]);
  const [cheeses, setCheeses] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [toppings, setToppings] = useState([]);
  const orderId = location.state?.orderId;
  const previousPizzas = location.state?.pizzas || [];
  const [selectedPizza, setSelectedPizza] = useState({
    sizeId: null,
    cheeseId: null,
    sauceId: null,
    pizzaToppings: [],
  });
  useEffect(() => {
    getAllSizes().then(setSizes).catch(console.error);
    getAllCheeses().then(setCheeses).catch(console.error);
    getAllSauces().then(setSauces).catch(console.error);
    getAllToppings().then(setToppings).catch(console.error);
  }, []);


    const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPizza.sizeId || !selectedPizza.cheeseId || !selectedPizza.sauceId) {
      alert("Please select a size, cheese, and sauce.");
      return;
    }
    const newPizza = {
      orderId: orderId, // might be null
      sizeId: selectedPizza.sizeId,
      cheeseId: selectedPizza.cheeseId,
      sauceId: selectedPizza.sauceId,
      pizzaToppings: selectedPizza.pizzaToppings.map((id) => ({ toppingId: id })),
    };
    if (orderId) {
      // :white_check_mark: Send to DB and navigate back with no need to store it locally
      createPizza(newPizza).then(() => {
        navigate("/order/create", { state: { orderId } });
      });
    } else {
      // :white_check_mark: Just add to local memory
Promise.all([
  getSizeById(selectedPizza.sizeId),
  getCheeseById(selectedPizza.cheeseId),
  getSauceById(selectedPizza.sauceId),
  ...selectedPizza.pizzaToppings.map((id) => getToppingById(id)),
]).then(([size, cheese, sauce, ...toppingObjs]) => {
  const newPizzaWithDetails = {
    ...newPizza,
    size,
    cheese,
    sauce,
    pizzaToppings: toppingObjs.map((topping) => ({
      toppingId: topping.id,
      topping: topping,
    })),
  };
  navigate("/order/create", {
    state: {
      pizzas: [...previousPizzas, newPizzaWithDetails],
      newPizza: newPizzaWithDetails,
    },
  });
});

    }
  };


  const toggleTopping = (id) => {
    setSelectedPizza((prev) => ({
      ...prev,
      pizzaToppings: prev.pizzaToppings.includes(id)
        ? prev.pizzaToppings.filter((t) => t !== id)
        : [...prev.pizzaToppings, id],
    }));
  };

  
  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a Pizza</h2>
      <fieldset>
        <legend>Size</legend>
        {sizes.map((size) => (
          <label key={size.id}>
            <input
              type="radio"
              name="size"
              value={size.id}
              checked={selectedPizza.sizeId === size.id}
              onChange={() =>
                setSelectedPizza({ ...selectedPizza, sizeId: size.id })
              }
            />
            {size.name}
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>Sauce</legend>
        {sauces.map((sauce) => (
          <label key={sauce.id}>
            <input
              type="radio"
              name="sauce"
              value={sauce.id}
              checked={selectedPizza.sauceId === sauce.id}
              onChange={() =>
                setSelectedPizza({ ...selectedPizza, sauceId: sauce.id })
              }
            />
            {sauce.name}
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>Cheese</legend>
        {cheeses.map((cheese) => (
          <label key={cheese.id}>
            <input
              type="radio"
              name="cheese"
              value={cheese.id}
              checked={selectedPizza.cheeseId === cheese.id}
              onChange={() =>
                setSelectedPizza({ ...selectedPizza, cheeseId: cheese.id })
              }
            />
            {cheese.name}
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>Toppings</legend>
        {toppings.map((topping) => (
          <label key={topping.id}>
            <input
              type="checkbox"
              value={topping.id}
              checked={selectedPizza.pizzaToppings.includes(topping.id)}
              onChange={() => toggleTopping(topping.id)}
            />
            {topping.name} {topping.price && `($${topping.price.toFixed(2)})`}
          </label>
        ))}
      </fieldset>
      <button type="submit">Confirm Pizza</button>
    </form>
  );
}