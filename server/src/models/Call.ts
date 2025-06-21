import mongoose, { Document, Schema, Types } from 'mongoose';
import { ITag } from './Tag';
import { CallTaskSchema, ICallTask } from './CallTask';

export interface ICall extends Document {
    name: string;
    tasks: ICallTask[];
    tags: Types.ObjectId[] | ITag[];
}

const callSchema = new Schema<ICall>({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    tasks: [CallTaskSchema],
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag',
        }]
});

export const Call = mongoose.model<ICall>('Call', callSchema);
