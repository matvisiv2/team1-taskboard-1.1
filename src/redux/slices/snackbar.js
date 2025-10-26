import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  message: "",
  success: false,
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.success = action.payload.success;
    },
    hideSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;

export const selectSnackbar = (state) => state.snackbar;

export const snackbarReducer = snackbarSlice.reducer;
