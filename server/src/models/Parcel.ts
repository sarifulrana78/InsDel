import mongoose, { Schema, Document } from 'mongoose';

export interface IParcel extends Document {
  senderId: mongoose.Types.ObjectId;
  commuterId?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  category: 'document' | 'clothing' | 'electronics' | 'accessories' | 'other';
  declaredValueBDT: number;
  pickupLocation: {
    division: string;
    district: string;
    upazila: string;
    metroStation?: string;
    addressDetails: string;
  };
  recipientName: string;
  recipientPhone: string;
  dropoffLocation: {
    division: string;
    district: string;
    upazila: string;
    metroStation?: string;
    addressDetails: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  payoutBDT: number;
  status: 'pending' | 'accepted' | 'picked_up' | 'arrived_at_destination' | 'delivered' | 'cancelled' | 'flagged_pending_review' | 'reported';
  pickupOTP: string;
  dropoffOTP: string;
  isDelivered: boolean;
  legalDeclarationAccepted: boolean;
  inspectionPhotoUrl?: string;
  recipientLivePhotoUrl?: string;
  riskScore: number;
  isFlagged: boolean;
  createdAt: Date;
}

const ParcelSchema: Schema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  commuterId: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['document', 'clothing', 'electronics', 'accessories', 'other'], required: true },
  declaredValueBDT: { type: Number, required: true },
  pickupLocation: {
    division: { type: String, required: true },
    district: { type: String, required: true },
    upazila: { type: String, required: true },
    metroStation: { type: String },
    addressDetails: { type: String, required: true }
  },
  recipientName: { type: String, required: true },
  recipientPhone: { type: String, required: true },
  dropoffLocation: {
    division: { type: String, required: true },
    district: { type: String, required: true },
    upazila: { type: String, required: true },
    metroStation: { type: String },
    addressDetails: { type: String, required: true },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  payoutBDT: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'picked_up', 'arrived_at_destination', 'delivered', 'cancelled', 'flagged_pending_review', 'reported'], default: 'pending' },
  pickupOTP: { type: String, required: true },
  dropoffOTP: { type: String, required: true },
  isDelivered: { type: Boolean, default: false },
  legalDeclarationAccepted: { type: Boolean, required: true },
  inspectionPhotoUrl: { type: String },
  recipientLivePhotoUrl: { type: String },
  riskScore: { type: Number, default: 0 },
  isFlagged: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IParcel>('Parcel', ParcelSchema);
