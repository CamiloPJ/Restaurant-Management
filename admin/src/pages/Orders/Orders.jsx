import React from "react";
import "./Orders.css";
import { use } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className="order add">
      <h3>Orders Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <h4>Pedidos:</h4>
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.lenght - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName+" "+order.address.lastName}</p>
              <p>{order.address.street}</p>
              <p>
                <span>-</span> <strong>{order.status}</strong>
              </p>
              <p>{order.address.phone}</p>
              <p>${order.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
