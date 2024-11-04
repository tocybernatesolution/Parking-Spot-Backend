// models/User.js
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
// Define the User schema
const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
  },
  username: {
    type: String,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['admin', 'customer'], 
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isDataComplete: {
    type: Boolean,
    default: false, 
  },
  isEmailVerify: {
    type: Boolean,
    default: false, 
  },
});

export default mongoose.model('User', userSchema);
