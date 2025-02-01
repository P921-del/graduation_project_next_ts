"use client";
import React from "react";
type Props = {
  id: number;
  name: string;
  description: string;
};
function Restaurant(props: Props) {
  return (
    <div
      id={props.id + ""}
      className="group transition duration-1000 ease-in hover:ease-out w-full h-full border-4 border-dashed border-gray-200  flex flex-col items-center justify-center text-center hover:bg-HeaderRestaurantComponentBackgroundImage hover:bg-blue-500 hover:bg-blend-multiply"
    >
      <h1 className="group-hover:text-white text-black text-2xl font-serif mb-4">
        {props.name}
      </h1>
      <p className="group-hover:text-white text-gray-700 text-base font-sans mb-4">
        {props.description}
      </p>
      <button className="group-hover:text-white text-blue-400 text-base font-sans mt-4 cursor-pointer">
        Order Now
      </button>
    </div>
  );
}

export default Restaurant;
