import { apiClient } from "../lib/api";
import type { ITag } from "../types";

export const getTags = async (): Promise<ITag[]> => {
    try {
        const response = await apiClient.get<ITag[]>('/tags');
        return response;
    } catch (error) {
        console.error('Error fetching tags:', error);
        throw error;
    }
}

export const createTag = async (name: string): Promise<ITag> => {
    try {
        const response = await apiClient.post<ITag>('/tags', { name });
        return response;
    } catch (error) {
        console.error('Error creating tag:', error);
        throw error;
    }
}
