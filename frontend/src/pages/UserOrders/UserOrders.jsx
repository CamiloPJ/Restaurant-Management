import React from 'react'
import './UserOrders.css'
import { useState } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../components/Context/StoreContext'
import axios from 'axios'
import { useEffect } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
const UserOrders = () => {
    const {url, token} = useContext(StoreContext)
    const [data, setData]= useState([]);

    const fetchOrders = async() => {
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
        setData(response.data.data);
        console.log(response.data.data);
        
    }

    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token])

  return (
    <div className='user-orders'>
        <h2>My orders</h2>
        <div className="container">
            {data.map((order, index)=>{
                return(
                    <div key={index} className="user-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item, index)=>{
                            if(index === order.items.lenght-1){
                                return (item.name + " x " + item.quantity)
                            }else{
                                return (item.name + " x " + item.quantity+", ")
                            }
                        })}</p>
                        <p>${order.amount}</p>
                        <p>Items: {order.items.lenght}</p>
                        <p><span>-</span> <strong>{order.status}</strong></p>
                        <p>{order.date}</p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default UserOrders