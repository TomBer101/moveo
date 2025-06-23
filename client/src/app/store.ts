import { configureStore } from "@reduxjs/toolkit";
import tagsReducer from "../features/tags/tagsSlice";
import callsReducer from "../features/calls/callsSlice";
import tasksReducer from "../features/tasks/tasksSlice";

const store = configureStore({
    reducer: {
        tags: tagsReducer,
        calls: callsReducer,
        tasks: tasksReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
