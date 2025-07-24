import React from "react";
import { menu_list } from "../../assets/frontend_assets/assets";
import "./exploreMenu.css";

const ExploreMenu = ({ catogary, setCatogary }) => {
  return (
    <div className="explore-menu">
      <h1>Explore Our Menu</h1>

      <p>Lorem ipsum dolor sit amet consectetur adipisicing eli</p>
      
      <div className="menu-items">
        
        {menu_list.map((item, index) => {
          return (
            <div
              className="menu-item"
              key={index}
              onClick={() =>
                setCatogary((prev) =>
                  prev === item.menu_name ? "ALL" : item.menu_name
                )
              }
            >
              <img
                className={catogary === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt={item.menu_name}
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
