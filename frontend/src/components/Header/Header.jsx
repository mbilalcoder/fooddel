import React from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { useState } from "react";
import "./header.css";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../store/slices/cartSlice.js";

const Header = ({ setLoginState }) => {
  const [menu, setMenu] = useState("home");
  const { token } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(setToken(""));
    navigate("/");
  };
  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img src={assets.logo} alt="logo" className="logo-img" />
        </Link>
      </div>
      <div className="menu">
        <ul className="menu-list">
          <li
            className={menu === "home" ? "active" : ""}
            onClick={() => setMenu("home")}
          >
            home
          </li>
          <li
            className={menu === "menu" ? "active" : ""}
            onClick={() => setMenu("menu")}
          >
            menu
          </li>

          <li
            className={menu === "contact-us" ? "active" : ""}
            onClick={() => setMenu("contact-us")}
          >
            contact-us
          </li>
        </ul>
      </div>
      <div className="nav-right">
        <img src={assets.search_icon} alt="search_icon" />
        <div className="cart-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Basket_Icon" />
          </Link>
          <div className="dot"></div>
        </div>
        {!token ? (
          <button onClick={() => setLoginState(true)}>sign in</button>
        ) : (
          <div className="navebar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="naveprofile-dropdown">
              <li>
                <img src={assets.bag_icon} alt="" />
                <p onClick={()=>navigate("/orders")}>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
