import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import fetchDataSlice from "./slice/fetchDataSlice";

const store = configureStore({
  reducer: { auth: authReducer, fetch: fetchDataSlice },
});
export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
