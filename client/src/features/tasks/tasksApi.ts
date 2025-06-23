import { apiClient } from "../../lib/api";
import type { ISuggestedTask } from "../../types";
import type { AxiosError } from "axios";

export const getSuggestedTasks = async (): Promise<ISuggestedTask[]> => {
    try {
        const response = await apiClient.get<ISuggestedTask[]>('/tasks');
        return response;
    } catch (error) {
        console.error('Error fetching suggested tasks:', error);
        const axiosError = error as AxiosError<{ error: string }>;
        const errorMessage = axiosError.response?.data?.error || axiosError.message || 'Failed to fetch suggested tasks';
        throw new Error(errorMessage);
    }
}

export const createTask = async (name: string, tags: string[]): Promise<ISuggestedTask> => {
    try {
        const response = await apiClient.post<ISuggestedTask>('/tasks', { name, tags });
        return response;
    } catch (error) {
        console.error('Error creating task:', error);
        const axiosError = error as AxiosError<{ error: string }>;
        const errorMessage = axiosError.response?.data?.error || axiosError.message || 'Failed to create task';
        throw new Error(errorMessage);
    }
}


