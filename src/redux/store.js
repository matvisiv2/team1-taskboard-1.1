import { configureStore } from "@reduxjs/toolkit";
import { snackbarReducer } from "./slices/snackbar";
import { authReducer } from "./slices/auth";
import { boardsReducer } from "./slices/boards";
import { columnsReducer } from "./slices/columns";

const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    auth: authReducer,
    boards: boardsReducer,
    columns: columnsReducer,
  },
});

export default store;
