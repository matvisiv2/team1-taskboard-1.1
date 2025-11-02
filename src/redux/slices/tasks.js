import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchTaskCreate = createAsyncThunk(
  "tasks/fetchTaskCreate",
  async ({ columnId, values }) => {
    const { data } = await axios.post(`/task/${columnId}`, values);
    return data;
  },
);

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (columnId) => {
    const { data } = await axios.get(`/tasks/${columnId}`);
    return data;
  },
);

export const fetchTasksWithTasks = createAsyncThunk(
  "tasks/fetchTasksWithTasks",
  async (columnId) => {
    const { data } = await axios.get(`/tasks-with-tasks/${columnId}`);
    return data;
  },
);

export const fetchTaskChangeTitle = createAsyncThunk(
  "tasks/fetchTaskChangeTitle",
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

const initialState = {
  tasks: {
    items: [],
    status: "loading",
  },
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskCreate.fulfilled, (state, action) => {
        console.log(action.payload);
        state.tasks.items.push({
          ...action.payload,
          taskCount: 3,
        });
      })

      .addCase(fetchTasks.pending, (state) => {
        state.tasks.items = [];
        state.tasks.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks.items = action.payload;
        state.tasks.status = "loaded";
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.tasks.items = [];
        state.tasks.status = "error";
      })

      .addCase(fetchTasksWithTasks.pending, (state) => {
        state.tasks.items = [];
        state.tasks.status = "loading";
      })
      .addCase(fetchTasksWithTasks.fulfilled, (state, action) => {
        state.tasks.items = action.payload;
        state.tasks.status = "loaded";
      })
      .addCase(fetchTasksWithTasks.rejected, (state) => {
        state.tasks.items = [];
        state.tasks.status = "error";
      })

      .addCase(fetchTaskChangeTitle.fulfilled, (state, action) => {
        const id = action.payload.id;
        const task = state.tasks.items.find((task) => task.id == id);
        task.title = action.payload.title;
      })
      .addCase(fetchTaskChangeTitle.rejected, (state) => {
        state.tasks.status = "error";
      })

      .addCase(fetchTaskRemove.fulfilled, (state, action) => {
        state.tasks.items = state.tasks.items.filter(
          (obj) => obj.id !== action.meta.arg,
        );
        state.tasks.status = "loaded";
      })
      .addCase(fetchTaskRemove.rejected, (state) => {
        state.tasks.status = "error";
      });
  },
});

export const tasksReducer = tasksSlice.reducer;
