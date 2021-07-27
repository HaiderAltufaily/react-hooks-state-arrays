import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood, newSpicyFoods } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  console.log(foods);

  const [filterBy, setFilterBy] = useState("All");
  function select(e) {
    setFilterBy(e.target.value);
  }
  const displayNewFood = foods.filter((food) => {
    if (filterBy === "All") return true;
    else {
      return food.cuisine === filterBy;
    }
  });
  function handleAddFood() {
    const newFood = getNewSpicyFood();
    setFoods((foods) => [...foods, newFood]);
  }
  function handleLiClick(li) {
    const itemName = +li.target.getAttribute("name");
    const newArray = foods.map((food) =>
      food.id === itemName ? { ...food, heatLevel: food.heatLevel + 1 } : food
    );
    setFoods(newArray);
  }
  const foodList = displayNewFood.map((food) => {
    return food ? (
      <li onClick={handleLiClick} name={food.id} key={food?.id}>
        {" "}
        {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}{" "}
      </li>
    ) : null;
  });

  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
      <select onClick={select} name="filter">
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
    </div>
  );
}

export default SpicyFoodList;
