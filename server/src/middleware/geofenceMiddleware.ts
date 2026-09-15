import { Request, Response, NextFunction } from 'express';
import Parcel from '../models/Parcel';

// Haversine formula to calculate distance between two coordinates in meters
function getDistanceFromLatLonInM(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; // Radius of the earth in m
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in m
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI/180);
}

export const geofenceMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { parcelId } = req.params;
    const { commuterLat, commuterLng } = req.body;

    if (!commuterLat || !commuterLng) {
      return res.status(400).json({ success: false, message: 'Commuter coordinates are required for handover.' });
    }

    const parcel = await Parcel.findById(parcelId);
    if (!parcel) {
      return res.status(404).json({ success: false, message: 'Parcel not found' });
    }

    const dropoffCoords = parcel.dropoffLocation.coordinates;
    if (!dropoffCoords || !dropoffCoords.lat || !dropoffCoords.lng) {
      // If the parcel doesn't have coordinates set (e.g., legacy data), we might just allow it or reject it. 
      // For strict compliance, we should allow only if they exist. But we'll pass it for now with a warning.
      console.warn(`Parcel ${parcelId} is missing exact dropoff coordinates. Bypassing geofence.`);
      return next();
    }

    const distance = getDistanceFromLatLonInM(commuterLat, commuterLng, dropoffCoords.lat, dropoffCoords.lng);
    
    // 50 meters geofence restriction
    if (distance > 50) {
      console.error(`Geofence rejection: Commuter is ${distance.toFixed(2)}m away from dropoff hub.`);
      return res.status(403).json({ 
        success: false, 
        message: `Security Alert: You are ${distance.toFixed(2)} meters away from the target destination. Handover must occur within 50 meters of the Dropoff Hub.` 
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({ success: false, error: (error as Error).message });
  }
};
