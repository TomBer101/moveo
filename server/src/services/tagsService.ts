import Tag, { ITag } from '../models/Tag';
import { CustomError } from '../classes/CustomError';

export const createTag = async (name: string): Promise<ITag> => {

    try {
        const tag = await Tag.findOne({name});
        if (tag) {
            throw new CustomError('Tag name already exists', 400);
        }
    } catch (error) {
        if (error instanceof CustomError) throw error;
        console.error('Error creating tag:', error);
        throw new CustomError('Internal server error: Failed to create tag', 500);
    }

    const newTag = new Tag({name});
    return newTag.save();
}

export const getTags = async (): Promise<ITag[]> => {
    try {
        return Tag.find();
    } catch (error) {
        console.error('Error getting tags:', error);
        throw new CustomError('Internal server error: Failed to get tags', 500);
    }
}

export const updateTag = async (id: string, name: string): Promise<ITag> => {
    try {
        const tag = await Tag.findByIdAndUpdate(id, {name}, {new: true});
        if (!tag) {
            throw new CustomError('Tag not found', 404);
        }
        return tag;
    } catch (error) {
        if (error instanceof CustomError) throw error;
        console.error('Error updating tag:', error);
        throw new CustomError('Internal server error: Failed to update tag', 500);
    }
}




