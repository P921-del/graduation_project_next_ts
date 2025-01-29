import { AdminApi } from "./services/authServiec.ts";
import authReducer from "./Slices/auth/authSlice.ts";
export const RootReducers = {
  auth: authReducer,
  [AdminApi.reducerPath]: AdminApi.reducer,
};
