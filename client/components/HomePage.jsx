import { useEffect, useState } from "react"
import { getAllOrders } from "../managers/orderManager"


export default function HomePage() {
    const [orders, setOrders] = useState([]);

    const getOrders = () => {
        getAllOrders().then(setOrders);
    }

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <div>
        <h6>Orders</h6>
        <ul>
            {orders.map((order) => (
                <li key={order.id}>
                    order #{order.id}
                </li>
            ))}
        </ul>
        </div>
    )
    // deleteOrder()
}