import { Call, ICall } from '../models/Call';
import { CustomError } from '../classes/CustomError';
import { TaskStatus } from '../models/CallTask';
import { SuggestedTask } from '../models/SuggestedTask';
import mongoose from 'mongoose';

export const createCall = async (name: string): Promise<ICall> => {
    try {
        const call = new Call({ name });
        return await call.save();
    } catch (error: any) {
        if (error.code === 11000) {
            
            throw new CustomError('Call name already exists', 400);
        }
        console.error('Error creating call:', error);
        throw new CustomError('Internal server error: Failed to create call', 500);
    }
}

export const getCalls = async (): Promise<ICall[]> => {
    try {
        
            return Call.find()
        }

     catch (error) {
        console.error('Error getting calls:', error);
        throw new CustomError('Internal server error: Failed to get calls', 500);
    }
}

export const getCallById = async (callId: string, populateSuggestedTasks: boolean = false): Promise<ICall | null> => {
    try {
        if (populateSuggestedTasks) {
            return Call.findById(callId).populate({
                path: 'tasks.suggestedTaskId',
                model: 'SuggestedTask',
                select: 'name tags'
            });
        }
        return Call.findById(callId);
    } catch (error) {
        console.error('Error getting call by ID:', error);
        throw new CustomError('Internal server error: Failed to get call', 500);
    }
}

export const getCallsWithSuggestedTasks = async (): Promise<ICall[]> => {
    try {
        return Call.find().populate({
            path: 'tasks.suggestedTaskId',
            model: 'SuggestedTask',
            select: 'name tags'
        });
    } catch (error) {
        console.error('Error getting calls with suggested tasks:', error);
        throw new CustomError('Internal server error: Failed to get calls with suggested tasks', 500);
    }
}

export const addTagToCall = async (callId: string, tagIds: string[]): Promise<ICall> => {
    try {
        const call = await Call.findByIdAndUpdate(callId, 
            { $addToSet: { tags: { $each: tagIds } } }, 
            {runValidators: true, new: true}
        );
        if (!call) {
            throw new CustomError('Call not found', 404);
        }
        return call;
    } catch (error: any) {
        if (error.name === 'CustomError') throw error;
        console.error('Error adding tags to call:', error);

        if (error.name === 'ValidationError') {
            throw new CustomError('Invalid tag IDs', 404);
        }
        if (error.code === 11000) {
            throw new CustomError('Tag already exists', 400);
        }

        throw new CustomError('Internal server error: Failed to add tags to call', 500);
    }
}

export const addTaskToCall = async (callId: string, name: string): Promise<ICall> => {
    if (!name || !name.trim()) {
        throw new CustomError('Task name is required', 400);
    }

   try {
    const call = await Call.findById(callId);
    if (!call) {
        throw new CustomError('Call not found', 404);
    }

    const nameExists = call.tasks.some(task => task.name?.toLowerCase() === name.toLowerCase());
    if (nameExists) {
        throw new CustomError('Task name already exists', 400);
    }

    call.tasks.push({ 
        name: name.trim(),
        status: 'open'
     });

     await call.save();
     return call;
   } catch (error: any) {
    if (error.name === 'CustomError') throw error;
    console.error('Error adding task to call:', error);
    throw new CustomError('Internal server error: Failed to add task to call', 500);
   }
}

export const addSuggestedTaskToCall = async (callId: string, suggestedTaskId: string): Promise<ICall> => {
    if (!suggestedTaskId) {
        throw new CustomError('Suggested task ID is required', 400);
    }

    try {
        const call = await Call.findById(callId);
        if (!call) {
            throw new CustomError('Call not found', 404);
        }

        // Validate that the suggested task exists
        const suggestedTask = await SuggestedTask.findById(suggestedTaskId);
        if (!suggestedTask) {
            throw new CustomError('Suggested task not found', 404);
        }

        // Check if this suggested task is already added to the call
        const taskExists = call.tasks.some(task => 
            task.suggestedTaskId?.toString() === suggestedTaskId
        );
        if (taskExists) {
            throw new CustomError('Suggested task already exists in this call', 400);
        }

        // Add the suggested task to the call
        call.tasks.push({ 
            suggestedTaskId: new mongoose.Types.ObjectId(suggestedTaskId),
            status: 'open'
        });

        await call.save();
        return call;
    } catch (error: any) {
        if (error.name === 'CustomError') throw error;
        console.error('Error adding suggested task to call:', error);
        throw new CustomError('Internal server error: Failed to add suggested task to call', 500);
    }
}

export const updateTaskStatus = async (callId: string, taskId: string, status: TaskStatus): Promise<ICall> => {
    try {
        // Validate status is a valid TaskStatus
        const validStatuses: TaskStatus[] = ['open', 'in progress', 'completed'];
        if (!validStatuses.includes(status)) {
            throw new CustomError(`Invalid status. Must be one of: ${validStatuses.join(', ')}`, 400);
        }

        const call = await Call.findById(callId);
        if (!call) {
            throw new CustomError('Call not found', 404);
        }

        const task = call.tasks.find(task => task._id?.toString() === taskId);
        if (!task) {
            throw new CustomError('Task not found', 404);
        }

        // Update the task status
        task.status = status;
        await call.save();
        
        console.log(`Task status updated to: ${status}`);
        return call;
    } catch (error: any) {
        if (error.name === 'CustomError') throw error;
        console.error('Error updating task status:', error);
        throw new CustomError('Internal server error: Failed to update task status', 500);
    }
}
