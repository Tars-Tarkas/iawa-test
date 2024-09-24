import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../action/fetchDataActions";
import type { Root } from "../../types/types";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  data: {} as Root,
};

const fetchDataSlice = createSlice({
  name: "fetch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state, { payload }) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchData.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(fetchData.rejected, (state, { payload }: any) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      // state.errorMessage = payload.error.message;
      return state;
    });
  },
});

export default fetchDataSlice.reducer;
