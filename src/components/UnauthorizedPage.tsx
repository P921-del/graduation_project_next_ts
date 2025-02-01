"use client";
import React from "react";
import { IoHandRightOutline } from "react-icons/io5";
function UnauthorizedPage() {
  return (
    <div className="h-[100vh] bg-gray-200 flex justify-center items-center">
      <div className="w-3/4 h-1/2 mx-auto rounded-full bg-red-500 border-2 border-red-700 flex flex-col items-center justify-center gap-5">
        <IoHandRightOutline className="text-8xl text-white" />
        <p className="text-white text-2xl font-sans font-bold">
          You don&apos;t have acces to requested page{" "}
        </p>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
