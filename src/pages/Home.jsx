import React from "react";
import HomeSlider from "../components/Home/home-slider/HomeSlider";
import CategoriesSlider from "../components/Home/category-slider/CategoriesSlider";
import Products from "../components/Home/Products";

function Home() {
  return (
    <>
      <HomeSlider />
      <CategoriesSlider />
      <Products />
    </>
  );
}

export default Home;
