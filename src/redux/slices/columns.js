import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchColumnCreate = createAsyncThunk(
  "columns/fetchColumnCreate",
  async ({ boardId, values }) => {
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

export const fetchColumnChangeTitle = createAsyncThunk(
  "columns/fetchColumnChangeTitle",
  async ({ id, values }) => {
    const { data } = await axios.patch(`/column/${id}`, values);
    return data;
  },
);

export const fetchColumnRemove = createAsyncThunk(
  "columns/fetchColumnRemove",
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
      .addCase(fetchColumnCreate.fulfilled, (state, action) => {
        console.log(action.payload);
        state.columns.items.push({
          ...action.payload,
          taskCount: 3,
        });
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

      .addCase(fetchColumnChangeTitle.fulfilled, (state, action) => {
        const id = action.payload.id;
        const column = state.columns.items.find((column) => column.id == id);
        column.title = action.payload.title;
      })
      .addCase(fetchColumnChangeTitle.rejected, (state) => {
        state.columns.status = "error";
      })

      .addCase(fetchColumnRemove.pending, (state, action) => {
        state.columns.items = state.columns.items.filter(
          (obj) => obj.id !== action.meta.arg,
        );
      });
  },
});

export const columnsReducer = columnsSlice.reducer;
