import React, { useState, useEffect } from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  addToCartTotal,
  deliveryFeeAdd,
} from "../../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/api";

const Cart = () => {
  const {food_list, loading, error}=  useSelector((state)=>state.food)
  const [cartItem, setCartItem] = useState([])
  const dispatch = useDispatch();
  const token = localStorage.getItem("token") || ""

  const [total, setTotal] = useState(0);
  const deliveryFee = Object.keys(cartItem).length > 0 ? 2 : 0;
  const navigateTO = useNavigate();

  const checkOutHandler = () => {
    navigateTO("/place-order");
    dispatch(addToCartTotal(total));
    dispatch(deliveryFeeAdd(deliveryFee));
  };

  const fetchCart = async ()=>{
    try {
      const response = await axios.get(`${BASE_URL}/api/cart/get`,{headers:{token}})
      setCartItem(response.data.cartData)
    } catch (error) {
      console.log(error)
    }
  }
  const removeFromCart = async (id)=>{
    if (token) {
      try {
        await axios.post(`${BASE_URL}/api/cart/remove`,{itemId:id},{headers:{token}})
        fetchCart()
      } catch (error) {
       console.log(error) 
      }
    }else{
      alert("You have to login first")
    }
  }
  useEffect(() => {
    fetchCart()
    let calculatedTotal = 0;
    food_list.forEach((item) => {
      if (cartItem[item._id]) {
        calculatedTotal += item.price * cartItem[item._id];
      }
    });
    setTotal(calculatedTotal);
  }, [cartItem, food_list]);

  return (
    <div className="cart">
      <h2>Cart</h2>
      <div className="cart-top">
        <div className="cart-items">
          <div className="item-display item-titles">
            <p>Item</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          {food_list.map((item, index) => {
            if (cartItem[item._id] > 0) {
              var qnty = cartItem[item._id];
              return (
                <div className="item-display" key={index}>
                  <img src={`${BASE_URL}/images/${item.image}`} alt="product_image" />
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <p>{qnty}</p>
                  <p>{qnty * item.price}</p>
                  <button
                    className="remove-btn-from-cart"
                    onClick={() => removeFromCart(item._id)}
                  >
                    X
                  </button>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="cart-bottom">
        <div className="totals-row">
          <p>Total</p>
          <p>{total}</p>
        </div>
        <div className="totals-row">
          <p>Delivery</p>

          <p>{deliveryFee}</p>
        </div>
        <div className="totals-row">
          <p>Grand Total</p>

          <p>{total + deliveryFee}</p>
        </div>

        <button className="checkout-button" onClick={() => checkOutHandler()}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
