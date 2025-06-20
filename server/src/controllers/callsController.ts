import { Request, Response } from 'express';
import { createCall, getCalls } from '../services/callsService';
import { CustomError } from '../classes/CustomError';

interface CreateCallRequest {

    name: string;
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


