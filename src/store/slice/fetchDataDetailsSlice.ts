import { createSlice } from "@reduxjs/toolkit";
import { fetchDataDetails } from "../action/fetchDataDetailsActions";
import type { Root } from "../../types/types";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  data: {} as Root,
};

const fetchDataDetailsSlice = createSlice({
  name: "fetchDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDataDetails.pending, (state, { payload }) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchDataDetails.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchDataDetails.rejected, (state, { payload }: any) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.errorMessage = payload.error.message;
      return state;
    });
  },
});

export default fetchDataDetailsSlice.reducer;
