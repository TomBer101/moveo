import { apiClient } from "../../lib/api";
import type { ICall } from "../../types";
import type { AxiosError } from "axios";

export const getCalls = async (populateSuggestedTasks?: boolean): Promise<ICall[]> => {
    try {
        const url = populateSuggestedTasks ? '/calls?populateSuggestedTasks=true' : '/calls';
        const response = await apiClient.get<ICall[]>(url);
        return response;
    } catch (error) {
        console.error('Error fetching calls:', error);
        const axiosError = error as AxiosError<{ error: string }>;
        const errorMessage = axiosError.response?.data?.error || axiosError.message || 'Failed to fetch calls';
        throw new Error(errorMessage);
    }
}

export const createCall = async (name: string): Promise<ICall> => {
    try {
        const response = await apiClient.post<ICall, {name: string}>('/calls', { name });
        return response;
    } catch (error) {
        console.error('Error creating call:', error);
        const axiosError = error as AxiosError<{ error: string }>;
        const errorMessage = axiosError.response?.data?.error || axiosError.message || 'Failed to create call';
        throw new Error(errorMessage);
    }
}

export const addTagToCall = async (callId: string, tagIds: string[]): Promise<ICall> => {
    try {
        const response = await apiClient.put<ICall, {tagIds: string[]}>(`/calls/${callId}/tags`, { tagIds });
        return response;
    } catch (error) {
        console.error('Error adding tag to call:', error);
        const axiosError = error as AxiosError<{ error: string }>;
        const errorMessage = axiosError.response?.data?.error || axiosError.message || 'Failed to add tag to call';
        throw new Error(errorMessage);
    }
}

export const addTaskToCall = async (callId: string, name: string): Promise<ICall> => {
    try {
        const response = await apiClient.post<ICall, {name: string}>(`/calls/${callId}/tasks`, { name });
        return response;
    } catch (error) {
        console.error('Error adding task to call:', error);
        const axiosError = error as AxiosError<{ error: string }>;
        const errorMessage = axiosError.response?.data?.error || axiosError.message || 'Failed to add task to call';
        throw new Error(errorMessage);
    }
}

export const addSuggestedTaskToCall = async (callId: string, suggestedTaskId: string): Promise<ICall> => {
    try {
        const response = await apiClient.post<ICall, {suggestedTaskId: string}>(`/calls/${callId}/tasks`, { suggestedTaskId });
        return response;
    } catch (error) {
        console.error('Error adding suggested task to call:', error);
        const axiosError = error as AxiosError<{ error: string }>;
        const errorMessage = axiosError.response?.data?.error || axiosError.message || 'Failed to add suggested task to call';
        throw new Error(errorMessage);
    }
}

export const updateTaskStatus = async (callId: string, taskId: string, status: string): Promise<ICall> => {
    try {
        const response = await apiClient.put<ICall, {status: string}>(`/calls/${callId}/tasks/${taskId}`, { status });
        return response;
    } catch (error) {
        console.error('Error updating task status:', error);
        const axiosError = error as AxiosError<{ error: string }>;
        const errorMessage = axiosError.response?.data?.error || axiosError.message || 'Failed to update task status';
        throw new Error(errorMessage);
    }
}

