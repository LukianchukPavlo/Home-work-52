import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "./api/auth";
import { boardsApi } from "./api/boards";
import { tasksApi } from "./api/tasks";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [boardsApi.reducerPath]: boardsApi.reducer,
        [tasksApi.reducerPath]: tasksApi.reducer,
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(boardsApi.middleware)
            .concat(tasksApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;