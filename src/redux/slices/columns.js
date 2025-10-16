import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchColumns = createAsyncThunk(
  "columns/fetchColumns",
  async (board_id) => {
    const { data } = await axios.get(`/columns/${board_id}`);
    return data;
  },
);

export const fetchColumnsWithTasks = createAsyncThunk(
  "columns/fetchColumnsWithTasks",
  async (board_id) => {
    const { data } = await axios.get(`/columns-with-tasks/${board_id}`);
    return data;
  },
);

export const fetchRemoveColumn = createAsyncThunk(
  "columns/fetchRemoveColumn",
  async (id) => {
    const { data } = await axios.delete(`/column/${id}`);
    return data;
  },
);

const initialState = {
  columns: {
    items: [],
    status: "loading",
  },
};

const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchColumns.pending, (state) => {
        state.columns.items = [];
        state.columns.status = "loading";
      })
      .addCase(fetchColumns.fulfilled, (state, action) => {
        state.columns.items = action.payload;
        state.columns.status = "loaded";
      })
      .addCase(fetchColumns.rejected, (state) => {
        state.columns.items = [];
        state.columns.status = "error";
      })

      .addCase(fetchColumnsWithTasks.pending, (state) => {
        state.columns.items = [];
        state.columns.status = "loading";
      })
      .addCase(fetchColumnsWithTasks.fulfilled, (state, action) => {
        state.columns.items = action.payload;
        state.columns.status = "loaded";
      })
      .addCase(fetchColumnsWithTasks.rejected, (state) => {
        state.columns.items = [];
        state.columns.status = "error";
      })

      .addCase(fetchRemoveColumn.pending, (state, action) => {
        state.columns.items = state.columns.items.filter(
          (obj) => obj.id !== action.meta.arg,
        );
      });
  },
});

export const columnsReducer = columnsSlice.reducer;
