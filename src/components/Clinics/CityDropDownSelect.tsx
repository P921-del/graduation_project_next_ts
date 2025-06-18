"use client";
import "../../styles/CityDropDownSelect.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";
import { patrik_hand } from "../../app/services/clinics/page";
function CityDropDownSelect() {
  const cities: string[] = ["Cairo", "Alexandria"];
  const cityDropDownSelect = useRef<HTMLInputElement>(null);
  const [selectToggle, setSelectToggle] = useState<boolean>(false);
  useEffect(() => {
    if (selectToggle) {
    }
  }, [selectToggle]);
  return (
    <div className="select-box w-full h-full">
      <div className="input-container">
        <input
          ref={cityDropDownSelect}
          onKeyDown={(e) => e.preventDefault()}
          onClick={() => setSelectToggle(!selectToggle)}
          onBlur={() => setSelectToggle(false)}
          placeholder={
            sessionStorage.getItem("cityValue")
              ? JSON.parse(sessionStorage.getItem("cityValue") as string)
              : "City"
          }
          className={
            patrik_hand.className +
            " selected placeholder: " +
            patrik_hand.className
          }
          style={{ caretColor: "transparent" }}
          id="city"
          name="city"
          value={
            sessionStorage.getItem("cityValue")
              ? JSON.parse(sessionStorage.getItem("cityValue") as string)
              : "City"
          }
          autoFocus={false}
          autoComplete="false"
        />
        {selectToggle ? (
          <IoMdArrowDropup className="arrow bg-transparent" />
        ) : (
          <IoMdArrowDropdown className="arrow bg-transparent" />
        )}
      </div>
      <ul
        className={
          selectToggle ? "options-container active" : "options-container"
        }
      >
        {cities.map((item) => (
          <li
            key={cities.indexOf(item) + 1}
            onMouseDown={() => {
              if (cityDropDownSelect.current) {
                sessionStorage.setItem("cityValue", JSON.stringify(item));
                cityDropDownSelect.current.placeholder =
                  sessionStorage.getItem("cityValue") !== null
                    ? JSON.parse(sessionStorage.getItem("cityValue") as string)
                    : "City";
                setSelectToggle(false);
              }
            }}
            className={patrik_hand.className + " option"}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CityDropDownSelect;
