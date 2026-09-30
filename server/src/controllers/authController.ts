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
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { identifier, password, role } = req.body;
    if (!identifier) {
      return res.status(400).json({ success: false, message: 'Identifier (email or phone) is required.' });
    }

    // Check if user exists or return mock/demo user
    let user = await User.findOne({ 
      $or: [{ email: identifier }, { phone: identifier }] 
    });

    if (!user) {
      // Create user on the fly if testing
      const isEmail = identifier.includes('@');
      user = new User({
        name: isEmail ? identifier.split('@')[0] : `User-${identifier.slice(-4)}`,
        email: isEmail ? identifier : `${identifier}@usholmama.com`,
        phone: isEmail ? '01700-000000' : identifier,
        role: role || 'sender',
        walletBalance: 350,
        rating: 4.95,
        nidStatus: 'verified'
      });
      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        walletBalance: user.walletBalance,
        nidStatus: user.nidStatus
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const registerUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, emailOrPhone, role, nidNumber } = req.body;
    if (!name || !emailOrPhone) {
      return res.status(400).json({ success: false, message: 'Name and email or phone are required.' });
    }

    const isEmail = emailOrPhone.includes('@');
    const newUser = new User({
      name,
      email: isEmail ? emailOrPhone : `${emailOrPhone}@usholmama.com`,
      phone: isEmail ? '01700-000000' : emailOrPhone,
      role: role || 'sender',
      nidNumber: nidNumber || '',
      nidStatus: nidNumber ? 'verified' : 'unverified',
      walletBalance: 200 // Bonus
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      user: newUser
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const googleAuth = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, name, role } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Google email is required.' });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name: name || 'Google User',
        email,
        phone: '01712-345678',
        role: role || 'sender',
        walletBalance: 500,
        nidStatus: 'verified'
      });
      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: 'Google login successful',
      user
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: (error as Error).message });
  }
};
