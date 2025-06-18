"use client";
import Link from "next/link";
import { HiUser } from "react-icons/hi";
import { AccountDropDownList } from "./AccountDropDownList";

import { useContext, useState,useEffect } from "react";
import { ServicesDropDownList } from "./ServicesDropDownList";
import { redirect } from "next/navigation";
import { ManageRestoContext } from "@/app/Context/ManageRestoContext";
import { store } from "../lib/store";
import { backendURL } from "@/lib/Slices/auth/authRules";

export default function Navbar() {
  const [profileImage, setProfileImage] = useState<string | undefined>("");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://citypulse.runasp.net/api/User/GetUserById/${
            store.getState().auth.user?.id
          }`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${store.getState().auth.userToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.profileImage !== "") setProfileImage(data.profileImage);
        }
      } catch (e) {
        console.log("Error", e);
      }
    }
    fetchData();
  }, [store.getState().auth.user?.id]);
  const sendFromChild: (change: boolean) => void = (change) => {
    if (change === false) {
      setProfileImage("");
    }
  };
  const [clickAc, setClickedAc] = useState<boolean>(false);
  const [clickSer, setClickedSer] = useState<boolean>(false);
  const{counter}=useContext(ManageRestoContext);

  const sendFromChildTwo: (click: boolean) => void = (click) => {
    if (click == true) setClickedAc(true);
    else setClickedAc(false);
  };
  const sendFromServicesDropDownList: (click: boolean) => void = (click) => {
    if (click == true) setClickedSer(true);
    else setClickedSer(false);
  };
  return (
    <div className="nav justify-between bg-gray-100 h-16 flex items-center shadow-md shadow-gray-300">
      <div className="logo  flex  items-center ml-4">
        <div className="w-10 h-10 rounded-full">
          <img
            className=" rounded-full"
            src={"/assets/Images/logo/services-provider-logo.jpg"}
            alt={"services-provider-logo"}
          />
        </div>
        <h3
          onClick={() => {
            redirect("/");
          }}
          className=" hover:cursor-pointer ml-2 text-2xl font-serif italic text-cyan-900"
        >
          City Guide
        </h3>
      </div>
      <div className="linkes mr-32 ">
        <div className="lis flex justify-center w-full">
          <ul className="flex justify-center h-full items-center">
            <li
              onClick={() => {
                setClickedSer((el) => !el);
              }}
              className="ml-20 hover:cursor-pointer text-cyan-900 text-2xl font-serif font-bold italic hover:text-cyan-400 duration-500 ease-in-out"
            >
              Services
            </li>
            {clickSer && (
              <ServicesDropDownList
                sendFromServicesDropDownList={sendFromServicesDropDownList}
              />
            )}
            <li className="ml-20 text-cyan-900 text-2xl font-serif font-bold italic hover:text-cyan-400 duration-500 ease-in-out">
              <Link href="/about">About</Link>
            </li>
            <li className="ml-20 text-cyan-900 text-2xl font-serif font-bold italic hover:text-cyan-400 duration-500 ease-in-out">
              <Link href="/contact-us">Contact</Link>
            </li>
            <li
              onClick={() => {
                setClickedAc((el) => !el);
              }}
              className="relative ml-20 hover:cursor-pointer text-cyan-900 text-2xl font-serif font-bold italic hover:text-cyan-400 duration-500 ease-in-out"
            >
              {store.getState().auth.userToken === null ? (
                <HiUser
                  onMouseLeave={() => setClickedAc(false)}
                  className="h-10 w-10 text-blue-500 rounded-full shadow-blue-300 shadow-lg hover:shadow-none transition-all duration-300 ease-in-out"
                />
              ) : (
                <img
                  onMouseLeave={() => setClickedAc(false)}
                  className="h-10 w-10 rounded-full shadow-blue-300 shadow-lg hover:shadow-none transition-all duration-300 ease-in-out"
                  src={backendURL + "/" + profileImage}
                  alt="Profile Image"
                />
              )}
              {clickAc && (
                <AccountDropDownList
                  sendFromChildTwo={sendFromChildTwo}
                  sendFromChild={sendFromChild}
                />
              )}
            </li>
            {clickAc && <AccountDropDownList />}
          
r
          </ul>
        </div>
      </div>
    </div>
  );
}
