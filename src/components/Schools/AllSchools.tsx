"use client";
import React from "react";
import { useState, useEffect } from "react";
import School from "./School";

const AllSchools = () => {
  interface school {
    id: number;
    name: string;
    type: string;
    address: string;
    phone_number: string;
  }
  const schools: school[] = [];
  const initialState = {
    loading: false,
    schools,
  };
  const [AllSchools, setAllSchools] = useState(initialState);
  useEffect(() => {
    setAllSchools({ ...AllSchools, loading: true });

    const timeout = setTimeout(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("/Data/all-schools.json");
          const data = await response.json();
          //first convert the json object to string json object and then convert to javascript object
          //const results = JSON.parse(data);
          //only put the results in the state (the actual users array)
          setAllSchools({ schools: data, loading: false });
        } catch (error) {
          console.log("error: ", error);
        }
      };
      fetchData();
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className="mt-32">
      <h1 className="text-black text-4xl font-serif font-bold mb-4 text-center">
        The closest government school to your location is in Assiut
      </h1>
      {AllSchools.loading ? (
        <div
          aria-label="Loading..."
          role="status"
          className="flex items-center space-x-2"
        >
          <svg
            className="h-20 w-20 animate-spin stroke-blue-600"
            viewBox="0 0 256 256"
          >
            <line
              x1="128"
              y1="32"
              x2="128"
              y2="64"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="195.9"
              y1="60.1"
              x2="173.3"
              y2="82.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="224"
              y1="128"
              x2="192"
              y2="128"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="195.9"
              y1="195.9"
              x2="173.3"
              y2="173.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="128"
              y1="224"
              x2="128"
              y2="192"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="60.1"
              y1="195.9"
              x2="82.7"
              y2="173.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="32"
              y1="128"
              x2="64"
              y2="128"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="60.1"
              y1="60.1"
              x2="82.7"
              y2="82.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
          </svg>
          <span className="text-4xl font-medium text-blue-600">Loading...</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 grid-rows-3 w-[95%] mx-auto gap-8 h-[900px]">
          {AllSchools.schools?.map((school) => (
            <School key={school.id} {...school} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllSchools;
