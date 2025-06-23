import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as callService from "./callsApi";
import type { ICall } from "../../types";


interface CallsState {
    calls: ICall[];
    currentCallId: string;
    loadingStates: {
        fetchCalls: boolean;
        createCall: boolean;
        addTagToCall: boolean;
        updateTaskStatus: boolean;
        addTaskToCall: boolean;
    };
    error: string | null;
}

const initialState: CallsState = {
    calls: [],
    currentCallId: '',
    loadingStates: {
        fetchCalls: false,
        createCall: false,
        addTagToCall: false,
        updateTaskStatus: false,
        addTaskToCall: false,
    },
    error: null,
}

export const fetchCalls = createAsyncThunk<ICall[], void>(
    'calls/fetchCalls',
    async () => {
        const response = await callService.getCalls();
        return response;
    }
);

export const createCall = createAsyncThunk<ICall, string>(
    'calls/createCall',
    async (name: string) => {
        const response = await callService.createCall(name);
        return response;
    }
);

export const addTagToCall = createAsyncThunk<ICall, {callId: string, tagIds: string[]}>(
    'calls/addTagToCall',
    async ({callId, tagIds}) => {
        const response = await callService.addTagToCall(callId, tagIds);
        return response;
    }
);

export const updateTaskStatus = createAsyncThunk<ICall, {callId: string, taskId: string, status: string}>(
    'calls/updateTaskStatus',
    async ({callId, taskId, status}) => {
        const response = await callService.updateTaskStatus(callId, taskId, status);
        return response;
    }
);

export const addTaskToCall = createAsyncThunk<ICall, {callId: string, name: string}>(
    'calls/addTaskToCall',
    async ({callId, name}) => {
        const response = await callService.addTaskToCall(callId, name);
        return response;
    }
);

export const addSuggestedTaskToCall = createAsyncThunk<ICall, {callId: string, suggestedTaskId: string}>(
    'calls/addSuggestedTaskToCall',
    async ({callId, suggestedTaskId}) => {
        const response = await callService.addSuggestedTaskToCall(callId, suggestedTaskId);
        return response;
    }
);

const callsSlice = createSlice({
    name: 'calls',
    initialState,
    reducers: {
        setCurrentCallId: (state, action: PayloadAction<string>) => {
            state.currentCallId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCalls.pending, (state) => {
                state.loadingStates.fetchCalls = true;
                state.error = null;
            })
            .addCase(fetchCalls.fulfilled, (state, action: PayloadAction<ICall[]>) => {
                state.loadingStates.fetchCalls = false;
                state.calls = action.payload;
            })
            .addCase(fetchCalls.rejected, (state, action) => {
                state.loadingStates.fetchCalls = false;
                state.error = action.error.message || 'Failed to fetch calls';
            })
            .addCase(createCall.pending, (state) => {
                state.loadingStates.createCall = true;
                state.error = null;
            })
            .addCase(createCall.fulfilled, (state, action: PayloadAction<ICall>) => {   
                state.loadingStates.createCall = false;
                state.calls.push(action.payload);
            })
            .addCase(createCall.rejected, (state, action) => {
                state.loadingStates.createCall = false;
                state.error = action.error.message || 'Failed to create call';
            })
            .addCase(addTagToCall.pending, (state) => {
                state.loadingStates.addTagToCall = true;
                state.error = null;
            })
            .addCase(addTagToCall.fulfilled, (state, action: PayloadAction<ICall>) => {
                state.loadingStates.addTagToCall = false;
                const index = state.calls.findIndex((call) => call._id === action.payload._id);
                if (index !== -1) {
                    state.calls[index] = action.payload;
                }
            })
            .addCase(updateTaskStatus.pending, (state) => {
                state.loadingStates.updateTaskStatus = true;
                state.error = null;
            })
            .addCase(updateTaskStatus.fulfilled, (state, action: PayloadAction<ICall>) => {
                state.loadingStates.updateTaskStatus = false;
                const index = state.calls.findIndex((call) => call._id === action.payload._id); 
                if (index !== -1) {
                    state.calls[index] = action.payload;
                }
            })
            .addCase(updateTaskStatus.rejected, (state, action) => {
                state.loadingStates.updateTaskStatus = false;
                state.error = action.error.message || 'Failed to update task status';
            })
            .addCase(addTaskToCall.pending, (state) => {
                state.loadingStates.addTaskToCall = true;
                state.error = null;
            })
            .addCase(addTaskToCall.fulfilled, (state, action: PayloadAction<ICall>) => {
                const index = state.calls.findIndex((call) => call._id === action.payload._id);
                if (index !== -1) {
                    state.calls[index] = action.payload;
                }
                state.loadingStates.addTaskToCall = false;
            })
            .addCase(addTaskToCall.rejected, (state, action) => {
                state.loadingStates.addTaskToCall = false;
                state.error = action.error.message || 'Failed to add task to call';
            })
            .addCase(addSuggestedTaskToCall.pending, (state) => {
                state.loadingStates.addTaskToCall = true;
                state.error = null;
            })
            .addCase(addSuggestedTaskToCall.fulfilled, (state, action: PayloadAction<ICall>) => {
                const index = state.calls.findIndex((call) => call._id === action.payload._id);
                if (index !== -1) {
                    state.calls[index] = action.payload;
                }
                state.loadingStates.addTaskToCall = false;
            })
            .addCase(addSuggestedTaskToCall.rejected, (state, action) => {
                state.loadingStates.addTaskToCall = false;
                state.error = action.error.message || 'Failed to add suggested task to call';
            });
    }
});

export const { setCurrentCallId } = callsSlice.actions;

export default callsSlice.reducer;
