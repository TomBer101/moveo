import { Call, ICall } from '../models/Call';
import { CustomError } from '../classes/CustomError';
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
        return Call.find();
    } catch (error) {
        console.error('Error getting calls:', error);
        throw new CustomError('Internal server error: Failed to get calls', 500);
    }
}

export const addTagToCall = async (callId: string, tagIds: string[]): Promise<ICall> => {
    try {
        const call = await Call.findByIdAndUpdate(callId, 
            { $addToSet: { tags: { $each: tagIds } } }, 
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
