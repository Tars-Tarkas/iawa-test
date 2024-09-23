import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDataDetails = createAsyncThunk(
  "fecthDataDetails",
  async (
    { token, order_id }: { token: string; order_id: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(`/v3/orders/trips?order_id=${order_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.status === 200) {
        return data;
      } else {
        return rejectWithValue(data);
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
