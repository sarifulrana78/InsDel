import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export const riskAssessmentMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { senderId, pickupLocation } = req.body;
    let riskScore = 0;

    // 1. Check Account Age
    if (senderId) {
      const user = await User.findById(senderId);
      if (user) {
        const accountAgeHrs = (Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60);
        if (accountAgeHrs < 48) {
          riskScore += 40;
        }
      }
    }

    // 2. Check Night Hours (11 PM - 5 AM local time)
    // Assuming local time for Bangladesh is GMT+6
    const currentHour = new Date().getUTCHours() + 6;
    const localHour = currentHour >= 24 ? currentHour - 24 : currentHour;
    if (localHour >= 23 || localHour < 5) {
      riskScore += 30;
    }

    // 3. Check Location Safety (Geoshield)
    // For now, if the pickup division is not specifically Dhaka (or missing metroStation), add risk
    // Or if it's not in our explicit metro list.
    if (pickupLocation && !pickupLocation.metroStation) {
       riskScore += 20;
    }

    // Attach risk score to request body so controller can save it
    req.body.riskScore = riskScore;
    req.body.isFlagged = riskScore >= 60;
    
    // Mark status automatically if flagged
    if (req.body.isFlagged) {
       req.body.status = 'flagged_pending_review';
    }

    next();
  } catch (error) {
    console.error('Risk Assessment Error:', error);
    // On error, let it pass but maybe flag it safely? We'll just continue for now
    next();
  }
};
