"use client";
import { createSlice } from "@reduxjs/toolkit";
import { userObject } from "../../../utils/types";
export interface user {
  userToken: string | null;
  user: userObject | null;
}
const userFromLocalStorage = window.localStorage.getItem("user")
  ? JSON.parse(window.localStorage.getItem("user") as string)
  : null; //for storing the user details;
const initialState: user = {
  userToken: window.localStorage.getItem("userToken")
    ? String(window.localStorage.getItem("userToken"))
    : null, //for storing the JWT token
  user: userFromLocalStorage,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: user) => {
      window.localStorage.removeItem("userToken"); //deletes userToken from localStorage
      window.localStorage.removeItem("user"); //deletes user from localStorage
      state.userToken = null;
      state.user = null;
    },
    setCredentials: (state: user, { payload }) => {
      debugger;
      window.localStorage.setItem("userToken", payload.userToken);
      window.localStorage.setItem("user", JSON.stringify(payload.user));
      state.userToken = payload.userToken;
      state.user = payload.user;
    },
  },
});
export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
