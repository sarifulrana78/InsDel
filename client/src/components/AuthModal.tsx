"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  X, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  User, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  AlertCircle,
  Check
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { isValidBangladeshiPhone, isValidEmail, checkPasswordStrength } from '@/utils/authUtils';
import { Logo3DMark } from '@/components/Logo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: 'BN' | 'EN';
  initialMode?: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, language: propLang, initialMode = 'login' }: AuthModalProps) {
  const router = useRouter();
  const { 
    language: contextLang, 
    loginManual, 
    loginWithGoogle, 
    registerManual, 
    switchRole 
  } = useApp();

  const lang = propLang || contextLang;

  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<'sender' | 'commuter'>('sender');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Form states
  const [loginIdentifier, setLoginIdentifier] = useState('01712-345678');
  const [loginPassword, setLoginPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  // Sign up states
  const [regName, setRegName] = useState('');
  const [regIdentifier, setRegIdentifier] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regNid, setRegNid] = useState('');

  // Google interactive picker state
  const [showGooglePicker, setShowGooglePicker] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrorMessage('');
      setSuccessMessage('');
      setShowGooglePicker(false);
    }
  }, [isOpen, initialMode]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Handle Manual Login Submit
  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!loginIdentifier.trim()) {
      setErrorMessage(lang === 'BN' ? 'অনুগ্রহ করে ইমেইল বা ফোন নম্বর দিন।' : 'Please enter your email or phone number.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      loginManual({
        identifier: loginIdentifier,
        password: loginPassword,
        role: selectedRole
      });
      switchRole(selectedRole);
      setIsLoading(false);
      setSuccessMessage(lang === 'BN' ? 'সফলভাবে লগইন হয়েছে!' : 'Login successful!');
      
      setTimeout(() => {
        onClose();
        router.push('/dashboard');
      }, 500);
    }, 600);
  };

  // Handle Manual Register Submit
  const handleManualRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!regName.trim()) {
      setErrorMessage(lang === 'BN' ? 'অনুগ্রহ করে আপনার নাম লিখুন।' : 'Please enter your full name.');
      return;
    }
    if (!regIdentifier.trim()) {
      setErrorMessage(lang === 'BN' ? 'ইমেইল বা মোবাইল নম্বর প্রদান করুন।' : 'Please enter your phone or email.');
      return;
    }
    const isPhone = isValidBangladeshiPhone(regIdentifier);
    const isEmail = isValidEmail(regIdentifier);
    if (!isPhone && !isEmail) {
      setErrorMessage(lang === 'BN' ? 'সঠিক ১১ ডিজিটের মোবাইল নম্বর (উদা: 017XXXXXXXX) বা বৈধ ইমেইল দিন।' : 'Please enter a valid 11-digit mobile number or email address.');
      return;
    }
    if (regPassword && regPassword.length < 6) {
      setErrorMessage(lang === 'BN' ? 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' : 'Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      registerManual({
        name: regName,
        emailOrPhone: regIdentifier,
        password: regPassword,
        role: selectedRole,
        nidNumber: regNid
      });
      switchRole(selectedRole);
      setIsLoading(false);
      setSuccessMessage(lang === 'BN' ? 'অ্যাকাউন্ট তৈরি সফল হয়েছে! ৳২০০ বোনাস যোগ হয়েছে।' : 'Account created! ৳200 bonus added.');

      setTimeout(() => {
        onClose();
        router.push('/dashboard');
      }, 600);
    }, 700);
  };

  // Handle Google Login Flow
  const handleGoogleSelect = (userEmail: string, userName: string) => {
    setIsLoading(true);
    setShowGooglePicker(false);
    
    setTimeout(() => {
      loginWithGoogle({
        name: userName,
        email: userEmail,
        role: selectedRole
      });
      switchRole(selectedRole);
      setIsLoading(false);
      setSuccessMessage(lang === 'BN' ? `Google দিয়ে লগইন সফল (${userEmail})!` : `Google login successful (${userEmail})!`);

      setTimeout(() => {
        onClose();
        router.push('/dashboard');
      }, 500);
    }, 600);
  };

  // Quick Autofill for Demo Testing
  const fillDemo = (type: 'tanvir' | 'kamrul') => {
    if (type === 'tanvir') {
      setLoginIdentifier('01712-345678');
      setLoginPassword('password123');
      setSelectedRole('sender');
    } else {
      setLoginIdentifier('kamrul.hasan@gmail.com');
      setLoginPassword('password123');
      setSelectedRole('commuter');
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative border border-slate-100 animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header decoration bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 shrink-0" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition z-10 cursor-pointer"
          title="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8 overflow-y-auto">
          
          {/* Logo & Headline */}
          <div className="flex flex-col items-center text-center mb-5">
            <div className="mb-2.5">
              <Logo3DMark size={50} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {mode === 'login' 
                ? (lang === 'BN' ? 'উসুল মামায় লগইন করুন' : 'Sign in to Ushol Mama')
                : (lang === 'BN' ? 'নতুন অ্যাকাউন্ট খুলুন' : 'Join Ushol Mama')
              }
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              {lang === 'BN' 
                ? 'মেট্রোরেলে পার্সেল পাঠানো ও বহনের ১ম ক্রাউড-শিপিং নেটওয়ার্ক' 
                : "Dhaka's 1st Metro Commuter Crowd-Shipping Network"}
            </p>
          </div>

          {/* Role Choice */}
          <div className="mb-4 p-1 bg-slate-100 rounded-2xl flex items-center">
            <button
              type="button"
              onClick={() => setSelectedRole('sender')}
              className={`w-1/2 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                selectedRole === 'sender'
                  ? 'bg-white text-emerald-800 shadow-sm shadow-slate-200 font-black'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>📦</span>
              <span>{lang === 'BN' ? 'আমি পার্সেল পাঠাব' : 'I am a Sender'}</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('commuter')}
              className={`w-1/2 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                selectedRole === 'commuter'
                  ? 'bg-white text-emerald-800 shadow-sm shadow-slate-200 font-black'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>🎒</span>
              <span>{lang === 'BN' ? 'আমি যাত্রী / আয় করব' : 'I am a Commuter'}</span>
            </button>
          </div>

          {/* Mode Switch Tabs: Login vs Sign Up */}
          <div className="flex border-b border-slate-200 mb-5 text-xs font-bold">
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMessage(''); }}
              className={`pb-2.5 px-4 font-black transition relative cursor-pointer ${
                mode === 'login'
                  ? 'text-emerald-700 border-b-2 border-emerald-600'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              {lang === 'BN' ? 'লগইন (Sign In)' : 'Sign In'}
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setErrorMessage(''); }}
              className={`pb-2.5 px-4 font-black transition relative cursor-pointer ${
                mode === 'signup'
                  ? 'text-emerald-700 border-b-2 border-emerald-600'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              {lang === 'BN' ? 'নতুন অ্যাকাউন্ট (Register)' : 'New Account'}
            </button>
          </div>

          {/* Error & Success Messages */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center space-x-2 animate-in fade-in">
              <Check className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* 1. Continue with Google Button */}
          <div className="space-y-3 mb-4">
            <button
              type="button"
              onClick={() => setShowGooglePicker(true)}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 border border-slate-200 hover:border-slate-300 rounded-xl hover:bg-slate-50 transition shadow-sm bg-white cursor-pointer group disabled:opacity-60"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-slate-800 font-bold text-xs tracking-tight group-hover:text-slate-900">
                {lang === 'BN' ? 'Google অ্যাকাউন্ট দিয়ে এগিয়ে যান' : 'Continue with Google'}
              </span>
            </button>

            {/* Google Interactive Account Picker Dropdown / Overlay */}
            {showGooglePicker && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl animate-in fade-in slide-in-from-top-2 space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-200 text-[11px] text-slate-500 font-bold">
                  <span>{lang === 'BN' ? 'Google অ্যাকাউন্ট নির্বাচন করুন' : 'Select a Google Account'}</span>
                  <button 
                    onClick={() => setShowGooglePicker(false)}
                    className="text-slate-400 hover:text-slate-600 text-xs"
                  >
                    ✕
                  </button>
                </div>

                {/* Account 1 */}
                <button
                  type="button"
                  onClick={() => handleGoogleSelect('tanvir.commuter@gmail.com', 'তানভীর আহমেদ')}
                  className="w-full flex items-center space-x-3 p-2 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200/80 transition text-left cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    ত
                  </div>
                  <div className="overflow-hidden flex-1">
                    <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">তানভীর আহমেদ</p>
                    <p className="text-[10px] text-slate-500 truncate">tanvir.commuter@gmail.com</p>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-black">NID ✓</span>
                </button>

                {/* Account 2 */}
                <button
                  type="button"
                  onClick={() => handleGoogleSelect('kamrul.hasan@gmail.com', 'কামরুল হাসান')}
                  className="w-full flex items-center space-x-3 p-2 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200/80 transition text-left cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    ক
                  </div>
                  <div className="overflow-hidden flex-1">
                    <p className="text-xs font-bold text-slate-900 group-hover:text-teal-700">কামরুল হাসান (মেট্রো যাত্রী)</p>
                    <p className="text-[10px] text-slate-500 truncate">kamrul.hasan@gmail.com</p>
                  </div>
                  <span className="text-[10px] text-teal-600 font-black">5.0★</span>
                </button>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
              {lang === 'BN' ? 'অথবা ম্যানুয়াল লগইন' : 'or manual login'}
            </span>
            <div className="border-t border-slate-200 w-full" />
          </div>

          {/* 2. Manual Login Form */}
          {mode === 'login' ? (
            <form onSubmit={handleManualLogin} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                  {lang === 'BN' ? 'ইমেইল বা মোবাইল নম্বর' : 'Email or Mobile Number'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="01712-345678 বা email@gmail.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                    {lang === 'BN' ? 'পাসওয়ার্ড' : 'Password'}
                  </label>
                  <a 
                    href="#forgot" 
                    onClick={(e) => { e.preventDefault(); alert(lang === 'BN' ? 'ডেমো অ্যাকাউন্ট পাসওয়ার্ড: password123' : 'Demo Password: password123'); }}
                    className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
                  >
                    {lang === 'BN' ? 'পাসওয়ার্ড ভুলে গেছেন?' : 'Forgot password?'}
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="পাসওয়ার্ড লিখুন"
                    className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me & Demo quick fills */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                  />
                  <span className="text-[11px] font-semibold text-slate-600">
                    {lang === 'BN' ? 'মনে রাখুন' : 'Remember me'}
                  </span>
                </label>

                {/* Quick Autofill Pills */}
                <div className="flex items-center space-x-1.5">
                  <button
                    type="button"
                    onClick={() => fillDemo('tanvir')}
                    className="text-[10px] px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold transition border border-emerald-200/60"
                    title="Autofill Sender Tanvir"
                  >
                    ⚡ তানভীর (প্রেরক)
                  </button>
                  <button
                    type="button"
                    onClick={() => fillDemo('kamrul')}
                    className="text-[10px] px-2 py-0.5 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 font-bold transition border border-teal-200/60"
                    title="Autofill Commuter Kamrul"
                  >
                    🎒 কামরুল (যাত্রী)
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/25 transition active:scale-[0.98] cursor-pointer disabled:opacity-70 mt-2"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{lang === 'BN' ? 'লগইন সম্পন্ন করুন' : 'Log In Now'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* 3. Manual Sign Up Form */
            <form onSubmit={handleManualRegister} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                  {lang === 'BN' ? 'আপনার পূর্ণ নাম' : 'Full Name'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="উদা: আসিফ ইকবাল"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                  {lang === 'BN' ? 'মোবাইল নম্বর বা ইমেইল' : 'Mobile Number or Email'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={regIdentifier}
                    onChange={(e) => setRegIdentifier(e.target.value)}
                    placeholder="01XXXXXXXXX বা user@domain.com"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                  {lang === 'BN' ? 'পাসওয়ার্ড তৈরি করুন' : 'Create Password'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="কমপক্ষে ৬টি অক্ষর"
                    className="w-full pl-9 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                    {lang === 'BN' ? 'NID নম্বর (ঐচ্ছিক)' : 'NID Number (Optional)'}
                  </label>
                  <span className="text-[10px] text-emerald-600 font-bold">Porichoy API</span>
                </div>
                <input
                  type="text"
                  value={regNid}
                  onChange={(e) => setRegNid(e.target.value)}
                  placeholder="১০ বা ১৭ ডিজিটের জাতীয় পরিচয়পত্র নম্বর"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                />
              </div>

              {/* Bonus alert */}
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-[11px] text-emerald-800 font-bold flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lang === 'BN' ? 'রেজিস্ট্রেশনে পাচ্ছেন ৳২০০ ফ্রি এসক্রো ওয়ালেট ব্যালেন্স!' : 'Get ৳200 Free Escrow Wallet balance on signup!'}</span>
              </div>

              {/* Submit Register */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/25 transition active:scale-[0.98] cursor-pointer disabled:opacity-70 mt-2"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{lang === 'BN' ? 'অ্যাকাউন্ট তৈরি করুন' : 'Create Free Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Security & Compliance Footer */}
          <div className="mt-5 flex items-center justify-center space-x-2 text-[11px] text-emerald-800 bg-emerald-50/70 py-2 rounded-xl border border-emerald-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-bold">
              {lang === 'BN' ? '১০০% ব্যাংক-গ্রেড এসক্রো ও NID সিকিউরিটি' : '100% Escrow & Porichoy NID Verified'}
            </span>
          </div>

          <p className="mt-4 text-center text-[10px] text-slate-400 leading-tight">
            {lang === 'BN' ? 'চালিয়ে যাওয়ার মাধ্যমে আপনি প্ল্যাটফর্মের ' : 'By continuing, you agree to Ushol Mama '}
            <span className="text-emerald-600 font-bold underline cursor-pointer">
              {lang === 'BN' ? 'শর্তাবলী' : 'Terms'}
            </span>
            {lang === 'BN' ? ' ও ' : ' & '}
            <span className="text-emerald-600 font-bold underline cursor-pointer">
              {lang === 'BN' ? 'নিরাপত্তা নীতিমালা' : 'Safety Rules'}
            </span>
            {lang === 'BN' ? ' মেনে নিচ্ছেন।' : '.'}
          </p>
        </div>
      </div>
    </div>
  );
}
