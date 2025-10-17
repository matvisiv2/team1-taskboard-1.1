import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { boardsReducer } from "./slices/boards";
import { columnsReducer } from "./slices/columns";

const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: boardsReducer,
    columns: columnsReducer,
  },
});

export default store;
