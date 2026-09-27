import React, { useState } from 'react';
import { AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

interface SafetyDeclarationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  language: 'BN' | 'EN';
}

export default function SafetyDeclarationModal({ isOpen, onClose, onAccept, language }: SafetyDeclarationModalProps) {
  const [isAccepted, setIsAccepted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-8">
          <div className="flex items-center space-x-3 text-rose-600 mb-6">
            <AlertTriangle className="w-8 h-8" />
            <h2 className="text-2xl font-black">
              {language === 'BN' ? 'নিষিদ্ধ পণ্য তালিকা ও আইনি শপথ' : 'Prohibited Items & Legal Declaration'}
            </h2>
          </div>

          <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 mb-8">
            <h3 className="font-bold text-rose-900 mb-4">
              {language === 'BN' ? 'এই প্ল্যাটফর্মে নিচের পণ্যগুলো পাঠানো সম্পূর্ণ বেআইনি:' : 'The following items are strictly prohibited:'}
            </h3>
            <ul className="grid grid-cols-2 gap-3 text-sm text-rose-800 font-medium">
              <li className="flex items-center">🚫 {language === 'BN' ? 'মাদকদ্রব্য' : 'Narcotics'}</li>
              <li className="flex items-center">🚫 {language === 'BN' ? 'অস্ত্র বা বিস্ফোরক' : 'Weapons/Explosives'}</li>
              <li className="flex items-center">🚫 {language === 'BN' ? 'অ্যালকোহল' : 'Alcohol'}</li>
              <li className="flex items-center">🚫 {language === 'BN' ? 'চুরি করা পণ্য' : 'Stolen Goods'}</li>
              <li className="flex items-center">🚫 {language === 'BN' ? 'নগদ টাকা (৳৫০০+)' : 'Cash (৳500+)'}</li>
              <li className="flex items-center">🚫 {language === 'BN' ? 'পচনশীল খাদ্য' : 'Perishable Food'}</li>
            </ul>
          </div>

          <div className="space-y-4 mb-8">
            <label className="flex items-start space-x-4 p-5 border-2 rounded-xl cursor-pointer transition-colors border-emerald-500 bg-emerald-50/50">
              <input 
                type="checkbox" 
                className="w-6 h-6 mt-1 accent-emerald-600 rounded"
                checked={isAccepted}
                onChange={(e) => setIsAccepted(e.target.checked)}
              />
              <div className="text-sm font-semibold text-slate-800 leading-relaxed">
                {language === 'BN' 
                  ? 'আমি শপথ করছি যে এই পার্সেলে কোনো মাদক, আগ্নেয়াস্ত্র বা বেআইনি পণ্য নেই। মিথ্যা তথ্য দিলে বাংলাদেশের আইন অনুযায়ী আমার NID ও তথ্য আইনশৃঙ্খলা বাহিনীর কাছে হস্তান্তর করা হবে।'
                  : 'I swear that this parcel does not contain any narcotics, firearms, or illegal items. If false, my NID and data will be handed over to law enforcement according to BD Law.'}
              </div>
            </label>
          </div>

          <div className="flex space-x-4">
            <button 
              onClick={onClose}
              className="px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 active:scale-[0.98] w-full"
            >
              {language === 'BN' ? 'বাতিল করুন' : 'Cancel'}
            </button>
            <button 
              onClick={() => isAccepted && onAccept()}
              disabled={!isAccepted}
              className={`px-6 py-3 rounded-xl font-bold transition-all duration-200 w-full flex items-center justify-center space-x-2
                ${isAccepted 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-200 hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{language === 'BN' ? 'সম্মত আছি ও পোস্ট করুন' : 'I Agree & Post'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
