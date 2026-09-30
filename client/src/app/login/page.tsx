"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Phone, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Check, 
  ArrowLeft,
  Train,
  Wallet
} from 'lucide-react';
import { useApp, DEMO_USERS } from '@/context/AppContext';
import { isValidBangladeshiPhone, isValidEmail } from '@/utils/authUtils';

export default function LoginPage() {
  const router = useRouter();
  const { 
    language, 
    user, 
    loginManual, 
    loginWithGoogle, 
    registerManual, 
    switchRole, 
    logout 
  } = useApp();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [selectedRole, setSelectedRole] = useState<'sender' | 'commuter'>(user.role || 'sender');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Form states
  const [loginIdentifier, setLoginIdentifier] = useState('01712-345678');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);

  // Sign up states
  const [regName, setRegName] = useState('');
  const [regIdentifier, setRegIdentifier] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regNid, setRegNid] = useState('');

  // Google interactive picker state
  const [showGooglePicker, setShowGooglePicker] = useState(false);

  // Handle Manual Login Submit
  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!loginIdentifier.trim()) {
      setErrorMessage(language === 'BN' ? 'অনুগ্রহ করে ইমেইল বা ফোন নম্বর দিন।' : 'Please enter your email or phone number.');
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
      setSuccessMessage(language === 'BN' ? 'সফলভাবে লগইন হয়েছে! ড্যাশবোর্ডে রিডাইরেক্ট করা হচ্ছে...' : 'Login successful! Redirecting to dashboard...');
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 600);
    }, 600);
  };

  // Handle Manual Register Submit
  const handleManualRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!regName.trim()) {
      setErrorMessage(language === 'BN' ? 'অনুগ্রহ করে আপনার নাম লিখুন।' : 'Please enter your full name.');
      return;
    }
    if (!regIdentifier.trim()) {
      setErrorMessage(language === 'BN' ? 'ইমেইল বা মোবাইল নম্বর প্রদান করুন।' : 'Please enter your phone or email.');
      return;
    }
    const isPhone = isValidBangladeshiPhone(regIdentifier);
    const isEmail = isValidEmail(regIdentifier);
    if (!isPhone && !isEmail) {
      setErrorMessage(language === 'BN' ? 'সঠিক ১১ ডিজিটের মোবাইল নম্বর (উদা: 017XXXXXXXX) বা বৈধ ইমেইল দিন।' : 'Please enter a valid 11-digit mobile number or email address.');
      return;
    }
    if (regPassword && regPassword.length < 6) {
      setErrorMessage(language === 'BN' ? 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' : 'Password must be at least 6 characters.');
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
      setSuccessMessage(language === 'BN' ? 'অ্যাকাউন্ট তৈরি সফল হয়েছে! ৳২০০ ওয়েলকাম বোনাস সক্রিয়।' : 'Account created! ৳200 welcome bonus active.');

      setTimeout(() => {
        router.push('/dashboard');
      }, 700);
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
      setSuccessMessage(language === 'BN' ? `Google দিয়ে লগইন সফল (${userEmail})!` : `Google login successful (${userEmail})!`);

      setTimeout(() => {
        router.push('/dashboard');
      }, 600);
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-emerald-50/20 to-slate-100 py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-5xl w-full">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-emerald-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'BN' ? 'হোমে ফিরে যান' : 'Back to Home'}</span>
          </Link>
        </div>

        {/* If user is already logged in, show active session banner */}
        {user.isLoggedIn ? (
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200/80 max-w-lg mx-auto text-center animate-in zoom-in-95">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center font-black text-white text-3xl shadow-xl mx-auto mb-4 shadow-emerald-500/25">
              {user.name.slice(0, 1)}
            </div>
            
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[11px] uppercase tracking-wider inline-block mb-2">
              {language === 'BN' ? 'বর্তমান সেশন সক্রিয়' : 'Active Session'}
            </span>

            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {user.name}
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-1">
              {user.email || user.phone} • {user.role === 'sender' ? (language === 'BN' ? 'প্রেরক' : 'Sender') : (language === 'BN' ? 'যাত্রী' : 'Commuter')}
            </p>

            <div className="grid grid-cols-2 gap-3 my-6 text-left">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">{language === 'BN' ? 'ওয়ালেট' : 'Wallet'}</span>
                <span className="text-base font-black text-emerald-700">৳{user.walletBalance}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">{language === 'BN' ? 'রেটিং' : 'Rating'}</span>
                <span className="text-base font-black text-slate-800">★ {user.rating} ({user.totalTrips})</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/25 transition cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>{language === 'BN' ? 'ড্যাশবোর্ডে প্রবেশ করুন' : 'Go to Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => logout()}
                className="w-full py-3 border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                {language === 'BN' ? 'লগআউট করে নতুন অ্যাকাউন্টে লগইন' : 'Log out & Sign in with another account'}
              </button>
            </div>
          </div>
        ) : (
          /* Main Split View: Left Showcase + Right Login Card */
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Side: Brand & Trust Showcase (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                {/* Brand Logo */}
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-black text-white text-2xl shadow-lg shadow-emerald-500/30 ring-2 ring-white/10">
                    উ
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tight leading-none text-white">
                      Ushol Mama
                    </h3>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mt-1 block">
                      {language === 'BN' ? 'ঢাকা মেট্রোরেল ক্রাউড-শিপিং' : 'Dhaka Metro Crowd-Shipping'}
                    </span>
                  </div>
                </div>

                {/* Metro Line 6 Live Pill */}
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[11px] mb-6 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span>MRT Line-6 Uttara ⇄ Motijheel</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-4">
                  {language === 'BN' ? (
                    <>প্রতিদিনের যাতায়াত খরচে <span className="text-emerald-400">উসুল মামা</span> আপনার বিশ্বস্ত সঙ্গী</>
                  ) : (
                    <>Recover your travel fare daily with <span className="text-emerald-400">Ushol Mama</span></>
                  )}
                </h1>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-8">
                  {language === 'BN' 
                    ? 'মেট্রোরেলে অফিস বা ক্যাম্পাসে যাওয়ার পথে ছোট পার্সেল বহন করে নিয়মিত আয় করুন, অথবা যেকোনো জরুরি পার্সেল মাত্র ৩০ মিনিটে পৌঁছে দিন।' 
                    : 'Carry small parcels on your Metro route to earn on every trip, or deliver urgent items across Dhaka in 30 minutes.'}
                </p>

                {/* Trust Points */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-xl bg-white/10 text-emerald-400 shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">
                        {language === 'BN' ? '১০০% ব্যাংক-গ্রেড এসক্রো সুরক্ষা' : '100% Escrow Protection'}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-normal">
                        {language === 'BN' ? 'পার্সেল সফলভাবে ডেলিভারি না হওয়া পর্যন্ত টাকা সম্পূর্ণ সুরক্ষিত।' : 'Funds released only after successful OTP delivery.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-xl bg-white/10 text-emerald-400 shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">
                        {language === 'BN' ? 'Porichoy API NID ভেরিফিকেশন' : 'Porichoy Government NID Verification'}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-normal">
                        {language === 'BN' ? 'প্রতিটি প্রেরক ও যাত্রী সরকার অনুমোদিত ডাটাবেজ দ্বারা যাচাইকৃত।' : 'Every member is verified with official national identity.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-xl bg-white/10 text-emerald-400 shrink-0">
                      <Train className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">
                        {language === 'BN' ? '১৬টি মেট্রোরেল স্টেশন নেটওয়ার্ক' : '16 Metro Station Network'}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-normal">
                        {language === 'BN' ? 'উত্তরা উত্তর থেকে মতিঝিল পর্যন্ত প্রতি স্টেশনে ইনস্ট্যান্ট পিকআপ।' : 'Instant handovers right inside metro concourses.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom stats chip */}
              <div className="pt-6 border-t border-slate-800/80 mt-8 flex items-center justify-between text-[11px] text-slate-400">
                <span>🛡️ Escrow Protected</span>
                <span>⚡ Instant Payout</span>
                <span>★ 4.95 Rating</span>
              </div>
            </div>

            {/* Right Side: Authentication Card (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white">
              
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  {mode === 'login' 
                    ? (language === 'BN' ? 'লগইন করুন' : 'Sign In to Your Account') 
                    : (language === 'BN' ? 'নতুন অ্যাকাউন্ট খুলুন' : 'Create Free Account')}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {language === 'BN' 
                    ? 'আপনার মোবাইল নম্বর বা Google অ্যাকাউন্ট দিয়ে সহজেই লগইন করুন।' 
                    : 'Sign in with your phone, email, or Google account.'}
                </p>
              </div>

              {/* Role Choice */}
              <div className="mb-5 p-1 bg-slate-100 rounded-2xl flex items-center">
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
                  <span>{language === 'BN' ? 'আমি পার্সেল পাঠাব' : 'I am a Sender'}</span>
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
                  <span>{language === 'BN' ? 'আমি যাত্রী / আয় করব' : 'I am a Commuter'}</span>
                </button>
              </div>

              {/* Tab Selector: Login vs Sign Up */}
              <div className="flex border-b border-slate-200 mb-6 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => { setMode('login'); setErrorMessage(''); }}
                  className={`pb-2.5 px-4 font-black transition relative cursor-pointer ${
                    mode === 'login'
                      ? 'text-emerald-700 border-b-2 border-emerald-600'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  {language === 'BN' ? 'লগইন (Sign In)' : 'Sign In'}
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
                  {language === 'BN' ? 'নতুন অ্যাকাউন্ট (Register)' : 'New Account'}
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
              <div className="space-y-3 mb-5">
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
                    {language === 'BN' ? 'Google অ্যাকাউন্ট দিয়ে এগিয়ে যান' : 'Continue with Google'}
                  </span>
                </button>

                {/* Google Interactive Account Picker Dropdown / Card */}
                {showGooglePicker && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl animate-in fade-in slide-in-from-top-2 space-y-2">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-200 text-[11px] text-slate-500 font-bold">
                      <span>{language === 'BN' ? 'Google অ্যাকাউন্ট নির্বাচন করুন' : 'Select a Google Account'}</span>
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
                  {language === 'BN' ? 'অথবা ইমেইল / মোবাইল দিয়ে' : 'or with email / mobile'}
                </span>
                <div className="border-t border-slate-200 w-full" />
              </div>

              {/* 2. Manual Login Form */}
              {mode === 'login' ? (
                <form onSubmit={handleManualLogin} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                      {language === 'BN' ? 'ইমেইল বা মোবাইল নম্বর' : 'Email or Mobile Number'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        placeholder="01712-345678 বা user@gmail.com"
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                        {language === 'BN' ? 'পাসওয়ার্ড' : 'Password'}
                      </label>
                      <a 
                        href="#forgot" 
                        onClick={(e) => { e.preventDefault(); alert(language === 'BN' ? 'ডেমো অ্যাকাউন্ট পাসওয়ার্ড: password123' : 'Demo Password: password123'); }}
                        className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
                      >
                        {language === 'BN' ? 'পাসওয়ার্ড ভুলে গেছেন?' : 'Forgot password?'}
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
                        {language === 'BN' ? 'মনে রাখুন' : 'Remember me'}
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
                        <span>{language === 'BN' ? 'লগইন সম্পন্ন করুন' : 'Log In Now'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* 3. Manual Sign Up Form */
                <form onSubmit={handleManualRegister} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                      {language === 'BN' ? 'আপনার পূর্ণ নাম' : 'Full Name'}
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
                      {language === 'BN' ? 'মোবাইল নম্বর বা ইমেইল' : 'Mobile Number or Email'}
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
                      {language === 'BN' ? 'পাসওয়ার্ড তৈরি করুন' : 'Create Password'}
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
                        {language === 'BN' ? 'NID নম্বর (ঐচ্ছিক)' : 'NID Number (Optional)'}
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
                    <span>{language === 'BN' ? 'রেজিস্ট্রেশনে পাচ্ছেন ৳২০০ ফ্রি এসক্রো ওয়ালেট ব্যালেন্স!' : 'Get ৳200 Free Escrow Wallet balance on signup!'}</span>
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
                        <span>{language === 'BN' ? 'অ্যাকাউন্ট তৈরি করুন' : 'Create Free Account'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Security & Compliance Footer */}
              <div className="mt-6 flex items-center justify-center space-x-2 text-[11px] text-emerald-800 bg-emerald-50/70 py-2 rounded-xl border border-emerald-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-bold">
                  {language === 'BN' ? '১০০% ব্যাংক-গ্রেড এসক্রো ও Porichoy NID সিকিউরিটি' : '100% Escrow & Porichoy NID Verified'}
                </span>
              </div>

              <p className="mt-4 text-center text-[10px] text-slate-400 leading-tight">
                {language === 'BN' ? 'লগইন করার মাধ্যমে আপনি উসুল মামার ' : 'By continuing, you agree to Ushol Mama '}
                <span className="text-emerald-600 font-bold underline cursor-pointer">
                  {language === 'BN' ? 'শর্তাবলী' : 'Terms'}
                </span>
                {language === 'BN' ? ' ও ' : ' & '}
                <span className="text-emerald-600 font-bold underline cursor-pointer">
                  {language === 'BN' ? 'নিরাপত্তা নীতিমালা' : 'Safety Rules'}
                </span>
                {language === 'BN' ? ' মেনে নিচ্ছেন।' : '.'}
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
