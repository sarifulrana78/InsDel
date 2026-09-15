import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  role: 'sender' | 'commuter' | 'admin';
  nidNumber?: string;
  nidFrontUrl?: string;
  nidBackUrl?: string;
  liveSelfieUrl?: string;
  nidStatus: 'unverified' | 'pending' | 'verified' | 'rejected';
  profilePicture?: string;
  walletBalance: number;
  rating: number;
  totalCompletedJobs: number;
  isBlocked: boolean;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  role: { type: String, enum: ['sender', 'commuter', 'admin'], default: 'sender' },
  nidNumber: { type: String },
  nidFrontUrl: { type: String },
  nidBackUrl: { type: String },
  liveSelfieUrl: { type: String },
  nidStatus: { type: String, enum: ['unverified', 'pending', 'verified', 'rejected'], default: 'unverified' },
  profilePicture: { type: String },
  walletBalance: { type: Number, default: 0 },
  rating: { type: Number, default: 5.0 },
  totalCompletedJobs: { type: Number, default: 0 },
  isBlocked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IUser>('User', UserSchema);
