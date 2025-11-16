import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
import { parseColumnIndex, parseTaskId } from "../../utils/reordering";

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

export const fetchColumnChangeOrderIndex = createAsyncThunk(
  "columns/fetchColumnChangeOrderIndex",
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

export const fetchTaskUpdate = createAsyncThunk(
  "columns/fetchTaskUpdate",
  async ({ id, values }) => {
    const { data } = await axios.put(`/task/${id}`, values);
    return data;
  },
);

export const fetchTaskReorder = createAsyncThunk(
  "columns/fetchTaskReorder",
  async ({ id, values }) => {
    const { data } = await axios.put(`/task/${id}`, values);
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
  reducers: {
    changeColumnsOrder: (state, action) => {
      const { activeCol, overCol, newOrderIndex } = action.payload;
      state.columns.items[activeCol].orderIndex = newOrderIndex;
      const [moved] = state.columns.items.splice(activeCol, 1);
      if (!moved) return;
      state.columns.items.splice(overCol, 0, moved);
    },
    moveTaskToAnotherColumn: (state, action) => {
      const { active, over } = action.payload;

      // TODO: clear /////////////////////////////
      // console.log(active);
      // console.log(over);
      ////////////////////////////////////////////

      const sourceColumnIndex = parseColumnIndex(active);
      const destColumnIndex = parseColumnIndex(over);
      // if (sourceColumnIndex === destColumnIndex) return;

      // TODO: clear /////////////////////////////
      // console.log(sourceColumnIndex);
      // console.log(destColumnIndex);
      ////////////////////////////////////////////

      const activeTaskId = parseTaskId(active);
      const overTaskId = parseTaskId(over);

      // TODO: clear /////////////////////////////
      // console.log(activeTaskId);
      // console.log(overTaskId);
      ////////////////////////////////////////////

      // const sourceTasks = state.columns.items[sourceColumnIndex].tasks;
      // const destTasks = state.columns.items[destColumnIndex].tasks ?? [];
      const sourceTasks = [...state.columns.items[sourceColumnIndex].tasks];
      const destTasks = [...state.columns.items[destColumnIndex].tasks];

      const activeTaskIndex = sourceTasks.findIndex(
        (task) => task.id == activeTaskId,
      );
      if (activeTaskIndex < 0) return;
      const overTaskIndex = destTasks.findIndex(
        (task) => task.id == overTaskId,
      );

      const [moved] = sourceTasks.splice(activeTaskIndex, 1);
      if (!moved) return;

      const insertIndex = overTaskIndex >= 0 ? overTaskIndex : destTasks.length;

      destTasks.splice(insertIndex, 0, moved);

      state.columns.items[sourceColumnIndex].tasks = [...sourceTasks];
      state.columns.items[destColumnIndex].tasks = [...destTasks];
    },
    moveTaskInSameColumn: (state, action) => {
      const {
        sourceColumnIndex,
        activeTaskIndex,
        overTaskIndex,
        newOrderIndex,
      } = action.payload;
      const tasks = state.columns.items[sourceColumnIndex]?.tasks;
      const [moved] = tasks.splice(activeTaskIndex, 1) || null;
      moved.orderIndex = newOrderIndex;
      tasks.splice(overTaskIndex, 0, moved);
    },
  },
  extraReducers: (builder) => {
    builder

      // Columns
      .addCase(fetchColumnCreate.fulfilled, (state, action) => {
        state.columns.items.push({
          ...action.payload,
          tasks: [],
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

      .addCase(fetchColumnChangeOrderIndex.fulfilled, (state) => {
        state.columns.status = "loaded";
      })
      .addCase(fetchColumnChangeOrderIndex.rejected, (state) => {
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

        if (column.tasks) {
          column.tasks.push(task);
        } else {
          column.tasks = [task];
        }
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
        state.columns.status = "loaded";
      })
      .addCase(fetchTaskChangeStatus.rejected, (state) => {
        state.columns.status = "error";
      })

      .addCase(fetchTaskUpdate.pending, (state, action) => {
        const changedTask = action.meta.arg.values;
        const column = state.columns.items.find(
          (column) => column.id == changedTask.columnId,
        );

        if (changedTask.archived) {
          const destTaskIndex = column.tasks.findIndex(
            (task) => task.id == changedTask.id,
          );
          column.tasks.splice(destTaskIndex, 1);
        } else {
          const destTask = column.tasks.find(
            (task) => task.id == changedTask.id,
          );
          action.payload ?? Object.assign(destTask, changedTask);
        }
      })
      .addCase(fetchTaskUpdate.rejected, (state) => {
        state.columns.status = "error";
      })

      .addCase(fetchTaskReorder.fulfilled, (state, action) => {
        const taskId = action.payload.id;
        const columnId = action.payload.columnId;
        const column = state.columns.items.find(
          (column) => column.id == columnId,
        );
        const task = column.tasks.find((task) => task.id == taskId);
        action.payload ?? Object.assign(task, action.payload);
        state.columns.status = "loaded";
      })
      .addCase(fetchTaskReorder.rejected, (state) => {
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

export const {
  changeColumnsOrder,
  moveTaskToAnotherColumn,
  moveTaskInSameColumn,
} = columnsSlice.actions;

export const columnsReducer = columnsSlice.reducer;
