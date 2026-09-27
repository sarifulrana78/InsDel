import React, { useState } from 'react';
import { X, Mail } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'BN' | 'EN';
}

export function AuthModal({ isOpen, onClose, language }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/dashboard'; // Or close modal depending on logic
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 sm:p-10">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center font-black text-white text-3xl shadow-lg mb-6">
              উ
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
              {language === 'BN' ? 'উসুল মামায় স্বাগতম!' : 'Welcome to Ushol Mama!'}
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              {language === 'BN' ? 'লগইন করে আপনার পার্সেল পাঠানো শুরু করুন।' : 'Login to start sending your parcels.'}
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 px-6 py-3.5 border-2 border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition focus:outline-none focus:ring-4 focus:ring-slate-100 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              )}
              <span className="text-slate-700 font-bold text-sm">
                {language === 'BN' ? 'Google দিয়ে কন্টিনিউ করুন' : 'Continue with Google'}
              </span>
            </button>

            <button
              onClick={() => alert('Coming soon!')}
              className="w-full flex items-center justify-center space-x-3 px-6 py-3.5 border-2 border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition focus:outline-none focus:ring-4 focus:ring-slate-100"
            >
              <Mail className="w-5 h-5 text-slate-600" />
              <span className="text-slate-700 font-bold text-sm">
                {language === 'BN' ? 'ইমেইল দিয়ে কন্টিনিউ করুন' : 'Continue with Email'}
              </span>
            </button>
          </div>

          <p className="mt-8 text-center text-xs text-slate-500 leading-relaxed">
            {language === 'BN' ? 'অ্যাকাউন্ট তৈরি করার মাধ্যমে আপনি আমাদের ' : 'By continuing, you agree to our '}
            <a href="#" className="text-emerald-600 font-semibold hover:underline">
              {language === 'BN' ? 'টার্মস অ্যান্ড কন্ডিশনস' : 'Terms of Service'}
            </a>
            {language === 'BN' ? ' এবং ' : ' and '}
            <a href="#" className="text-emerald-600 font-semibold hover:underline">
              {language === 'BN' ? 'প্রাইভেসি পলিসি' : 'Privacy Policy'}
            </a>
            {language === 'BN' ? ' তে সম্মতি দিচ্ছেন।' : '.'}
          </p>
        </div>
      </div>
    </div>
  );
}
