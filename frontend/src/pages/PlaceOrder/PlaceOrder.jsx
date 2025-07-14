import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../components/Context/StoreContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItem, url } = useContext(StoreContext);
  console.log({
  token,       // Debe existir
  food_list,   // Debe tener datos
  cartItem,    // Debe tener items
  url          // Debe ser la correcta
});
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

const placeOrder = async (event) => {
  event.preventDefault();
  setLoading(true);

  try {
    // 1. Validaciones antes de enviar
    if (!token) {
      alert("Por favor inicia sesión para continuar");
      setLoading(false);
      return;
    }

    const cartItems = food_list.filter(item => cartItem[item._id] > 0);
    
    if (cartItems.length === 0) {
      alert("Tu carrito está vacío. Agrega productos antes de ordenar.");
      setLoading(false);
      return;
    }

    // Validar campos de dirección
    const requiredFields = ['firstName', 'lastName', 'street', 'city', 'state', 'zipcode', 'country', 'phone'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      alert(`Por favor completa estos campos: ${missingFields.join(', ')}`);
      setLoading(false);
      return;
    }
    const orderData = {
      userId: localStorage.getItem('userId'),
      items: cartItems.map(item => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: cartItem[item._id]
      })),
      amount: getTotalCartAmount() + (getTotalCartAmount() > 0 ? 2 : 0),
      address: data
    };

    //Enviar petición
    const response = await axios.post(`${url}/api/order/place`, orderData, {
      headers: {
        'token': token,
        'Content-Type': 'application/json'
      }
    });

    if (response.data.success) {
      setOrderSuccess(true);
    } else {
      alert(response.data.message || "Hubo un problema al procesar tu pedido");
    }
  } catch (error) {
    console.error("Error completo:", error);
    
    // Manejo específico de errores
    if (error.response) {
      // Error del backend (4xx/5xx)
      const errorMessage = error.response.data?.message || 
                         error.response.data?.error || 
                         "Error al procesar el pedido";
      alert(`Error: ${errorMessage}`);
    } else if (error.request) {
      // No se recibió respuesta
      alert("No se pudo conectar al servidor. Intenta nuevamente.");
    } else {
      // Error en la configuración de la petición
      alert("Error al preparar la solicitud: " + error.message);
    }
  } finally {
    setLoading(false);
  }
};

  if (orderSuccess) {
    return (
      <div className="order-success">
        <h2>¡Pedido Confirmado!</h2>
        <p>Tu pedido ha sido recibido y está siendo procesado.</p>
        <p>
          Número de pedido: #
          {Math.random().toString(36).substr(2, 9).toUpperCase()}
        </p>
        <p>Te enviaremos una confirmación por email.</p>
        <button onClick={() => (window.location.href = "/")}>
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Add Email Address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Postal Code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart total</h2>
          <div>
            <hr />
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>
                <strong>Total</strong>
              </p>
              <p>
                <strong>
                  ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                </strong>
              </p>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? (
                <span className="loading-spinner">⌛</span>
              ) : (
                "PROCEED TO PAYMENT"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
