"use client";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
type Props = {
  id: number;
  name: string;
  type: string;
  address: string;
  phone_number: string;
};
function School(props: Props) {
  return (
    <div
      id={props.id + ""}
      className="group transition duration-1000 ease-in hover:ease-out w-full h-full border-4 border-dashed border-gray-200  flex flex-col items-center justify-center text-center hover:bg-HeaderRestaurantComponentBackgroundImage hover:bg-blue-500 hover:bg-blend-multiply"
    >
      <h1 className="group-hover:text-white text-black text-2xl font-serif mb-4">
        {props.name}
      </h1>
      <div className="group-hover:text-white text-gray-700 text-base font-sans mb-4">
        <div className="flex items-center justify-center gap-3 cursor-pointer">
          <FaLocationDot />
          <p>{props.address}</p>
        </div>
      </div>
      <h2 className="group-hover:text-white text-gray-700 text-base font-sans mb-4">
        <span>Type : </span> {props.type}
      </h2>
      <div className="group-hover:text-white text-blue-400 text-base font-sans mt-4 bg-gray-300 w-full flex items-center justify-center">
        <span className="flex items-center justify-center gap-3 cursor-pointer">
          <FaPhone /> Phone Number:{" "}
          <span className="group-hover:text-black underline">
            {props.phone_number}
          </span>
        </span>
      </div>
    </div>
  );
}

export default School;
