import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk(
  "fecthData",
  async (
    {
      token,
      page,
      itemsOnPage,
      names,
      email,
      order_status,
    }: {
      token: string;
      page: number;
      itemsOnPage: number;
      names: string;
      email: string;
      order_status: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(
        `/v3/orders/trips?page=${page}&items_on_page=${itemsOnPage}&names=${names}&email=${email}&order_status=${order_status}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
