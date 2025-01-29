import { configureStore } from "@reduxjs/toolkit";
import { RootReducers } from "./RootReducers.ts";
import { AdminApi } from "./services/authServiec.ts";
export const store = configureStore({
  reducer: RootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AdminApi.middleware),
});
