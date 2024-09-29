import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../action/fetchDataActions";
import type { Root } from "../../types/types";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  data: {} as Root,
  currentPage: 1,
  currentItems_on_page: 11,
  query: "",
};

const fetchDataSlice = createSlice({
  name: "fetch",
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    setItems_on_page: (state, { payload }) => {
      state.currentItems_on_page = payload;
    },
    setQuery: (state, { payload }) => {
      state.query = payload;
    },
  },
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
      // state.currentPage = payload.result.page_data.page;
      // state.currentItems_on_page = payload.result.items_on_page;
    });
    builder.addCase(fetchData.rejected, (state, { payload }: any) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.errorMessage = payload.error.message;
      return state;
    });
  },
});

export const { setCurrentPage, setItems_on_page, setQuery } =
  fetchDataSlice.actions;

export default fetchDataSlice.reducer;
