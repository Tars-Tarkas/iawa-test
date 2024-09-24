import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../action/authActions";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  isLoading: false,
  errorMessage: "",
  isError: false,
  isSuccess: false,
  userToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      window.location.href = "/login";
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
      state.userToken = "";
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, { payload }) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.userToken = payload.result.token;
      return state;
    });
    builder.addCase(userLogin.rejected, (state, { payload }: any) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.errorMessage = payload.error.message;
      return state;
    });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
