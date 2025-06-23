import { Request, Response } from 'express';
import { createTask, getTasks } from '../services/tasksService';
import { CustomError } from '../classes/CustomError';



interface CreateTaskRequest {
    name: string;
    tags: string[];
}

export const createTaskController = async (req: Request<{}, {}, CreateTaskRequest>, res: Response): Promise<void> => {
    const { name, tags } = req.body;

    try {
        const task = await createTask(name, tags);
        res.status(201).json(task);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.code).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }   
}

export const getTasksController = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks = await getTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}


