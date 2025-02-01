"use client";
import React from "react";
import MainHeaderForEachComponent, {
  ImainRestaurantHeader,
} from "../mainHeaderForEachComponent";
import FeaturedRestaurantsPartners from "./FeaturedRestaurants";
function Restaurants() {
  const mainHeaderForRestaurantComponent: ImainRestaurantHeader = {
    image:
      "url('/assets/Restaurants/mainComponentBackgroundInRestaurantComponent.jpg')",
    text: "Restaurant Partners",
  };
  return (
    <div className="mb-4">
      <MainHeaderForEachComponent
        mainHeader={mainHeaderForRestaurantComponent}
      />
      <FeaturedRestaurantsPartners />
    </div>
  );
}

export default Restaurants;
