import { useState, useEffect } from "react";
import {
  getAllCheeses,
  getAllSauces,
  getAllSizes,
  getAllToppings,
  getPizzaById,
  updatePizza,
} from "../managers/pizzaManager";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPizza() {
  const { pizzaId } = useParams();
  const navigate = useNavigate();

  const [sizes, setSizes] = useState([]);
  const [cheeses, setCheeses] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [toppings, setToppings] = useState([]);

  const [selectedPizza, setSelectedPizza] = useState({
    sizeId: null,
    cheeseId: null,
    sauceId: null,
    pizzaToppings: [],
  });

  const [originalPizza, setOriginalPizza] = useState(null); // ✅ Added

  // Load options (sizes, cheeses, etc)
  useEffect(() => {
    getAllSizes().then(setSizes);
    getAllCheeses().then(setCheeses);
    getAllSauces().then(setSauces);
    getAllToppings().then(setToppings);
  }, []);

  // Load pizza by ID
  useEffect(() => {
    getPizzaById(pizzaId).then((data) => {
      setOriginalPizza(data);
      setSelectedPizza({
        sizeId: data.sizeId,
        cheeseId: data.cheeseId,
        sauceId: data.sauceId,
        pizzaToppings: data.pizzaToppings.map((pt) => pt.toppingId),
      });
    });
  }, [pizzaId]);

  const toggleTopping = (id) => {
    setSelectedPizza((prev) => ({
      ...prev,
      pizzaToppings: prev.pizzaToppings.includes(id)
        ? prev.pizzaToppings.filter((t) => t !== id)
        : [...prev.pizzaToppings, id],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedPizza.sizeId || !selectedPizza.cheeseId || !selectedPizza.sauceId) {
      alert("Please select a size, cheese, and sauce.");
      return;
    }

    if (!originalPizza?.orderId) {
      alert("Pizza must be linked to an order.");
      return;
    }

    const updatedPizza = {
      id: parseInt(pizzaId),
      orderId: originalPizza.orderId, // ✅ Now safe
      sizeId: selectedPizza.sizeId,
      cheeseId: selectedPizza.cheeseId,
      sauceId: selectedPizza.sauceId,
      pizzaToppings: selectedPizza.pizzaToppings.map((id) => ({
        toppingId: id,
      })),
    };

    updatePizza(updatedPizza)
      .then(() => navigate("/"))
      .catch((err) => {
        console.error("Failed to update pizza:", err);
        alert("Something went wrong updating the pizza.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Pizza</h2>

      <fieldset>
        <legend>Size</legend>
        {sizes.map((size) => (
          <label key={size.id}>
            <input
              type="radio"
              name="size"
              value={size.id}
              checked={selectedPizza.sizeId === size.id}
              onChange={() => setSelectedPizza({ ...selectedPizza, sizeId: size.id })}
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
              onChange={() => setSelectedPizza({ ...selectedPizza, sauceId: sauce.id })}
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
              onChange={() => setSelectedPizza({ ...selectedPizza, cheeseId: cheese.id })}
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

      <button type="submit">Save Changes</button>
    </form>
  );
}
