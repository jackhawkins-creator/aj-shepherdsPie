const _apiUrl = "/api/order";

export const getAllOrders = () => {
    return fetch(_apiUrl).then ((res)=> res.json());
};

export const getOrderbyId = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((res)=> res.json());
};

export const deleteOrder = (id) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: "DELETE"
    });
};
export const createOrder = (order) => {
  return fetch("/api/order", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("shepherds_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  }).then((res) => {
    if (!res.ok) {
      // ✅ Return text instead of trying to parse JSON error
      return res.text().then((text) => {
        throw new Error(text);
      });
    }
    return res.json(); // This only runs if res.ok
  });
};


export const updateOrder = (order) => {
    return fetch(`${_apiUrl}/${order.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    });
};