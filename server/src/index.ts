import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { createParcel, searchAvailableParcels, verifyDeliveryOTP, reportParcel, arriveAtDestination, verifyRecipientDelivery } from './controllers/parcelController';
import { verifyNidAndSelfie } from './controllers/authController';
import { riskAssessmentMiddleware } from './middleware/riskAssessmentMiddleware';
import { geofenceMiddleware } from './middleware/geofenceMiddleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.VITE_API_BASE_URL || 'http://localhost:3000'
}));
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('Ushol Mama API is running!');
});

// Auth / Compliance Routes
app.post('/api/v1/auth/verify-nid', verifyNidAndSelfie);

// Parcel Routes
app.post('/api/v1/parcels', riskAssessmentMiddleware, createParcel);
app.get('/api/v1/parcels/search', searchAvailableParcels);
app.post('/api/v1/parcels/verify', verifyDeliveryOTP);
app.post('/api/v1/parcels/:parcelId/report', reportParcel);
app.post('/api/v1/parcels/:parcelId/arrive', arriveAtDestination);
app.post('/api/v1/parcels/:parcelId/verify-recipient', geofenceMiddleware, verifyRecipientDelivery);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/usholmama')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
