"use client";
import { createSlice } from "@reduxjs/toolkit";
export interface user {
  userInfo: object | null;
  userToken: string;
}
const initialState: user = {
  userInfo: {}, //for user object
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
      state.userInfo = null;
      state.userToken = "";
    },
    setCredentials: (state: user, { payload }) => {
      window.localStorage.setItem("userToken", payload.userToken);
      state.userInfo = payload;
      state.userToken = payload.userToken;
    },
  },
});
export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
