import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk(
  "fecthData",
  async (
    {
      token,
      query,
    }: {
      token: string;
      query?: {};
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(`/v3/orders/trips?${query}`, {
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
