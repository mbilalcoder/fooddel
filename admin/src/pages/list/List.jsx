import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { BASE_URL } from "../../config/api";

const List = () => {

  const [list, setList] = useState([])

  const url = BASE_URL
  const getList = async ()=>{
    try {
      const response = await axios.get(`${url}/api/food/list`)
      setList(response.data.data)
    } catch (error) {
      console.log("error")
    }
  }

  const delItem = async (id)=>{
    try {
      const response = await axios.post(`${url}/api/food/remove`,{id})
      if(response.data.success){
        getList()
      }
    } catch (error) {
      console.log("error")
    }
  }

  useEffect(()=>{
    getList()
  },[])

  return (
    <div className="list add flex-col">
      <p>All foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item, ind)=>{
          return(

        <div key={item._id} className="list-table-format">
          <img src={`${url}/images/${item.image}`} alt={item.image} />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>{item.price}</p>
          <p onClick={()=>delItem(item._id)} className="curser">X</p>
        </div>
          )
        })}
      </div>
    </div>
  );
};

export default List;
