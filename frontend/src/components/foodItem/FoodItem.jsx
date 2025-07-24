import React, { useEffect, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/frontend_assets/assets";
import axios from "axios"
import { BASE_URL } from "../../config/api";

const FoodItem = ({ id, description, name, image, price }) => {
  const [cartItem, setCartItem] = useState({})
  const token = localStorage.getItem("token") || ""
  
  const adToCart = async (id)=>{
    if (token) {
      try {
        await axios.post(`${BASE_URL}/api/cart/add`,{itemId:id},{headers:{token}})
        getCart()
      } catch (error) {
       console.log(error) 
      }
    }else{
      alert("You have to login first")
    }
  }
  const removeFromCart = async (id)=>{
    if (token) {
      try {
        await axios.post(`${BASE_URL}/api/cart/remove`,{itemId:id},{headers:{token}})
        getCart()
      } catch (error) {
       console.log(error) 
      }
    }else{
      alert("You have to login first")
    }
  }
  const getCart = async () => {
  if (token) {
    try {
      const response = await axios.get(`${BASE_URL}/api/cart/get`, {
        headers: { token },
      });
      setCartItem(response.data.cartData || {});
    } catch (error) {
      console.error("Get Cart Error:", error.response?.data || error.message);
    }
  }
};

useEffect(() => {
  getCart();
}, []);
  return (
    <div className="food-item" id={id}>
      <div className="food-image">
        <img className="food-item-image" src={image} alt="" />
        {!cartItem[id] ? (
          <img
            onClick={()=>adToCart(id)}
            src={assets.add_icon_white}
            alt="addIconWhite"
            className="add"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={()=>removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItem[id]}</p>
            <img
              onClick={()=>adToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-name-rating">
          <p className="food-name">{name}</p>
          <img src={assets.rating_starts} alt="rating stars" />
        </div>
        <p className="food-description">{description}</p>
        <p className="food-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
