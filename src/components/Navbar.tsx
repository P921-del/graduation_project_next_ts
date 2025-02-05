"use client";
import Link from "next/link";
import { HiUser } from "react-icons/hi";
import { AccountDropDownList } from "./AccountDropDownList";
import { useState } from "react";
import { ServicesDropDownList } from "./ServicesDropDownList";
import { redirect } from "next/navigation";
export default function Navbar() {
  const [clickAc, setClickedAc] = useState<boolean>(false);
  const [clickSer, setClickedSer] = useState<boolean>(false);
  return (
    <div className="nav justify-between bg-gray-100 h-16 flex items-center shadow-md shadow-gray-300">
      <div className="logo  flex  items-center ml-4">
        <div className="w-10 h-10 rounded-full bg-blue-500"></div>
        <h3
          onClick={() => {
            redirect("/");
          }}
          className=" hover:cursor-pointer ml-2 text-2xl font-serif italic text-cyan-900"
        >
          Assiu5damat
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
            {clickSer && <ServicesDropDownList />}
            <li className="ml-20 text-cyan-900 text-2xl font-serif font-bold italic hover:text-cyan-400 duration-500 ease-in-out">
              <Link href="/about">About</Link>
            </li>
            <li className="ml-20 text-cyan-900 text-2xl font-serif font-bold italic hover:text-cyan-400 duration-500 ease-in-out">
              <Link href="#/edf">Contact</Link>
            </li>
            <li
              onClick={() => {
                setClickedAc((el) => !el);
              }}
              className="ml-20 hover:cursor-pointer text-cyan-900 text-2xl font-serif font-bold italic hover:text-cyan-400 duration-500 ease-in-out"
            >
             <HiUser className="h-10 w-10 text-blue-500" />
            </li>
            {clickAc && <AccountDropDownList />}
          </ul>
        </div>
      </div>
    </div>
  );
}
