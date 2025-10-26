import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchColumnCreate = createAsyncThunk(
  "board/fetchColumnCreate",
  async ({boardId, values}) => {
    const { data } = await axios.post(`/column/${boardId}`, values);
    return data;
  },
);

export const fetchColumns = createAsyncThunk(
  "columns/fetchColumns",
  async (boardId) => {
    const { data } = await axios.get(`/columns/${boardId}`);
    return data;
  },
);

export const fetchColumnsWithTasks = createAsyncThunk(
  "columns/fetchColumnsWithTasks",
  async (boardId) => {
    const { data } = await axios.get(`/columns-with-tasks/${boardId}`);
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
      .addCase(fetchColumnCreate.pending, (state) => {
        // TODO: clean or do something
        // state.boards.items = [];
        // state.boards.status = "loading";
      })
      .addCase(fetchColumnCreate.fulfilled, (state, action) => {
        console.log(action.payload);
        state.columns.items.push({
          ...action.payload,
          taskCount: 3,
        });
        // TODO: keep if needed
        state.columns.status = "loaded";
      })
      .addCase(fetchColumnCreate.rejected, (state) => {
        // TODO: clean or do something
        // state.boards.items = [];
        // state.boards.status = "error";
      })

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
