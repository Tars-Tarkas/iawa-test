import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import fetchDataSlice from "./slice/fetchDataSlice";
import fetchDataDetailsSlice from "./slice/fetchDataDetailsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    auth: authReducer,
    fetch: fetchDataSlice,
    fetchDetails: fetchDataDetailsSlice,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([]),
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
