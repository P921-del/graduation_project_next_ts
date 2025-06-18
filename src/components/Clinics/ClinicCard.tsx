"use client";
import React, { useState } from "react";
type Props = {
  id: number;
  name: string;
  image: string;
};

function ClinicCard(props: Props) {
  const [showBookAppointmentButton, setshowBookAppointmentButton] =
    useState<boolean>(false);
  return (
    <div
      className={
        "relative bg-slate-50 flex flex-col justify-center hover:cursor-pointer h-72 rounded-md hover:rounded-br-none hover:rounded-bl-none"
      }
      onMouseEnter={() => {
        setshowBookAppointmentButton(true);
      }}
      onMouseLeave={() => {
        setshowBookAppointmentButton(false);
      }}
    >
      <div className="w-[80%] mt-8 mx-auto shadow-2xl shadow-gray-300 border-4 border-white">
        <img className="w-full h-40" src={props.image} alt={props.name} />
      </div>
      <h2 className="w-full h-1/4 flex items-center justify-center text-black text-[17px] font-sans font-semibold tracking-tight">
        {props.name}
      </h2>

      <div
        className={
          !showBookAppointmentButton
            ? "opacity-0 translate-y-[0] flex items-center justify-center transition-all duration-1000 ease-out"
            : "z-20 h-1/4 rounded-br-lg rounded-bl-lg opacity-100 translate-y-[90%] flex items-center justify-center bg-slate-50 transition-all duration-500 ease-in"
        }
      >
        <button
          className="text-white h-10 bg-blue-900 w-3/4 rounded-md"
          type="button"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}

export default ClinicCard;
