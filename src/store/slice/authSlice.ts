import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../action/authActions";

const initialState = {
  isLoading: false,
  errorMessage: "",
  isError: false,
  isSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
      return state;
    },
    logoutUser: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      window.location.href = "/login";
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      return state;
    });
    builder.addCase(userLogin.rejected, (state, { payload }: any) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.errorMessage = payload.error.message;
      return state;
    });
  },
});

export const { clearState, logoutUser } = authSlice.actions;
export default authSlice.reducer;
