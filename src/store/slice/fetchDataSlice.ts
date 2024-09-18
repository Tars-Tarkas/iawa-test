import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchData } from "../action/fetchDataActions";

const initialState = {
  isLoading: false,
  isError: false,
  erroeMessage: "",
  data: [],
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
    });
    builder.addCase(fetchData.rejected, (state, { payload }: any) => {
      state.isLoading = false;
      state.erroeMessage = payload.error.message;
    });
  },
});
export default fetchDataSlice.reducer;
