import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
export const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Los mejores platos cerca de ti</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                _id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};
