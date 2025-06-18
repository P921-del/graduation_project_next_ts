"use client";
import { createSlice } from "@reduxjs/toolkit";
const numberOfShowingClinics = window.sessionStorage.getItem(
  "numberOfShowingClinics"
)
  ? JSON.parse(
      window.sessionStorage.getItem("numberOfShowingClinics") as string
    )
  : 2;
const initialState = {
  numberOfShowingClinics,
};

const clinicIndexSlice = createSlice({
  name: "clinicIndex",
  initialState,
  reducers: {
    setnumberOfShowingClinics: (state, { payload }) => {
      debugger;
      sessionStorage.setItem(
        "numberOfShowingClinics",
        JSON.stringify(payload + 2)
      );
      state.numberOfShowingClinics = payload + 2;
    },
  },
});
export const { setnumberOfShowingClinics } = clinicIndexSlice.actions;
export default clinicIndexSlice.reducer;
