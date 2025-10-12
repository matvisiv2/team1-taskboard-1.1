import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchBoards = createAsyncThunk(
  "boards/fetchBoards",
  async (user_id) => {
    const { data } = await axios.get(`/boards/${user_id}`);
    return data;
  },
);

export const fetchBoardsWithStatistics = createAsyncThunk(
  "boards/fetchBoardsWithStatistics",
  async (user_id) => {
    const { data } = await axios.get(`/boards-with-statistics/${user_id}`);
    return data;
  },
);

const initialState = {
  boards: {
    items: [],
    status: "loading",
  },
  columns: {
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
      });
  },
});

export const boardsReducer = boardsSlice.reducer;
