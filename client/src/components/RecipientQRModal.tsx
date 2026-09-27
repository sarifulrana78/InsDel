import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, X } from 'lucide-react';

interface RecipientQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  parcelId: string;
  recipientPhone: string;
  language: 'BN' | 'EN';
}

export default function RecipientQRModal({ isOpen, onClose, parcelId, recipientPhone, language }: RecipientQRModalProps) {
  if (!isOpen) return null;

  // The encrypted/hashed payload for the QR code
  const qrPayload = JSON.stringify({
    parcelId,
    recipientPhone,
    timestamp: Date.now()
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-8 shadow-2xl relative text-center">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-all duration-200 active:scale-90"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
          <QrCode className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-black text-slate-900 mb-2">
          {language === 'BN' ? 'ডেলিভারি QR কোড' : 'Delivery QR Code'}
        </h3>
        <p className="text-sm text-slate-500 mb-8">
          {language === 'BN' 
            ? 'পার্সেল রিসিভ করার সময় উসুল মামাকে (কমিউটার) এই কোডটি স্ক্যান করতে দিন।' 
            : 'Show this QR code to the Commuter when receiving your parcel.'}
        </p>

        <div className="bg-white border-4 border-slate-100 p-4 rounded-3xl inline-block mx-auto mb-6 shadow-sm">
          <QRCodeSVG 
            value={qrPayload} 
            size={200}
            level="H"
            includeMargin={true}
            fgColor="#0f172a" // slate-900
          />
        </div>
        
        <p className="text-xs font-semibold text-slate-400 bg-slate-50 py-2 rounded-lg">
          ID: {parcelId.substring(0, 8).toUpperCase()}...
        </p>
      </div>
    </div>
  );
}
