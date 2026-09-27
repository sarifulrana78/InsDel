import React, { useState } from 'react';
import { Camera, KeyRound, CheckCircle } from 'lucide-react';

interface RecipientOTPVerificationProps {
  language: 'BN' | 'EN';
  onSubmit: (otp: string, photo: File) => void;
}

export default function RecipientOTPVerification({ language, onSubmit }: RecipientOTPVerificationProps) {
  const [otp, setOtp] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (otp.length === 6 && photo) {
      onSubmit(otp, photo);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-6 text-slate-900">
        <KeyRound className="w-6 h-6 text-emerald-600" />
        <h3 className="text-xl font-bold">
          {language === 'BN' ? 'ফাইনাল হ্যান্ডওভার' : 'Final Handover'}
        </h3>
      </div>

      <div className="space-y-6">
        {/* OTP Input */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
            {language === 'BN' ? 'রিসিভারের OTP লিখুন' : 'Enter Recipient OTP'}
          </label>
          <input 
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            className="w-full text-center text-3xl tracking-[0.5em] font-black text-slate-900 bg-slate-50 border-2 border-slate-200 rounded-xl py-4 focus:outline-none focus:border-emerald-500 transition"
            placeholder="------"
          />
        </div>

        {/* Live Photo Evidence */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
            {language === 'BN' ? 'পার্সেল রিসিভ করার ছবি (Live)' : 'Live Photo of Handover'}
          </label>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition bg-slate-50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-500">
              {photo ? (
                <div className="flex items-center space-x-2 text-emerald-600">
                  <CheckCircle className="w-8 h-8" />
                  <span className="font-bold text-sm">Evidence Captured</span>
                </div>
              ) : (
                <>
                  <Camera className="w-8 h-8 mb-2" />
                  <p className="text-sm font-semibold">
                    {language === 'BN' ? 'ক্যামেরা চালু করুন' : 'Open Camera'}
                  </p>
                </>
              )}
            </div>
            {/* FORCE NATIVE CAMERA */}
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" 
              className="hidden" 
              onChange={handlePhotoCapture} 
            />
          </label>
        </div>

        <button 
          onClick={handleSubmit}
          disabled={otp.length !== 6 || !photo}
          className={`w-full py-4 rounded-xl font-bold transition-all duration-200 flex items-center justify-center space-x-2
            ${otp.length === 6 && photo 
              ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
        >
          <CheckCircle className="w-5 h-5" />
          <span>{language === 'BN' ? 'ডেলিভারি সম্পন্ন করুন' : 'Complete Delivery'}</span>
        </button>
      </div>
    </div>
  );
}
