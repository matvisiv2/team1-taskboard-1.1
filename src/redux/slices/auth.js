import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchSignIn = createAsyncThunk(
  "auth/fetchSignIn",
  async (params) => {
    const { data } = await axios.post("/auth/signin", params);
    return data;
  },
);

export const fetchSignUp = createAsyncThunk(
  "auth/fetchSignUp",
  async (params) => {
    const { data } = await axios.post("/auth/signup", params);
    return data;
  },
);

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignIn.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchSignIn.rejected, (state) => {
        state.status = "error";
        state.data = null;
      })

      .addCase(fetchSignUp.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchSignUp.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchSignUp.rejected, (state) => {
        state.status = "error";
        state.data = null;
      });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const getMe = (state) => state.auth.data;

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
