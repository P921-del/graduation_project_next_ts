"use client";
import { patrik_hand } from "../../app/services/clinics/page";
function SearchByClinicName() {
  return (
    <input
      placeholder={"Search by clinic name"}
      className={
        patrik_hand.className +
        " w-full h-full py-3 px-4 shadow-none cursor-pointer bg-gray-50 border border-gray-300 text-xl text-gray-700 focus:cursor-pointer focus:border-gray-300 focus:shadow-md focus:shadow-gray-300 placeholder:text-gray-400 placeholder:text-xl selection:text-white selection:bg-blue-900 placeholder: " +
        patrik_hand.className
      }
      id="clinic_name"
      name="clinic_name"
      autoComplete={"false"}
    />
  );
}

export default SearchByClinicName;
