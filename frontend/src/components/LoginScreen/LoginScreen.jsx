import React, { useState } from 'react'
import './LoginScreen.css'
import { useForm } from 'react-hook-form';
import { assets } from '../../assets/frontend_assets/assets';
import { useEffect } from 'react';
import { useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';
import axios from "axios"


const LoginScreen = ({setShowLogin}) => {
  const {url, setToken} = useContext(StoreContext)

  const [currentState, setCurrentState] = useState("Login")
  const [data, setdata] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata(data => ({...data,[name]:value}))
  }

  const onLogin = async (event) => { 
    event.preventDefault()
    let newUrl = url;
    if(currentState==="Login"){
      newUrl += "/api/user/login"
    }else{
      newUrl += "/api/user/register"
    }

    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      //En un futuro se cambiara de localstorage a las cookies
      localStorage.setItem("token", response.data.token);
      setShowLogin(false)
    } else {
      alert(response.data.message)
    }
  } 

  return (
    <div className='login-screen'>
      <form onSubmit={onLogin} className="login-screen-container">
        <div className="login-screen-item">
          <h2>{currentState}</h2>
          <h2 className="X" onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="">
            X
            </h2>
        </div>
        <div className="login-screen-inputs">
          {currentState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Your Name" required/>}
          <input type="text" name='email' onChange={onChangeHandler} value={data.email} placeholder="Email" required/>
          <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder="Password" required/>
        </div>
        <button type='submit'> {currentState==="Sign Up"?"Create account":"Login"}</button>
        <div className="login-screen-condition">
          <input type="checkbox" required/>
          <p>I agree to the terms of use and privacy policy</p>
        </div>
        {currentState==="Login"
        ?<p>Create account <span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p>
        :<p>Already have an account <span onClick={()=>setCurrentState("Login")}>Login here</span></p>}
        
        
      </form>
    </div>
  )
  };

export default LoginScreen