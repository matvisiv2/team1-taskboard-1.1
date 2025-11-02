import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  task: {},
};

const taskEditFormSlice = createSlice({
  name: "taskEditForm",
  initialState,
  reducers: {
    showTaskEditForm: (state, action) => {
      state.task = action.payload;
      state.open = true;
    },
    hideTaskEditForm: (state) => {
      state.open = false;
    },
  },
});

export const { showTaskEditForm, hideTaskEditForm } = taskEditFormSlice.actions;

export const selectTaskEditForm = (state) => state.taskEditForm;

export const taskEditFormReducer = taskEditFormSlice.reducer;
