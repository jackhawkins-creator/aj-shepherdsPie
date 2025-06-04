const _apiUrl = "/api/pizza";

export const getAllToppings = () => {
  return fetch(`${_apiUrl}/toppings`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch toppings");
      return res.json();
    });
};

export const getAllSauces = () => {
  return fetch(`${_apiUrl}/sauces`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch sauces");
      return res.json();
    });
};


export const getAllSizes = () => {
    return fetch(`${_apiUrl}/sizes`).then((res)=>res.json());
};

export const getAllCheeses = () => {
    return fetch(`${_apiUrl}/cheeses`).then((res)=>res.json());
};


export const getPizzaById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((res)=>res.json());
};

export const createPizza = (pizza) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pizza),
    }).then((res)=> res.json());
};

export const deletePizza = (id) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: "DELETE"
    });
};

export const updatePizza = (pizza) => {
    return fetch(`${_apiUrl}/${pizza.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pizza),
    });
};

export const getPizzasByOrderId = (orderId) => {
  return fetch(`/api/order/${orderId}`)
    .then(res => res.json())
    .then(order => order.pizzas);
};

export const getSizeById = (id) => {
   return fetch(`${_apiUrl}/sizes/${id}`).then((res) => res.json());
 };
 export const getCheeseById = (id) => {
   return fetch(`${_apiUrl}/cheeses/${id}`).then((res) => res.json());
 };
 export const getSauceById = (id) => {
   return fetch(`${_apiUrl}/sauces/${id}`).then((res) => res.json());
 };

 export const getToppingById = (id) => {
  return fetch(`/api/pizza/toppings/${id}`).then((res) => res.json());
};
