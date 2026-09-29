import React, { useState } from 'react';
import { AlertTriangle, Info, CheckCircle2, X } from 'lucide-react';

interface SafetyDeclarationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
  language: 'BN' | 'EN';
  acceptText?: string;
}

export default function SafetyDeclarationModal({ 
  isOpen, 
  onClose, 
  onAccept, 
  language,
  acceptText 
}: SafetyDeclarationModalProps) {
  const [isAccepted, setIsAccepted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
        
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center space-x-3 text-rose-600">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">
                {language === 'BN' ? 'নিষিদ্ধ পণ্য তালিকা ও আইনি শপথ' : 'Prohibited Items & Legal Declaration'}
              </h2>
              <p className="text-xs text-rose-600 font-bold">
                {language === 'BN' ? 'জিরো টলারেন্স সেফটি ও আইনি গাইডলাইন' : 'Zero-Tolerance Safety Protocol & Legal Oath'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-5">
            <h3 className="font-bold text-rose-900 mb-4 text-sm flex items-center gap-2">
              <Info className="w-4 h-4 text-rose-600" />
              <span>
                {language === 'BN' ? 'এই প্ল্যাটফর্মে নিচের পণ্যগুলো বহন বা পাঠানো সম্পূর্ণ বেআইনি:' : 'The following items are strictly prohibited from transit:'}
              </span>
            </h3>
            <ul className="grid grid-cols-2 gap-3 text-xs sm:text-sm text-rose-800 font-medium">
              <li className="flex items-center p-2 rounded-lg bg-white/70 border border-rose-200/50">🚫 {language === 'BN' ? 'মাদকদ্রব্য ও অ্যালকোহল' : 'Narcotics & Alcohol'}</li>
              <li className="flex items-center p-2 rounded-lg bg-white/70 border border-rose-200/50">🚫 {language === 'BN' ? 'অস্ত্র বা বিস্ফোরক' : 'Weapons & Explosives'}</li>
              <li className="flex items-center p-2 rounded-lg bg-white/70 border border-rose-200/50">🚫 {language === 'BN' ? 'নগদ টাকা (৳৫০০+) ও স্বর্ণ' : 'Cash (৳500+) & Gold'}</li>
              <li className="flex items-center p-2 rounded-lg bg-white/70 border border-rose-200/50">🚫 {language === 'BN' ? 'চোরাই বা বেআইনি মাল' : 'Stolen / Illegal Goods'}</li>
              <li className="flex items-center p-2 rounded-lg bg-white/70 border border-rose-200/50">🚫 {language === 'BN' ? 'দাহ্য পদার্থ ও কেমিক্যাল' : 'Flammable Chemicals'}</li>
              <li className="flex items-center p-2 rounded-lg bg-white/70 border border-rose-200/50">🚫 {language === 'BN' ? 'খোলা পচনশীল খাবার' : 'Perishable / Liquid Food'}</li>
            </ul>
          </div>

          {/* Legal references */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1.5 leading-relaxed">
            <span className="font-bold text-slate-800 block">
              {language === 'BN' ? 'বাংলাদেশ প্রচলিত আইন ও ধারা:' : 'Governing Bangladesh Statutes:'}
            </span>
            <p>
              • {language === 'BN' ? 'মাদকদ্রব্য নিয়ন্ত্রণ আইন ২০১৮ এবং সাইবার নিরাপত্তা আইন ২০২৩' : 'Narcotics Control Act 2018 & Cyber Security Act 2023'}
            </p>
            <p>
              • {language === 'BN' ? 'পোস্ট অফিস আইন ১৮৯৮ ও ডিজিটাল কমার্স পরিচালনা নির্দেশিকা ২০২১' : 'Post Office Act 1898 & Digital Commerce Guidelines 2021'}
            </p>
            <p className="text-slate-500 pt-1">
              {language === 'BN' 
                ? 'আইন অমান্যকারী ব্যবহারকারীর সম্পূর্ণ অডিট ট্রেইল, এনআইডি এবং আইপি ঠিকানা তাত্ক্ষণিক আইনশৃঙ্খলা রক্ষাকারী বাহিনীর কাছে হস্তান্তর করা হবে।' 
                : 'Violators will be immediately reported to law enforcement agencies with complete audit logs, Porichoy NID data, and IP tracking.'}
            </p>
          </div>

          {onAccept && (
            <div className="space-y-4">
              <label className="flex items-start space-x-4 p-4 border-2 rounded-2xl cursor-pointer transition-colors border-emerald-500 bg-emerald-50/50">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 mt-0.5 accent-emerald-600 rounded cursor-pointer"
                  checked={isAccepted}
                  onChange={(e) => setIsAccepted(e.target.checked)}
                />
                <div className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                  {language === 'BN' 
                    ? 'আমি শপথ করছি যে এই পার্সেলে কোনো মাদক, আগ্নেয়াস্ত্র বা বেআইনি পণ্য নেই। মিথ্যা তথ্য দিলে বাংলাদেশের আইন অনুযায়ী আমার NID ও তথ্য আইনশৃঙ্খলা বাহিনীর কাছে হস্তান্তর করা হবে।'
                    : 'I swear that this parcel does not contain any narcotics, firearms, or illegal items. If false, my NID and data will be handed over to law enforcement according to BD Law.'}
                </div>
              </label>
            </div>
          )}

          <div className="flex space-x-3 pt-2">
            <button 
              onClick={onClose}
              className="px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 active:scale-[0.98] w-full text-xs sm:text-sm cursor-pointer"
            >
              {language === 'BN' ? 'বন্ধ করুন' : 'Close'}
            </button>
            {onAccept && (
              <button 
                onClick={() => isAccepted && onAccept()}
                disabled={!isAccepted}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-200 w-full flex items-center justify-center space-x-2 text-xs sm:text-sm cursor-pointer
                  ${isAccepted 
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-200 hover:-translate-y-0.5 active:scale-[0.98]' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{acceptText || (language === 'BN' ? 'সম্মত আছি' : 'I Agree')}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
