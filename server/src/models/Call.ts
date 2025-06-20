import mongoose, { Document, Schema } from 'mongoose';
import { ITask } from './Task';
import { ITag } from './Tag';

export interface ICall extends Document {
    title: string;
    tasks: mongoose.Types.ObjectId[] | ITask[];
    tags: mongoose.Types.ObjectId[] | ITag[];
}

const callSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }]
});

export const Call = mongoose.model<ICall>('Call', callSchema);
