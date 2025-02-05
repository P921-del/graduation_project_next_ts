"use client";
import { createSlice } from "@reduxjs/toolkit";
export interface user {
  userToken: string;
}
const initialState: user = {
  userToken: window.localStorage.getItem("userToken")
    ? String(window.localStorage.getItem("userToken"))
    : "", //for storing the JWT token
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: user) => {
      window.localStorage.removeItem("userToken"); //deletes userToken from localStorage
      state.userToken = "";
    },
    setCredentials: (state: user, { payload }) => {
      window.localStorage.setItem("userToken", payload);
      state.userToken = payload;
    },
  },
});
export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
