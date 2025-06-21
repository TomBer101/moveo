import mongoose, { Document, Schema, Types } from 'mongoose';
import { ITag } from './Tag';


export interface ISuggestedTask extends Document {
    name: string;   
    tags: Types.ObjectId[] | ITag[];
}

const suggestedTaskSchema = new Schema<ISuggestedTask>({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag',
        required: false
    }]
}, {
    _id: true
});

export const SuggestedTask = mongoose.model<ISuggestedTask>('SuggestedTask', suggestedTaskSchema);
