"use client";
import "../../styles/CityDropDownSelect.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";
import { patrik_hand } from "../../app/services/clinics/page";
function SpecialtyDropDownSelect() {
  const specialties: string[] = [
    "Specialty", // This is typically a placeholder option. You can choose to exclude it.
    "عيادة باطنة",
    "عيادة أسنان",
    "عيادة عيون",
    "عيادة تغذية علاجية",
    "عيادة علاج طبيعي",
    "عيادة عظام",
    "عيادة نفسية",
    "عيادة أنف وأذن وحنجرة",
    "عيادة مخ وأعصاب",
    "عيادة مسالك بولية",
    "عيادة نساء وتوليد",
    "عيادة تجميل",
    "عيادة جراحة عامة",
    "عيادة قلب وأوعية دموية",
    "عيادة صدر وجهاز تنفسي",
  ];
  const specialtyDropDownSelect = useRef<HTMLInputElement>(null);
  const [selectToggle, setSelectToggle] = useState<boolean>(false);
  useEffect(() => {
    if (selectToggle) {
    }
  }, [selectToggle]);
  return (
    <div className="select-box w-full h-full lg:relative">
      <div className="input-container">
        <input
          ref={specialtyDropDownSelect}
          onKeyDown={(e) => e.preventDefault()}
          onClick={() => setSelectToggle(!selectToggle)}
          onBlur={() => setSelectToggle(false)}
          placeholder={
            sessionStorage.getItem("specialtyValue")
              ? JSON.parse(sessionStorage.getItem("specialtyValue") as string)
              : "Specialty"
          }
          className={
            patrik_hand.className +
            " selected placeholder: " +
            patrik_hand.className
          }
          style={{ caretColor: "transparent" }}
          id="specialty"
          name="specialty"
          onChange={(e) => e.preventDefault()}
          value={
            sessionStorage.getItem("specialtyValue")
              ? JSON.parse(sessionStorage.getItem("specialtyValue") as string)
              : ""
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
          selectToggle
            ? "options-container active max-h-60 lg:absolute lg:left-0 lg:right-0 lg:bottom-[100%]"
            : "options-container lg:absolute lg:left-0 lg:right-0 lg:bottom-[100%]"
        }
      >
        {specialties.map((item) => (
          <li
            key={specialties.indexOf(item) + 1}
            onMouseDown={() => {
              if (specialtyDropDownSelect.current) {
                sessionStorage.setItem("specialtyValue", JSON.stringify(item));
                specialtyDropDownSelect.current.placeholder =
                  sessionStorage.getItem("specialtyValue") !== null
                    ? JSON.parse(
                        sessionStorage.getItem("specialtyValue") as string
                      )
                    : "Specialty";
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

export default SpecialtyDropDownSelect;
