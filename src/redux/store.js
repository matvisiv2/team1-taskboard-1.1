import { configureStore } from "@reduxjs/toolkit";
import { boardsReducer } from "./slices/boards";
import { columnsReducer } from "./slices/columns";

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    columns: columnsReducer,
  },
});

export default store;
