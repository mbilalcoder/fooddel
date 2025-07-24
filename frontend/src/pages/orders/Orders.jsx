import React, { useEffect, useState } from "react";
import "./orders.css";
import { assets } from "../../assets/frontend_assets/assets";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../store/slices/foodSlice";

const Orders = () => {
  const { ordersData } = useSelector((state) => state.food);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="container">
      <h3>All Orders</h3>
      <div className="items">
        <div className="item_heading">
          <p className="heading"></p>
          <p className="heading">Date</p>
          <p className="heading">Items</p>
          <p className="heading">Amount</p>
          <p className="heading">Status</p>
        </div>
        <hr />
        {Array.isArray(ordersData) && ordersData.length > 0 ? (
          ordersData.map((item, ind) => (
            <div className="item" key={ind}>
              <img src={assets.parcel_icon} alt="" />
              <p>{item.date}</p>
              <p>
                {item.items.map((subItem, subInd) => (
                  <span key={subInd}>
                    {subItem.name} {subItem.items} x {subItem.price}
                    {subInd < item.items.length - 1 && ", "}
                  </span>
                ))}
              </p>
              <p>{item.amount}</p>
              <p>{item.status}</p>
            </div>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
