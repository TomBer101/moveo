import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
    title: string;
    status: 'open' | 'in progress' | 'completed';
}

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['open', 'in progress', 'completed'],
        default: 'open'
    }
});

export const Task = mongoose.model<ITask>('Task', taskSchema);
