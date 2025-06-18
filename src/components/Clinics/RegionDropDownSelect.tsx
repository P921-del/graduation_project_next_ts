"use client";
import "../../styles/CityDropDownSelect.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import React, { useRef, useState } from "react";
import { patrik_hand } from "../../app/services/clinics/page";
function RegionDropDownSelect() {
  const alexandria_regions: string[] = [
    "Abees",
    "Abou Kier",
    "Al-Azarita",
    "AlAkbal",
    "Al-Ebrahimia",
    "Algamarik",
    "Alkothra",
    "Aldaklia",
    "Alras Alaswad",
    "North Coast",
    "El-Siouf",
    "Elshatbi",
    "Al Amereyah",
    "Agami",
    "Asafra",
    "Alataren",
    "Alawweid",
    "Alkobari",
    "Allban",
    "Almahrousa",
    "Almamora",
    "Almix",
    "Montazah",
    "El-Mandara",
    "Almandra",
    "Manshia",
    "Wardian",
    "Bab Alsharq",
    "Bakos",
    "Bahari",
    "Borg El-Arab",
    "Bokla",
    "Tahwrat",
    "Ganaklis",
    "Glym",
    "Gamal Abd El-Nasir Rd",
    "Ganaklis",
    "Ras Altnein",
    "Ragheb Basha",
    "Roushdi",
    "Zizinia",
    "Saba Basha",
    "San Stefano",
    "Sporting",
    "Stanli",
    "Semouha",
    "Sidi Beshr",
    "Sidi Gaber",
    "Fouad street",
    "Shatabi",
    "Shoutus",
    "Tosoun",
    "Amoud Alswari",
    "Flaming",
    "Victoria",
    "camp caesar",
    "Karmouz",
    "Kafr Abdou",
    "Cleopatra",
    "Koum Daka",
    "King Mariout",
    "Loran",
    "Moharem Bek",
    "Mahatet El Raml",
    "Mahatet Masr",
    "Mostafa Kamel",
    "Miami",
    "Wabor Almiyah",
    "Waingit",
  ];
  const cairo_regions = [
    "Al Sades Mn October",
    "First Settlement",
    "Fifth assembly",
    "Dokki and Al-Mohandseen",
    "Al Rehab",
    "Al Zamalek",
    "Al- Zaytoun",
    "al sayyida zaynab",
    "Al Shorouq",
    "Sheikh Zayed",
    "El Asher Mn Ramadan",
    "Abassiya",
    "Agouza",
    "Almarg",
    "Maadi",
    "Mokattam",
    "Manial",
    "Al Haram",
    "Warag",
    "Imbaba",
    "Bolag AlDakror",
    "Hadayek Al Ahram",
    "Gardens of the dome",
    "Helwan",
    "Dal Elsalam",
    "Shoubra",
    "Shubra Alkheema",
    "Ain Shams",
    "Feisal",
    "Al Obour City",
    "Madinaty",
    "Salam City",
    "Badr City",
    "Nasr City",
    "Heliopolis",
    "Misr Al Qadimah",
    "Midan Giza",
    "Down Town",
  ];
  const regionDropDownSelect = useRef<HTMLInputElement>(null);
  const regionDropDownList = useRef<HTMLUListElement>(null);
  const [selectRegionToggle, setSelectRegionToggle] = useState<boolean>(false);
  return (
    <div className="select-box w-full h-full lg:relative">
      <div className="input-container">
        <input
          ref={regionDropDownSelect}
          onKeyDown={(e) => e.preventDefault()}
          onClick={() => setSelectRegionToggle(!selectRegionToggle)}
          onBlur={() => setSelectRegionToggle(false)}
          placeholder={
            sessionStorage.getItem("regionValue")
              ? JSON.parse(sessionStorage.getItem("regionValue") as string)
              : "Region"
          }
          className={
            patrik_hand.className +
            " selected placeholder: " +
            patrik_hand.className
          }
          style={{ caretColor: "transparent" }}
          id="region"
          name="region"
          value={
            sessionStorage.getItem("regionValue")
              ? JSON.parse(sessionStorage.getItem("regionValue") as string)
              : "Region"
          }
          autoFocus={false}
          autoComplete="false"
        />
        {selectRegionToggle ? (
          <IoMdArrowDropup className="arrow bg-transparent" />
        ) : (
          <IoMdArrowDropdown className="arrow bg-transparent" />
        )}
      </div>
      {/*حتة مهمة ازاى تقلب العنصر تخلى الleft-0 right-0 bottom-[100%]  */}
      <ul
        className={
          selectRegionToggle
            ? "options-container active lg:absolute lg:left-0 lg:right-0 lg:bottom-[100%]"
            : "options-container lg:absolute lg:left-0 lg:right-0 lg:bottom-[100%]"
        }
        ref={regionDropDownList}
      >
        {sessionStorage.getItem("cityValue") !== null
          ? JSON.parse(sessionStorage.getItem("cityValue") as string) ===
            "Cairo"
            ? cairo_regions.map((item) => (
                <li
                  key={Math.floor(Math.random() * 1000000 + 1)}
                  onMouseDown={() => {
                    if (regionDropDownSelect.current) {
                      console.log("Iam Clicked");
                      sessionStorage.setItem(
                        "regionValue",
                        JSON.stringify(item)
                      );
                      regionDropDownSelect.current.placeholder =
                        sessionStorage.getItem("regionValue") !== null
                          ? JSON.parse(
                              sessionStorage.getItem("regionValue") as string
                            )
                          : "Region";
                      setSelectRegionToggle(false);
                    }
                  }}
                  className={patrik_hand.className + " option"}
                >
                  {item}
                </li>
              ))
            : JSON.parse(sessionStorage.getItem("cityValue") as string) ===
              "Alexandria"
            ? alexandria_regions.map((item) => (
                <li
                  key={Math.floor(Math.random() * 1000000 + 1)}
                  onMouseDown={() => {
                    if (regionDropDownSelect.current) {
                      sessionStorage.setItem(
                        "regionValue",
                        JSON.stringify(item)
                      );
                      regionDropDownSelect.current.placeholder =
                        sessionStorage.getItem("regionValue") !== null
                          ? JSON.parse(
                              sessionStorage.getItem("regionValue") as string
                            )
                          : "Region";
                      setSelectRegionToggle(false);
                    }
                  }}
                  className={patrik_hand.className + " option"}
                >
                  {item}
                </li>
              ))
            : null
          : null}
      </ul>
    </div>
  );
}

export default RegionDropDownSelect;
