import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Columns

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

// Tasks
export const fetchTaskCreate = createAsyncThunk(
  "columns/fetchTaskCreate",
  async ({ columnId, values }) => {
    const { data } = await axios.post(`/task/${columnId}`, values);
    return data;
  },
);

export const fetchTaskChangeStatus = createAsyncThunk(
  "columns/fetchTaskChangeStatus",
  async ({ id, values }) => {
    const { data } = await axios.patch(`/task/${id}`, values);
    return data;
  },
);

export const fetchTaskRemove = createAsyncThunk(
  "tasks/fetchTaskRemove",
  async (id) => {
    const { data } = await axios.delete(`/task/${id}`);
    return data;
  },
);

// Slice

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

      // Columns
      .addCase(fetchColumnCreate.fulfilled, (state, action) => {
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

      .addCase(fetchColumnRemove.fulfilled, (state, action) => {
        state.columns.items = state.columns.items.filter(
          (obj) => obj.id !== action.meta.arg,
        );
        state.columns.status = "loaded";
      })

      // Tasks
      .addCase(fetchTaskCreate.fulfilled, (state, action) => {
        const task = action.payload;
        const column = state.columns.items.find(
          (column) => column.id == task.columnId,
        );
        column.tasks.push(task);
      })
      .addCase(fetchTaskCreate.rejected, (state) => {
        state.columns.status = "error";
      })

      .addCase(fetchTaskChangeStatus.fulfilled, (state, action) => {
        const taskId = action.payload.id;
        const columnId = action.payload.columnId;
        const column = state.columns.items.find(
          (column) => column.id == columnId,
        );
        const task = column.tasks.find((task) => task.id == taskId);
        task.done = !task.done;
      })
      .addCase(fetchTaskChangeStatus.rejected, (state) => {
        state.columns.status = "error";
      })

      .addCase(fetchTaskRemove.fulfilled, (state, action) => {
        const taskId = action.meta.arg;
        const column = state.columns.items.find((column) =>
          column.tasks.map((task) => task.id).includes(taskId),
        );
        column.tasks = column.tasks.filter((task) => task.id !== taskId);
        state.columns.status = "loaded";
      })
      .addCase(fetchTaskRemove.rejected, (state) => {
        state.columns.status = "error";
      });
  },
});

export const columnsReducer = columnsSlice.reducer;
