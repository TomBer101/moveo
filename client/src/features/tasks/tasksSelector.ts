import type { RootState } from "../../app/store";

export const selectAllTasks = (state: RootState) => state.tasks.tasks;
export const selectTaskById = (taskId: string) => (state: RootState) =>
    state.tasks.tasks.find((task) => task._id === taskId);
export const selectTasksLoading = (state: RootState) => state.tasks.loading;
export const selectTasksError = (state: RootState) => state.tasks.error;
