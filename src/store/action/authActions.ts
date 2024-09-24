import { createAsyncThunk } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk(
  "auth",
  async (
    { login, password }: { login: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(`/v3/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login,
          password,
        }),
      });

      const data = await res.json();
      if (res.status === 200) {
        localStorage.setItem("userToken", data.result.token);
        return data;
      } else {
        return rejectWithValue(data);
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
