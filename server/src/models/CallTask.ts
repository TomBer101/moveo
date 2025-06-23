import mongoose, { Schema, Types } from 'mongoose';

export type TaskStatus = 'open' | 'in progress' | 'completed';

export interface ICallTask {
    _id?: Types.ObjectId;
    status: TaskStatus;
    name?: string;
    suggestedTaskId?: Types.ObjectId;
}

export const CallTaskSchema = new Schema<ICallTask>({
    status: {
        type: String,
        enum: ['open', 'in progress', 'completed'],
        default: 'open',
        require: true
    },
    suggestedTaskId: {
        type: Schema.Types.ObjectId,
        ref: 'SuggestedTask',
        required: function(this: ICallTask) {
            return !this.name;
        }
    },
    name: {
        type: String,
        required: function(this: ICallTask) {
            return !this.suggestedTaskId;
        },
        trim: true
    }
}, {
    _id: true
});

// Index for efficient queries
CallTaskSchema.index({ suggestedTaskId: 1 });


