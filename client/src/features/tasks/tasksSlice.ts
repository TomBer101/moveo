import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as taskService from "./tasksApi";
import type { ISuggestedTask } from "../../types";


interface TasksState {
    tasks: ISuggestedTask[];
    loading: boolean;
    error: string | null;
}

const initialState: TasksState = {
    tasks: [],
    loading: false,
    error: null,
}

export const fetchTasks = createAsyncThunk<ISuggestedTask[], void>(
    'tasks/fetchTasks',
    async () => {
        const response = await taskService.getSuggestedTasks();
        return response;
    }
);

export const createTask = createAsyncThunk<ISuggestedTask, {name: string, tags: string[]}>(
    'tasks/createTask',
    async ({name, tags}) => {
        const response = await taskService.createTask(name, tags);
        return response;
    }
);

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<ISuggestedTask[]>) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch tasks';
            })
            .addCase(createTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action: PayloadAction<ISuggestedTask>) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create task';
            })
    }
});

export default tasksSlice.reducer;
