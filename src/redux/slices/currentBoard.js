import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchBoardWithLabelsAndCollaborators = createAsyncThunk(
  "currentBoard/fetchBoardWithLabelsAndCollaborators",
  async (id) => {
    const { data } = await axios.get(
      `/board-with-labels-and-collaborators/${id}`,
    );
    return data;
  },
);

export const fetchBoardAddCollaborator = createAsyncThunk(
  "currentBoard/fetchBoardAddCollaborator",
  async ({ boardId, user }) => {
    const { data } = await axios.post(`/collaborator/${boardId}/${user.id}`);
    return data;
  },
);

const initialState = {
  board: {
    data: null,
    status: "loading",
  },
};

const currentBoardSlice = createSlice({
  name: "currentBoard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoardWithLabelsAndCollaborators.pending, (state) => {
        state.board.data = null;
        state.board.status = "loading";
      })
      .addCase(
        fetchBoardWithLabelsAndCollaborators.fulfilled,
        (state, action) => {
          state.board.data = action.payload;
          state.board.status = "loaded";
        },
      )
      .addCase(fetchBoardWithLabelsAndCollaborators.rejected, (state) => {
        state.board.data = null;
        state.board.status = "error";
      })

      .addCase(fetchBoardAddCollaborator.pending, (state, action) => {
        const collaborators = state.board.data.collaborators;
        collaborators.push(action.meta.arg.user);
      })
      .addCase(fetchBoardAddCollaborator.rejected, (state) => {
        state.board.status = "error";
      });
  },
});

export const currentBoardReducer = currentBoardSlice.reducer;
