import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../components/Context/StoreContext";
import { assets } from '../../assets/frontend_assets/assets'
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItem = {},
    food_list,
    removeFromCart,
    getTotalCartAmount,
    url,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItem[item._id] > 0) {
            console.log(item.name);

            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItem[item._id]}</p>
                  <p>${item.price * cartItem[item._id]}</p>
                  <img onClick={()=>removeFromCart(item._id  )} className='cross' src={assets.remove_icon_red} alt="" />
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
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
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p><strong>Total</strong></p>
              <p><strong>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</strong></p>
            </div>
            <button onClick={()=>navigate('/order')}>SAVE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
