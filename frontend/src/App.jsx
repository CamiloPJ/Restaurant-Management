import React, { useState } from "react";
import { Navbar } from "./components/navbar/navbar";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import UserOrders from "./pages/UserOrders/UserOrders";

const App = () => {

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
    {showLogin 
    ?<LoginScreen setShowLogin={setShowLogin}/>
    :<></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/userorders" element={<UserOrders />} />
        </Routes>
      </div>
      ;
      <Footer />
    </>
  );
};

export default App;
