import { createSlice } from "@reduxjs/toolkit";
import { getInitialStateFromLocalStorage } from "@/components/Account Pages/Login";
export interface user {
  userInfo: object | null;
  userToken: string | null;
}
const userToken = getInitialStateFromLocalStorage(); // initialize userToken from local storage
const initialState: user = {
  userInfo: {}, //for user object
  userToken, //for storing the JWT token
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: user) => {
      localStorage.removeItem("userToken"); //deletes userToken from localStorage
      state.userInfo = null;
      state.userToken = null;
    },
    setCredentials: (state: user, { payload }) => {
      state.userInfo = payload;
      state.userToken = payload.userToken;
      localStorage.setItem("userToken", payload.userToken);
    },
  },
});
export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
