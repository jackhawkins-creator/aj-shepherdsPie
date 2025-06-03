import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getAllSizes,
  getAllCheeses,
  getAllSauces,
  getAllToppings,
  createPizza,
} from "../managers/pizzaManager";

export default function CreatePizza() {
  const navigate = useNavigate();
  const location = useLocation();
  const previousPizzas = location.state?.pizzas || [];
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

  useEffect(() => {
    getAllSizes().then(setSizes).catch(console.error);
    getAllCheeses().then(setCheeses).catch(console.error);
    getAllSauces().then(setSauces).catch(console.error);
    getAllToppings().then(setToppings).catch(console.error);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const pizzaToSubmit = {
      ...selectedPizza,
      pizzaToppings: selectedPizza.pizzaToppings.map((tid) => ({
        toppingId: tid,
      })),
    };

    navigate("/order/create", {
      state: {
        newPizza: pizzaToSubmit,
        pizzas: [...previousPizzas, pizzaToSubmit],
      },
    });
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

      <h4>Size</h4>
      {sizes.map((s) => (
        <label key={s.id}>
          <input
            type="radio"
            name="size"
            value={s.id}
            onChange={() =>
              setSelectedPizza({ ...selectedPizza, sizeId: s.id })
            }
          />
          {s.name}
        </label>
      ))}

      <h4>Cheese</h4>
      {cheeses.map((c) => (
        <label key={c.id}>
          <input
            type="radio"
            name="cheese"
            value={c.id}
            onChange={() =>
              setSelectedPizza({ ...selectedPizza, cheeseId: c.id })
            }
          />
          {c.name}
        </label>
      ))}

      <h4>Sauce</h4>
      {sauces.map((s) => (
        <label key={s.id}>
          <input
            type="radio"
            name="sauce"
            value={s.id}
            onChange={() =>
              setSelectedPizza({ ...selectedPizza, sauceId: s.id })
            }
          />
          {s.name}
        </label>
      ))}

      <h4>Toppings</h4>
      {toppings.map((t) => (
        <label key={t.id}>
          <input
            type="checkbox"
            value={t.id}
            checked={selectedPizza.pizzaToppings.includes(t.id)}
            onChange={() => toggleTopping(t.id)}
          />
          {t.name}
        </label>
      ))}

      <button type="submit">Submit Pizza</button>
    </form>
  );
}
