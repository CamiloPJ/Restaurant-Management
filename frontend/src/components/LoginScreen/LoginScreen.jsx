import React, { useState } from 'react'
import './LoginScreen.css'
import { useForm } from 'react-hook-form';
import { assets } from '../../assets/frontend_assets/assets';


const LoginScreen = ({setShowLogin}) => {

  const [currentState, setCurrentState] = useState("Login")

  return (
    <div className='login-screen'>
      <form className="login-screen-container">
        <div className="login-screen-item">
          <h2>{currentState}</h2>
          <h2 className="X" onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="">
            X
            </h2>
        </div>
        <div className="login-screen-inputs">
          {currentState==="Login"?<></>:<input type="text" placeholder="Your Name" required/>}
          <input type="text" placeholder="Email" required/>
          <input type="password" placeholder="Password" required/>
        </div>
        <button> {currentState==="Sign Up"?"Create account":"Login"}</button>
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