import { Request, Response } from 'express';
import { addTagToCall, addTaskToCall, createCall, getCalls } from '../services/callsService';
import { CustomError } from '../classes/CustomError';
import { ICall } from '@/models/Call';

interface CreateCallRequest {
    name: string;
}

interface AddTagToCallRequest {
    tagIds: string[];
}

interface AddTaskToCallRequest {
    name?: string;
    suggestedTaskId?: string;
}

interface UpdateCallParams {
    callId: string;
}

export const createCallController = async (req: Request<{}, {}, CreateCallRequest>, res: Response): Promise<void> => {
    const { name } = req.body;

    try {
        const call = await createCall(name);
        res.status(201).json(call);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.code).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const addTagToCallController = async (req: Request<UpdateCallParams, {}, AddTagToCallRequest>, res: Response): Promise<void> => {
    const { callId } = req.params;
    const { tagIds } = req.body;

    try {
        const call = await addTagToCall(callId, tagIds);
        res.status(200).json(call);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.code).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const addTaskToCallController = async (req: Request<UpdateCallParams, {}, AddTaskToCallRequest>, res: Response): Promise<void> => {
    const { callId } = req.params;
    const { name, suggestedTaskId } = req.body;

    try {
        let result: ICall;
        if (suggestedTaskId) {
            result = await addTaskToCall(callId, suggestedTaskId);
        } else if (name) {
            result = await addTaskToCall(callId, name);
        } else {
            throw new CustomError('No task name or suggested task ID provided', 400);
        }

        res.status(200).json(result);
    } catch (error: any) {
        if (error.name === 'CustomError') {
            res.status(error.code).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const getCallsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const calls = await getCalls();
        res.status(200).json(calls);
    } catch (error: any) {
        if (error.name === 'CustomError') { 
            res.status(error.code).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

