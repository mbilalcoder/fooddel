import React, { useEffect, useState } from "react";
import "./orders.css";
import { BASE_URL } from "../../config/api.js";
import axios from "axios";
import {assets} from "../../assets/assets.js"

const Orders = () => {
  const url = BASE_URL;
  const [ordersForAdmin, setOrdersForAdmin] = useState([]);

  const fetchOrders = async () => {
    try {
      const data = await axios.get(`${url}/api/order/getordersforadmin`);
      if (data.data.success) {
        setOrdersForAdmin(data.data.ordersData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const delOrder = async (id) => {
    const response = await axios.get(
      `${url}/api/order/delorder`,
      { headers: { orderid: id } }
    );
    if (response.data.success) {
      fetchOrders()
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container">
      <h3>All Orders</h3>
      <div className="items">
        <div className="item_heading">
          <p className="heading"></p>
          <p className="heading">Date</p>
          <p className="heading">Items</p>
          <p className="heading">Amount</p>
          <p className="heading">action</p>
        </div>
        <hr />
        {ordersForAdmin.length > 0 ? (
          ordersForAdmin.map((item, ind) => (
            <div className="item" key={ind}>
              <img src={assets.parcel_icon} alt="parcel" />{" "}
              {/* or use a valid image */}
              <p>{item.date}</p>
              <p>
                {item.items.map((i, subInd) => (
                  <span key={subInd}>
                    {i.name} {i.quantity} x {i.price}
                    {subInd < item.items.length - 1 && ", "}
                  </span>
                ))}
              </p>
              <p>{item.amount}</p>
              <p>
                <button onClick={() => delOrder(item._id)}>Delete</button>
              </p>
            </div>
          ))
        ) : (
          <p>no item found</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
