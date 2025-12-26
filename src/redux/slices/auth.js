import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchSignUp = createAsyncThunk(
  "auth/fetchSignUp",
  async (params) => {
    const { data } = await axios.post("/auth/signup", params);
    return data;
  },
);

export const fetchSignIn = createAsyncThunk(
  "auth/fetchSignIn",
  async (params) => {
    const { data } = await axios.post("/auth/signin", params);
    return data;
  },
);

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

export const fetchUpdateMe = createAsyncThunk(
  "auth/fetchUpdateMe",
  async (values) => {
    const { data } = await axios.patch("/user", values);
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
      // SignUp
      .addCase(fetchSignUp.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchSignUp.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload.result;
      })
      .addCase(fetchSignUp.rejected, (state) => {
        state.status = "error";
        state.data = null;
      })

      // SingnIn
      .addCase(fetchSignIn.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload.result;
      })
      .addCase(fetchSignIn.rejected, (state) => {
        state.status = "error";
        state.data = null;
      })

      // fetchAuthMe
      .addCase(fetchAuthMe.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.data = action.payload.result;
        state.status = "loaded";
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.data = null;
        state.status = "error";
      })

      // fetchUpdateMe
      .addCase(fetchUpdateMe.pending, (state, action) => {
        state.data = action.meta.arg;
        state.status = "loading";
      })
      .addCase(fetchUpdateMe.fulfilled, (state, action) => {
        state.status = "loaded";
      })
      .addCase(fetchUpdateMe.rejected, (state) => {
        state.data = null;
        state.status = "error";
      });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const getMe = (state) => state.auth.data;

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
