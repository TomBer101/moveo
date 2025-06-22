import { apiClient } from "../../lib/api";
import type { ITag } from "../../types";
import type { AxiosError } from "axios";

export const getTags = async (): Promise<ITag[]> => {
    try {
        const response = await apiClient.get<ITag[]>('/tags');
        return response;
    } catch (error) {
        console.error('Error fetching tags:', error);
        const axiosError = error as AxiosError<{ error: string }>;
        const errorMessage = axiosError.response?.data?.error || axiosError.message || 'Failed to fetch tags';
        throw new Error(errorMessage);
    }
}

export const createTag = async (name: string): Promise<ITag> => {
    try {
        const response = await apiClient.post<ITag>('/tags', { name });
        return response;
    } catch (error) {
        console.error('Error creating tag:', error);
        const axiosError = error as AxiosError<{ error: string }>;
        const errorMessage = axiosError.response?.data?.error || axiosError.message || 'Failed to create tag';
        throw new Error(errorMessage);
    }
}

export const updateTag = async (tagId: string, name: string): Promise<ITag> => {
    try {
        const response = await apiClient.put<ITag>(`/tags/${tagId}`, { name });
        return response;
    } catch (error) {
        console.error('Error updating tag:', error);
        const axiosError = error as AxiosError<{ error: string }>;
        const errorMessage = axiosError.response?.data?.error || axiosError.message || 'Failed to update tag';
        throw new Error(errorMessage);
    }
}