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
     return fetch(_apiUrl, {
        method: "POST",
        headers: {
            "Content-Types": "application/json",
        },
        body: JSON.stringify(order),
    }).then((res)=> res.json());
};

export const updateOrder = (order) => {
    return fetch(`${_apiUrl}/${order.id}`, {
        method: "PUT",
        headers: {
            "Content-Types": "application/json",
        },
        body: JSON.stringify(order),
    });
};