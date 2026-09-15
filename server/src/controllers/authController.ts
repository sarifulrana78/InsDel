import { Request, Response } from 'express';
import User from '../models/User';

export const verifyNidAndSelfie = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId, nidNumber, nidFrontUrl, nidBackUrl, liveSelfieUrl } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    // Mock Porichoy API logic
    // In a real scenario, this would send the NID and Selfie to the Porichoy API to ensure they match.
    console.log(`[Porichoy Mock API] Verifying NID ${nidNumber} against live selfie...`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For the sake of the demo, if NID length is valid, we verify.
    if (nidNumber && nidNumber.length >= 10) {
      user.nidNumber = nidNumber;
      user.nidFrontUrl = nidFrontUrl;
      user.nidBackUrl = nidBackUrl;
      user.liveSelfieUrl = liveSelfieUrl;
      user.nidStatus = 'verified';
      await user.save();

      return res.status(200).json({ success: true, message: 'NID and Identity successfully verified!' });
    } else {
      user.nidStatus = 'rejected';
      await user.save();
      return res.status(400).json({ success: false, message: 'Invalid NID or Selfie mismatch.' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: (error as Error).message });
  }
};
