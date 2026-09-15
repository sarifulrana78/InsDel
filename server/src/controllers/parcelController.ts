import { Request, Response } from 'express';
import Parcel from '../models/Parcel';
import User from '../models/User';

// Generate 6-digit random OTP
const generateOTP = (): string => Math.floor(100000 + Math.random() * 900000).toString();

export const createParcel = async (req: Request, res: Response): Promise<any> => {
  try {
    const { 
      senderId, title, description, category, declaredValueBDT, 
      pickupLocation, recipientName, recipientPhone, dropoffLocation, payoutBDT,
      legalDeclarationAccepted, riskScore, isFlagged, status
    } = req.body;

    if (!legalDeclarationAccepted) {
       return res.status(400).json({ success: false, message: 'Legal declaration must be accepted.' });
    }

    const newParcel = new Parcel({
      senderId,
      title,
      description,
      category,
      declaredValueBDT,
      pickupLocation,
      recipientName,
      recipientPhone,
      dropoffLocation,
      payoutBDT,
      legalDeclarationAccepted,
      riskScore: riskScore || 0,
      isFlagged: isFlagged || false,
      pickupOTP: generateOTP(),
      dropoffOTP: generateOTP(),
      status: status || 'pending'
    });

    await newParcel.save();
    return res.status(201).json({ success: true, message: 'Parcel order created!', parcel: newParcel });
  } catch (error) {
    return res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const searchAvailableParcels = async (req: Request, res: Response): Promise<any> => {
  try {
    const { pickupMetro, dropoffMetro } = req.query;

    const query: any = { status: 'pending' };
    if (pickupMetro) query['pickupLocation.metroStation'] = pickupMetro;
    if (dropoffMetro) query['dropoffLocation.metroStation'] = dropoffMetro;

    const parcels = await Parcel.find(query).populate('senderId', 'name rating phone');
    return res.status(200).json({ success: true, count: parcels.length, parcels });
  } catch (error) {
    return res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const verifyDeliveryOTP = async (req: Request, res: Response): Promise<any> => {
  try {
    const { parcelId, otp } = req.body;
    const parcel = await Parcel.findById(parcelId);

    if (!parcel) return res.status(404).json({ success: false, message: 'Parcel not found' });
    if (parcel.dropoffOTP !== otp) return res.status(400).json({ success: false, message: 'Invalid OTP' });

    parcel.status = 'delivered';
    await parcel.save();

    // Release payment to commuter wallet
    if (parcel.commuterId) {
      await User.findByIdAndUpdate(parcel.commuterId, {
        $inc: { walletBalance: parcel.payoutBDT, totalCompletedJobs: 1 }
      });
    }

    return res.status(200).json({ success: true, message: 'Delivery completed & payout released!' });
  } catch (error) {
    return res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const reportParcel = async (req: Request, res: Response): Promise<any> => {
  try {
    const { parcelId } = req.params;
    const parcel = await Parcel.findById(parcelId);

    if (!parcel) return res.status(404).json({ success: false, message: 'Parcel not found' });

    // Mark parcel as reported
    parcel.status = 'reported';
    parcel.isFlagged = true;
    await parcel.save();

    // Block the sender account
    if (parcel.senderId) {
      await User.findByIdAndUpdate(parcel.senderId, { isBlocked: true });
    }

    // Commuter Gig is cancelled, Payout invalidated (already via 'reported' status instead of 'delivered')
    
    // In a real app, this would trigger an alert to the Safety Desk and possibly 999 integration API.
    console.log(`EMERGENCY: Parcel ${parcelId} reported. Sender ${parcel.senderId} blocked.`);

    return res.status(200).json({ success: true, message: 'Parcel reported. Account blocked and safety desk alerted.' });
  } catch (error) {
    return res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const arriveAtDestination = async (req: Request, res: Response): Promise<any> => {
  try {
    const { parcelId } = req.params;
    const parcel = await Parcel.findById(parcelId);

    if (!parcel) return res.status(404).json({ success: false, message: 'Parcel not found' });
    
    parcel.status = 'arrived_at_destination';
    await parcel.save();

    // Trigger SMS dispatch to recipient
    console.log(`[SMS MOCK] Dispatching OTP ${parcel.dropoffOTP} to Recipient ${parcel.recipientName} at ${parcel.recipientPhone}`);

    return res.status(200).json({ success: true, message: 'Arrived at destination. OTP sent to recipient.' });
  } catch (error) {
    return res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const verifyRecipientDelivery = async (req: Request, res: Response): Promise<any> => {
  try {
    const { parcelId } = req.params;
    const { enteredOTP, recipientLivePhotoUrl } = req.body;
    
    const parcel = await Parcel.findById(parcelId);
    if (!parcel) return res.status(404).json({ success: false, message: 'Parcel not found' });

    if (parcel.dropoffOTP !== enteredOTP) {
      return res.status(400).json({ success: false, message: 'Invalid OTP. Handover failed.' });
    }

    if (!recipientLivePhotoUrl) {
      return res.status(400).json({ success: false, message: 'Live photo of recipient receiving parcel is required.' });
    }

    parcel.recipientLivePhotoUrl = recipientLivePhotoUrl;
    parcel.isDelivered = true;
    parcel.status = 'delivered';
    await parcel.save();

    // Release payment to commuter wallet
    if (parcel.commuterId) {
      await User.findByIdAndUpdate(parcel.commuterId, {
        $inc: { walletBalance: parcel.payoutBDT, totalCompletedJobs: 1 }
      });
    }

    return res.status(200).json({ success: true, message: 'Secure Handover completed! Payout released.' });
  } catch (error) {
    return res.status(500).json({ success: false, error: (error as Error).message });
  }
};
