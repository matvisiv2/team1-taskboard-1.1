import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchBoardCreate = createAsyncThunk(
  "board/fetchBoardCreate",
  async (values) => {
    const { data } = await axios.post("/board", values);
    return data;
  },
);

export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
  const { data } = await axios.get("/boards");
  return data;
});

export const fetchBoardsWithStatistics = createAsyncThunk(
  "boards/fetchBoardsWithStatistics",
  async () => {
    const { data } = await axios.get("/boards-with-statistics");
    return data;
  },
);

export const fetchBoardChangeTitle = createAsyncThunk(
  "board/fetchBoardChangeTitle",
  async ({ id, values }) => {
    const { data } = await axios.patch(`/board/${id}`, values);
    return data;
  },
);

export const fetchBoardRemove = createAsyncThunk(
  "boards/fetchBoardRemove",
  async (id) => {
    const { data } = await axios.delete(`/board/${id}`);
    return data;
  },
);

const initialState = {
  boards: {
    items: [],
    status: "loading",
  },
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoardCreate.pending, (state) => {
        // TODO: clean or do something
        // state.boards.items = [];
        // state.boards.status = "loading";
      })
      .addCase(fetchBoardCreate.fulfilled, (state, action) => {
        state.boards.items.push({
          ...action.payload,
          columnCount: 3,
          taskCount: 0,
          commentCount: 0,
        });
        // TODO: keep if needed
        // state.boards.status = "loaded";
      })
      .addCase(fetchBoardCreate.rejected, (state) => {
        // TODO: clean or do something
        // state.boards.items = [];
        // state.boards.status = "error";
      })

      .addCase(fetchBoards.pending, (state) => {
        state.boards.items = [];
        state.boards.status = "loading";
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.boards.items = action.payload;
        state.boards.status = "loaded";
      })
      .addCase(fetchBoards.rejected, (state) => {
        state.boards.items = [];
        state.boards.status = "error";
      })

      .addCase(fetchBoardsWithStatistics.pending, (state) => {
        state.boards.items = [];
        state.boards.status = "loading";
      })
      .addCase(fetchBoardsWithStatistics.fulfilled, (state, action) => {
        state.boards.items = action.payload;
        state.boards.status = "loaded";
      })
      .addCase(fetchBoardsWithStatistics.rejected, (state) => {
        state.boards.items = [];
        state.boards.status = "error";
      })

      .addCase(fetchBoardChangeTitle.fulfilled, (state, action) => {
        const id = action.payload.id;
        const board = state.boards.items.find((board) => board.id == id);
        board.title = action.payload.title;
        state.boards.status = "loaded";
      })

      .addCase(fetchBoardRemove.pending, (state, action) => {
        state.boards.status = "loading";
      })
      .addCase(fetchBoardRemove.fulfilled, (state, action) => {
        const id = action.meta.arg;
        state.boards.items = state.boards.items.filter((obj) => obj.id !== id);
        state.boards.status = "loaded";
      });
  },
});

export const boardsReducer = boardsSlice.reducer;
