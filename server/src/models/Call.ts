import mongoose, { Document, Schema } from 'mongoose';
import { ITask } from './Task';
import { ITag } from './Tag';

export interface ICall extends Document {
    name: string;
    tasks: mongoose.Types.ObjectId[] | ITask[];
    tags: mongoose.Types.ObjectId[] | ITag[];
}

const callSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
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
