import { Call, ICall } from '../models/Call';
import { CustomError } from '../classes/CustomError';

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


