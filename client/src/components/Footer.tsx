"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Sparkles, 
  Scale, 
  Lock, 
  AlertTriangle,
  CheckCircle2,
  X,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import SafetyDeclarationModal from './SafetyDeclarationModal';

export default function Footer() {
  const { language } = useApp();

  // Modals state
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isSafetyOpen, setIsSafetyOpen] = useState(false);

  const handleSectionScroll = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      <footer className="bg-white border-t border-slate-200 pt-16 pb-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
            
            {/* Column 1: Brand & Mission */}
            <div className="space-y-5">
              <Link 
                href="/" 
                className="inline-flex items-center space-x-3 group cursor-pointer focus:outline-none"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center font-black text-white text-xl shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-all">
                  উ
                </div>
                <div>
                  <span className="text-xl font-black text-slate-900 group-hover:text-emerald-700 transition">
                    Ushol Mama
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 tracking-wider uppercase block">
                    {language === 'BN' ? 'কমিউটার ক্রাউড-শিপিং' : 'Commuter Logistics'}
                  </span>
                </div>
              </Link>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {language === 'BN' 
                  ? 'বাংলাদেশের প্রথম কমিউটার-ভিত্তিক ক্রাউড-শিপিং প্ল্যাটফর্ম। যাওয়ার পথে ছোট পার্সেল নিয়ে সহজে নিজের যাতায়াত খরচ উসুল করুন!' 
                  : "Bangladesh's first commuter-based crowd-shipping platform. Recover your fare on the way!"}
              </p>
            </div>

            {/* Column 2: Company */}
            <div>
              <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-5 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>{language === 'BN' ? 'কোম্পানি' : 'Company'}</span>
              </h5>
              <ul className="space-y-3.5 text-sm text-slate-600">
                <li>
                  <button 
                    onClick={() => setIsAboutOpen(true)}
                    className="hover:text-emerald-600 hover:translate-x-1 transition-all duration-200 inline-flex items-center space-x-1.5 cursor-pointer font-medium text-left"
                  >
                    <span>{language === 'BN' ? 'আমাদের সম্পর্কে' : 'About Us'}</span>
                  </button>
                </li>
                <li>
                  <a 
                    href="/#how-it-works" 
                    onClick={(e) => handleSectionScroll(e, '#how-it-works')}
                    className="hover:text-emerald-600 hover:translate-x-1 transition-all duration-200 inline-flex items-center space-x-1.5 cursor-pointer font-medium text-left"
                  >
                    <span>{language === 'BN' ? 'কীভাবে কাজ করে' : 'How it works'}</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="/#solutions" 
                    onClick={(e) => handleSectionScroll(e, '#solutions')}
                    className="hover:text-emerald-600 hover:translate-x-1 transition-all duration-200 inline-flex items-center space-x-1.5 cursor-pointer font-medium text-left"
                  >
                    <span>{language === 'BN' ? 'সমাধান' : 'Solutions'}</span>
                  </a>
                </li>
                <li>
                  <Link 
                    href="/find-parcels"
                    className="hover:text-emerald-600 hover:translate-x-1 transition-all duration-200 inline-flex items-center space-x-1.5 cursor-pointer font-medium text-left"
                  >
                    <span>{language === 'BN' ? 'পার্সেল তালিকা (লাইভ)' : 'Find Parcels (Live)'}</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal & Compliance */}
            <div>
              <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-5 flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-600" />
                <span>{language === 'BN' ? 'আইনি বিষয়াবলী' : 'Legal & Compliance'}</span>
              </h5>
              <ul className="space-y-3.5 text-sm text-slate-600">
                <li>
                  <button 
                    onClick={() => setIsTermsOpen(true)}
                    className="hover:text-emerald-600 hover:translate-x-1 transition-all duration-200 block text-left group cursor-pointer"
                  >
                    <span className="font-semibold text-slate-700 group-hover:text-emerald-600 transition">
                      {language === 'BN' ? 'টার্মস অ্যান্ড কন্ডিশনস' : 'Terms of Service'}
                    </span>
                    <span className="block text-[11px] text-slate-400 group-hover:text-slate-600 mt-1 leading-tight font-normal">
                      {language === 'BN' 
                        ? '* প্ল্যাটফর্ম দায়মুক্ত (P2P Facilitation)। ইনস্পেকশন রুলস প্রযোজ্য।' 
                        : '* Platform holds immunity under P2P facilitation. Inspection rules apply.'}
                    </span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setIsPrivacyOpen(true)}
                    className="hover:text-emerald-600 hover:translate-x-1 transition-all duration-200 inline-flex items-center space-x-1.5 cursor-pointer font-medium text-left"
                  >
                    <span>{language === 'BN' ? 'প্রাইভেসি পলিসি' : 'Privacy Policy'}</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setIsSafetyOpen(true)} 
                    className="inline-flex items-center space-x-1.5 text-rose-600 hover:text-rose-700 font-bold hover:translate-x-1 transition-all duration-200 cursor-pointer text-left group"
                  >
                    <AlertTriangle className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform shrink-0" />
                    <span>{language === 'BN' ? 'নিষিদ্ধ মালামাল ও আইনি শপথ' : 'Prohibited Items & Legal Declaration'}</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Preview */}
            <div>
              <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-5 flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>{language === 'BN' ? 'যোগাযোগ' : 'Contact'}</span>
              </h5>
              <ul className="space-y-3.5 text-sm text-slate-600">
                <li className="flex items-start space-x-2 text-slate-700">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{language === 'BN' ? 'লেভেল ৪, আইটি পার্ক, কারওয়ান বাজার' : 'Level 4, IT Park, Karwan Bazar'}</span>
                </li>
                <li className="flex items-center space-x-2 text-slate-700">
                  <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                  <a href="mailto:support@usholmama.com" className="hover:text-emerald-600 transition">support@usholmama.com</a>
                </li>
                <li className="flex items-center space-x-2 text-slate-700">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <a href="tel:+8809612000000" className="hover:text-emerald-600 transition">+880 9612-000000</a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar Preview */}
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              © 2026 Ushol Mama Logistics Network. All rights reserved.
            </p>
            <div className="flex space-x-3">
              <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">Porichoy Verified</span>
              <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">Secured with Better Auth</span>
            </div>
          </div>

        </div>
      </footer>

      {/* 1. ABOUT US MODAL */}
      {isAboutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
            <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-emerald-500/20">
                  উ
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    {language === 'BN' ? 'আমাদের সম্পর্কে (About Ushol Mama)' : 'About Ushol Mama'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {language === 'BN' ? 'ঢাকার প্রথম কমিউটার ক্রাউড-শিপিং বিপ্লব' : "Dhaka's 1st Commuter Crowd-Shipping Network"}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsAboutOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 sm:p-8 space-y-6 text-slate-600 text-sm leading-relaxed">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-emerald-950 font-medium">
                {language === 'BN' 
                  ? 'উসুল মামা হলো এমন এক প্ল্যাটফর্ম, যা ঢাকার প্রতিদিনের লাখ লাখ যাত্রী এবং জরুরি ছোট পার্সেল প্রেরকদের মধ্যে সরাসরি সংযোগ তৈরি করে।' 
                  : 'Ushol Mama is a crowdsourced logistics platform connecting daily Dhaka commuters with senders requiring instant, hyper-local parcel deliveries.'}
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  {language === 'BN' ? 'আমাদের লক্ষ্য ও ভিশন' : 'Our Mission & Vision'}
                </h4>
                <p>
                  {language === 'BN'
                    ? 'ঢাকার ট্রাফিক জ্যাম এড়িয়ে মেট্রোরেল ও লোকাল রুটের যাত্রীদের মাধ্যমে ১-২ ঘন্টার মধ্যে শহরের এক প্রান্ত থেকে অন্য প্রান্তে ডেলিভারি সম্পন্ন করাই আমাদের লক্ষ্য।'
                    : 'We leverage the spare backpack space of verified daily commuters to deliver parcels across town in under 60 minutes while reducing city traffic.'}
                </p>
              </div>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
              <button 
                onClick={() => setIsAboutOpen(false)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition"
              >
                {language === 'BN' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. TERMS OF SERVICE MODAL */}
      {isTermsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
            <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
                  <Scale className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    {language === 'BN' ? 'ব্যবহারের শর্তাবলী' : 'Terms of Service'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {language === 'BN' ? 'পিটুপি লজিস্টিকস গাইডলাইন ২০২৬' : 'P2P Facilitation Guidelines 2026'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsTermsOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 sm:p-8 space-y-4 text-slate-600 text-xs sm:text-sm leading-relaxed">
              <p>
                {language === 'BN'
                  ? 'উসুল মামা কোনো প্রথাগত পরিবহন বা কুরিয়ার কোম্পানি নয়। এটি যাত্রী ও প্রেরকের মধ্যে পিয়ার-টু-পিয়ার (P2P) সংযোগকারী একটি প্ল্যাটফর্ম।'
                  : 'Ushol Mama is an intermediary technology platform facilitating peer-to-peer (P2P) transit agreements between commuters and senders.'}
              </p>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <strong className="block text-slate-800 mb-1">
                  {language === 'BN' ? 'খোলা ইনস্পেকশন নীতি:' : 'Open Inspection Policy:'}
                </strong>
                <span>
                  {language === 'BN'
                    ? 'কোনো সিলগালা বা অস্বচ্ছ প্যাকেট বহন সম্পূর্ণ নিষিদ্ধ। পার্সেল গ্রহণের পূর্বে ভেতরে কী আছে তা স্বচক্ষে দেখে নিশ্চিত হওয়ার অধিকার যাত্রীর রয়েছে।'
                    : 'Sealed opaque parcels are strictly prohibited. Commuters possess the right to physically inspect contents prior to accepting.'}
                </span>
              </div>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
              <button 
                onClick={() => setIsTermsOpen(false)}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition"
              >
                {language === 'BN' ? 'বুঝেছি' : 'Understood'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. PRIVACY POLICY MODAL */}
      {isPrivacyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
            <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    {language === 'BN' ? 'প্রাইভেসি পলিসি ও ডাটা সুরক্ষা' : 'Privacy Policy & Data Security'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {language === 'BN' ? 'ব্যক্তিগত তথ্যের ১০০% গোপনীয়তার নিশ্চয়তা' : '100% Commitment to Confidentiality'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsPrivacyOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 sm:p-8 space-y-4 text-slate-600 text-xs sm:text-sm leading-relaxed">
              <p>
                {language === 'BN'
                  ? 'আমরা ব্যবহারকারীদের এনআইডি যাচাইয়ের ক্ষেত্রে সরাসরি সরকারি পরিচয় গেটওয়ে ব্যবহার করি এবং কোনো বায়োমেট্রিক ডাটা সংরক্ষণ করি না।'
                  : 'We authenticate users via the Government Porichoy API without storing sensitive biometric records.'}
              </p>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
              <button 
                onClick={() => setIsPrivacyOpen(false)}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition"
              >
                {language === 'BN' ? 'বুঝেছি' : 'Understood'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. SAFETY DECLARATION & PROHIBITED ITEMS MODAL */}
      <SafetyDeclarationModal
        isOpen={isSafetyOpen}
        onClose={() => setIsSafetyOpen(false)}
        language={language}
      />
    </>
  );
}
