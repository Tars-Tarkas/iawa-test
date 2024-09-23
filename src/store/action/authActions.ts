import { createAsyncThunk } from "@reduxjs/toolkit";

export const logoutUser = () => () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  window.location.href = "/login";
};

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
        localStorage.setItem("token", data.result.token);
        localStorage.setItem("userName", login);
        return data;
      } else {
        return rejectWithValue(data);
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
