import type { RootState } from "../../app/store";

export const selectAllCalls = (state: RootState) => state.calls.calls;
export const selectCallById = (callId: string) => (state: RootState) =>
    state.calls.calls.find((call) => call._id === callId);
export const selectCallsError = (state: RootState) => state.calls.error;
export const selectCurrentCallId = (state: RootState) => state.calls.currentCallId;
export const selectFetchCallsLoading = (state: RootState) => state.calls.loadingStates.fetchCalls;
export const selectCreateCallLoading = (state: RootState) => state.calls.loadingStates.createCall;
export const selectAddTagToCallLoading = (state: RootState) => state.calls.loadingStates.addTagToCall;
export const selectUpdateTaskStatusLoading = (state: RootState) => state.calls.loadingStates.updateTaskStatus;
export const selectAddTaskToCallLoading = (state: RootState) => state.calls.loadingStates.addTaskToCall;
