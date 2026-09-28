"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Mail, ShieldCheck, CheckCircle2, User, Phone } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'BN' | 'EN';
}

export function AuthModal({ isOpen, onClose, language }: AuthModalProps) {
  const router = useRouter();
  const { updateUser, switchRole } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'quick' | 'phone'>('quick');
  const [phone, setPhone] = useState('01712-345678');
  const [name, setName] = useState('তানভীর আহমেদ');
  const [selectedRole, setSelectedRole] = useState<'sender' | 'commuter'>('sender');

  if (!isOpen) return null;

  const handleLogin = (role: 'sender' | 'commuter' = 'sender') => {
    setIsLoading(true);
    setTimeout(() => {
      updateUser({
        name: name || (language === 'BN' ? 'তানভীর আহমেদ' : 'Tanvir Ahmed'),
        phone: phone || '01712-345678',
        role: role,
        isNidVerified: true
      });
      switchRole(role);
      setIsLoading(false);
      onClose();
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 sm:p-10">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center font-black text-white text-3xl shadow-lg mb-4 shadow-emerald-500/20">
              উ
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {language === 'BN' ? 'উসুল মামায় স্বাগতম!' : 'Welcome to Ushol Mama!'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              {language === 'BN' ? 'লগইন করে পার্সেল পাঠানো বা বহন শুরু করুন।' : 'Login to start sending or carrying parcels.'}
            </p>
          </div>

          {/* Role Choice */}
          <div className="mb-6 p-1 bg-slate-100 rounded-2xl flex items-center">
            <button
              type="button"
              onClick={() => setSelectedRole('sender')}
              className={`w-1/2 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                selectedRole === 'sender'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>📦</span>
              <span>{language === 'BN' ? 'আমি পার্সেল পাঠাব' : 'I am a Sender'}</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('commuter')}
              className={`w-1/2 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                selectedRole === 'commuter'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>🎒</span>
              <span>{language === 'BN' ? 'আমি যাত্রী / আয় করব' : 'I am a Commuter'}</span>
            </button>
          </div>

          <div className="space-y-3">
            {/* Quick One-Click Login */}
            <button
              onClick={() => handleLogin(selectedRole)}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-500/20 transition disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>
                    {language === 'BN' ? 'ভেরিফাইড প্রোফাইলে প্রবেশ করুন' : 'Instant One-Click Login'}
                  </span>
                </>
              )}
            </button>

            {/* Google Login button */}
            <button
              onClick={() => handleLogin(selectedRole)}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 px-6 py-3.5 border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition focus:outline-none"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-slate-700 font-bold text-xs">
                {language === 'BN' ? 'Google অ্যাকাউন্ট দিয়ে লগইন' : 'Continue with Google'}
              </span>
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center space-x-1.5 text-xs text-emerald-700 bg-emerald-50 py-2 rounded-xl border border-emerald-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">Porichoy API NID ভেরিফিকেশন সক্রিয়</span>
          </div>

          <p className="mt-6 text-center text-[11px] text-slate-400 leading-relaxed">
            {language === 'BN' ? 'লগইন করার মাধ্যমে আপনি আমাদের ' : 'By continuing, you agree to our '}
            <a href="#" className="text-emerald-600 font-semibold hover:underline">
              {language === 'BN' ? 'শর্তাবলী' : 'Terms'}
            </a>
            {language === 'BN' ? ' ও ' : ' & '}
            <a href="#" className="text-emerald-600 font-semibold hover:underline">
              {language === 'BN' ? 'নিরাপত্তা নীতিমালা' : 'Safety Rules'}
            </a>
            {language === 'BN' ? ' মেনে নিচ্ছেন।' : '.'}
          </p>
        </div>
      </div>
    </div>
  );
}
