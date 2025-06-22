import { configureStore } from "@reduxjs/toolkit";
import tagsReducer from "../features/tags/tagsSlice";

const store = configureStore({
    reducer: {
        tags: tagsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
