import mongoose, { Document, Schema } from 'mongoose';
import { validateName } from '../utils';

export interface UserDocument extends Document {
  email: string;
  name: string;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    validate: {
      validator: validateName,
    },
  },
});

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;
