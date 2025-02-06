"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { store } from "@/lib/store";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/Slices/auth/authSlice";
export const AccountDropDownList = () => {
  const router = useRouter();
  const dispatchStore = useDispatch();
  const [logoutClicked, setLogoutClicked] = useState<boolean>(false);
  return (
    <div className="absolute top-[10%] right-[8%] z-50">
      <div className="Lis bg-white  rounded-xl  w-40 overflow-hidden ">
        {store.getState().auth.userToken !== "" ? (
          <ul className="p-0.5 ">
            <li
              onClick={() => {
                dispatchStore(logout());
                setLogoutClicked(true);
              }}
              className="pl-2 py-2  border-b border-gray-400  duration-500 ease-in-out hover:brightness-95 mb-1 bg-gray-50 hover:text-gray-600   text-gray-400 text-xl font-serif "
            >
              <Link
                className=" hover:translate-x-4 duration-500 ease-in-out inline-block"
                href={"#"}
              >
                Logout
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="p-0.5 ">
            <li
              onClick={() => {
                router.push("/login");
              }}
              className="pl-2 py-2  border-b border-gray-400  duration-500 ease-in-out hover:brightness-95 mb-1 bg-gray-50 hover:text-gray-600   text-gray-400 text-xl font-serif "
            >
              <Link
                className=" hover:translate-x-4 duration-500 ease-in-out inline-block"
                href={"#"}
              >
                Login
              </Link>
            </li>
            <li
              onClick={() => {
                router.push("/register");
              }}
              className="pl-2 py-2   duration-500 ease-in-out hover:brightness-95 mb-1 bg-gray-50  hover:text-gray-600   text-gray-400 text-xl font-serif "
            >
              <Link
                href="#"
                className=" hover:translate-x-4 duration-500 ease-in-out inline-block"
              >
                Signup
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
