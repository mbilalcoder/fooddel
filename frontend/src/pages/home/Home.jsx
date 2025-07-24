import { useState } from "react";
import ExploreMenu from "../../components/explore-menu/ExploreMenu";
import FoodItems from "../../components/food-items/FoodItems";
import HeroSec from "../../components/hero-section/HeroSec";
import "./home.css";

const Home = () => {
  const [catogary, setCatogary] = useState("ALL");
  return (
    <div>
      <HeroSec />
      <ExploreMenu catogary={catogary} setCatogary={setCatogary} />
      <FoodItems catagary={catogary} />
    </div>
  );
};

export default Home;
