import { Request, Response } from 'express';
import { createTag, getTags, updateTag } from '../services/tagsService';
import { CustomError } from '../classes/CustomError';
interface CreateTagRequest {
    name: string;
}

interface UpdateTagParams {
    id: string;
}

export const createTagController = async (req: Request<{}, {}, CreateTagRequest>, res: Response): Promise<void> => {
    const { name } = req.body;

    try {
        const tag = await createTag(name);
        res.status(201).json(tag);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.code).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const getTagsController = async (req: Request<{},{},{}>, res: Response): Promise<void> => {
    try {
        const tags = await getTags();
        res.status(200).json(tags);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.code).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const updateTagController = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const { name } = req.body;

    try {
        const tag = await updateTag(id, name);
        res.status(200).json(tag);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.code).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
