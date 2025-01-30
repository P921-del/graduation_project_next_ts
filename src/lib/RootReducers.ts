import { AdminApi } from "./services/authServiec";
import authReducer from "./Slices/auth/authSlice";
export const RootReducers = {
  auth: authReducer,
  [AdminApi.reducerPath]: AdminApi.reducer,
};
