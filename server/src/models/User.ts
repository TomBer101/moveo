import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// User interface
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  password: string;
  role: string;
}

// User schema
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['admin', 'user'],
    default: 'user'
  }
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password; // Remove password from JSON output
      return ret;
    }
  }
});

// Create and export the model
export const User = mongoose.model<IUser>('User', userSchema); 