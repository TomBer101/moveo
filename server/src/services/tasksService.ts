import { ISuggestedTask, SuggestedTask } from '../models/SuggestedTask';
import { CustomError } from '../classes/CustomError';


export const createTask = async (name: string, tags: string[]): Promise<ISuggestedTask> => {
    try {
        const task = new SuggestedTask({ name, tags });
        return await task.save();
    } catch (error: any) {
        if (error.code === 11000) {
            throw new CustomError('Task name already exists', 400);
        }
        throw new CustomError('Failed to create task', 500);
    }
}

export const getTasks = async (): Promise<ISuggestedTask[]> => {
    try {
        const tasks = await SuggestedTask.find();
        return tasks;
    } catch (error: any) {
        console.error('Error getting tasks:', error);
        throw new CustomError('Failed to get tasks', 500);
    }
}