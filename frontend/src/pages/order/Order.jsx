import React, { useEffect, useState } from "react";
import "./Order.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, fetchFoodList } from "../../store/slices/foodSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/api";

const Order = () => {
  const total = useSelector((state) => state.cart.cartTotal);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {food_list, fetchedCart}=  useSelector((state)=>state.food)
  const deliveryFee = useSelector((state) => state.cart.deliveryFee);
  const [address, setAddress] = useState({})
  const [cartItems, setCartItems] = useState([])


  const onChangeHandler = (e)=>{
    let name = e.target.name;
    let value= e.target.value;
    setAddress((prev)=>({...prev, [name]:value}))
    console.log(address)
  }

  

  
  const submitHandler = async (e)=>{

    e.preventDefault()
    const orderData ={
      items:cartItems,
      amount:total + deliveryFee,
      address,
    }
    try {
      const response = await axios.post(`${BASE_URL}/api/order/place`,orderData,{headers:{token:localStorage.getItem("token")}})
      
      if (response.data.success) {
        setAddress({})
        navigate("/")
        setCartItems([])
        console.log("Order placed")
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  
 // 1. Fetch on mount
useEffect(() => {
  dispatch(fetchCart());
  dispatch(fetchFoodList());
}, [dispatch]);

// 2. Generate cartItems when both data sets are ready
useEffect(() => {
  if (food_list.length > 0 && Object.keys(fetchedCart).length > 0) {
    const items = food_list
      .filter((item) => fetchedCart[item._id] > 0)
      .map((item) => ({
        _id: item._id,
        name: item.name,
        category: item.category,
        price: item.price,
        items: fetchedCart[item._id]
      }));
    setCartItems(items);
  }
}, [food_list, fetchedCart]);



  return (
    <form onSubmit={submitHandler} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name="fname" onChange={onChangeHandler} value={address.fname} type="text" placeholder="First Name" />
          <input name="lname" onChange={onChangeHandler} value={address.lname} type="text" placeholder="Last Name" />
        </div>
        <input name="email" onChange={onChangeHandler} value={address.email} type="email" placeholder="Email" />
        <input name="street" onChange={onChangeHandler} value={address.street} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input name="city" onChange={onChangeHandler} value={address.city} type="text" placeholder="city" />
          <input name="state" onChange={onChangeHandler} value={address.state} type="text" placeholder="state" />
        </div>
        <div className="multi-fields">
          <input name="zip" onChange={onChangeHandler} value={address.zip} type="text" placeholder="zip code" />
          <input name="country" onChange={onChangeHandler} value={address.country} type="text" placeholder="country" />
        </div>
        <input name="phone" onChange={onChangeHandler} value={address.phone} type="number" placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="place-order-right-wrapper">
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

          <button type="submit" className="checkout-button">Proced to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default Order;
