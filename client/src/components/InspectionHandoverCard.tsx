import React, { useState } from 'react';
import { Camera, CheckCircle, PackageOpen } from 'lucide-react';

interface InspectionHandoverCardProps {
  language: 'BN' | 'EN';
  onInspectionComplete: (photo: File) => void;
}

export default function InspectionHandoverCard({ language, onInspectionComplete }: InspectionHandoverCardProps) {
  const [photo, setPhoto] = useState<File | null>(null);
  const [inspected, setInspected] = useState(false);

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleComplete = () => {
    if (inspected && photo) {
      onInspectionComplete(photo);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center space-x-3 text-slate-900 mb-6">
        <PackageOpen className="w-6 h-6 text-emerald-600" />
        <h3 className="text-xl font-bold">
          {language === 'BN' ? 'পিকআপ ও ইন্সপেকশন' : 'Pickup & Inspection'}
        </h3>
      </div>

      <div className="space-y-6">
        {/* Toggle Switch */}
        <label className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl cursor-pointer">
          <span className="text-sm font-semibold text-slate-700">
            {language === 'BN' ? 'আমি পার্সেল চেক করেছি এবং এটি সম্পূর্ণ স্বচ্ছ (Unsealed) অবস্থায় আছে।' : 'I have inspected the contents and it is unsealed.'}
          </span>
          <div className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={inspected} onChange={(e) => setInspected(e.target.checked)} />
            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </div>
        </label>

        {/* Live Camera Upload */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
            {language === 'BN' ? 'লাইভ ছবি তুলুন' : 'Capture Live Photo'}
          </label>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition bg-slate-50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-500">
              {photo ? (
                <div className="flex items-center space-x-2 text-emerald-600">
                  <CheckCircle className="w-8 h-8" />
                  <span className="font-bold text-sm">Photo Captured!</span>
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
            {/* FORCE NATIVE CAMERA (No Gallery) */}
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
          onClick={handleComplete}
          disabled={!inspected || !photo}
          className={`w-full py-4 rounded-xl font-bold transition-all duration-200 flex items-center justify-center
            ${inspected && photo 
              ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
        >
          {language === 'BN' ? 'পিকআপ কনফার্ম করুন' : 'Confirm Pickup'}
        </button>
      </div>
    </div>
  );
}
