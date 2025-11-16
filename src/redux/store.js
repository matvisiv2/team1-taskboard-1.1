import { configureStore } from "@reduxjs/toolkit";
import { snackbarReducer } from "./slices/snackbar";
import { authReducer } from "./slices/auth";
import { boardsReducer } from "./slices/boards";
import { columnsReducer } from "./slices/columns";
import { taskEditFormReducer } from "./slices/taskEditForm";
import { currentBoardReducer } from "./slices/currentBoard";

const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    auth: authReducer,
    boards: boardsReducer,
    currentBoard: currentBoardReducer,
    columns: columnsReducer,
    taskEditForm: taskEditFormReducer,
  },
});

export default store;
