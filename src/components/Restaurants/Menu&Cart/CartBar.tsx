"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import {  FaTimes } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
interface Props{
    counter :number;
    clicked:boolean;
    setClicked:Dispatch<SetStateAction<boolean>>;
    restoId:any
}

const CartBar = ({ counter,clicked,setClicked,restoId }:Props) => {
    useEffect(() => {
        localStorage.setItem("Clicked", JSON.stringify(clicked));
    }, [clicked]);
    const router =useRouter();
    return (
        <div
            className={`fixed bottom-0 left-0 w-full p-4 text-center z-50 bg-gradient-to-r from-blue-500 to-indigo-700 text-white shadow-lg transition-transform duration-500 ${
                clicked ? "translate-y-0" : "translate-y-full"
            }`}
        >
            <div className="flex justify-between items-center px-4">
                <div className="flex items-center text-center  "onClick={()=>router.push(`/services/restaurants/${restoId}/cart`)}>
                    {window.location.pathname.includes("/menu") && (
                        <>
                            <FaCartShopping size={30} onClick={()=>{}} className="text-white mr-2" />
                            <span className="bg-white text-blue-700 h-10 w-10 flex items-center justify-center rounded-full font-bold">
                                {counter}
                            </span>
                        </>
                    )}
                </div>
                <button
                    className="text-white hover:text-gray-200 transition duration-300"
                    onClick={() => setClicked(false)}
                >
                    <FaTimes size={25} />
                </button>
            </div>
        </div>
    );
};

export default CartBar;
