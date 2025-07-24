import React, { useEffect } from "react";
import "./FoodItems.css";
import FoodItem from "../foodItem/FoodItem";
import { useSelector,useDispatch } from "react-redux";
import {fetchFoodList} from "../../store/slices/foodSlice.js"
import { BASE_URL } from "../../config/api.js";


const FoodItems = ({ catagary }) => {
  const dispach = useDispatch()
  const {food_list}=  useSelector((state)=>state.food)

  
  useEffect(()=>{
    dispach(fetchFoodList())
  },[dispach])
  
  return (
    <div className="food-items">
      <h2>Top Dishes near You</h2>
      <div className="show-food-items">
        {food_list.map((item, index) => {
          if (catagary === "ALL" || catagary === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                description={item.description}
                image={`${BASE_URL}/images/${item.image}`}
                name={item.name}
                price={item.price}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodItems;
