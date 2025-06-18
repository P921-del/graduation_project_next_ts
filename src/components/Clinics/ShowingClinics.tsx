"use client";
import React, { useEffect, useState } from "react";
import { patrik_hand } from "@/app/services/clinics/page";
import { store } from "@/lib/store";
import { setnumberOfShowingClinics } from "@/lib/Slices/clinics/clinicIndexSlice";
type Props = {
  numberOftotalClinics: number;
};
const ShowingClinics = (props: Props) => {
  console.log(props.numberOftotalClinics);
  const [numberOfshowingClinics, setnumberOfshowingClinics] = useState<number>(
    store.getState().clinicIndex.numberOfShowingClinics
  );
  useEffect(() => {
    console.log("I am Salem");
    setnumberOfshowingClinics(
      store.getState().clinicIndex.numberOfShowingClinics
    );
    console.log("Number modified to ", numberOfshowingClinics);
  }, [store.getState().clinicIndex]);
  return (
    <>
      <div
        className={
          patrik_hand.className +
          " bg-transparent h-36 flex items-center justify-center"
        }
      >
        <div className="flex flex-row gap-x-1 text-xl">
          <span>showing:</span>
          <span> {numberOfshowingClinics}</span>
          <span>clinics from:</span>
          <span>total</span>
          <span>{props.numberOftotalClinics}</span>
          <span>clinics</span>
        </div>
      </div>
    </>
  );
};
export default ShowingClinics;
