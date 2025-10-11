import { configureStore } from "@reduxjs/toolkit";
import { boardsReducer } from "./slices/boards";

const store = configureStore({
  reducer: {
    boards: boardsReducer,
  },
});

export default store;
