import { useState } from "react";
import Home from "./pages/home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/footer/Footer";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/cart/Cart";
import Login from "./components/login-popup/Login";
import Order from "./pages/order/Order";
import Orders from "./pages/orders/orders";

function App() {
  const [loginState, setLoginState] = useState(false);
  return (
    <>
      {loginState ? <Login setLoginState={setLoginState} /> : <></>}

      <Header setLoginState={setLoginState} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<Order />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
