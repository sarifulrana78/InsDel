"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  MapPin, 
  Mail, 
  Phone, 
  ExternalLink, 
  FileText, 
  Building2, 
  Sparkles, 
  ArrowUp, 
  Copy, 
  Check, 
  X, 
  HelpCircle, 
  Send, 
  Smartphone, 
  Scale, 
  FileCheck2, 
  UserCheck, 
  Lock, 
  AlertTriangle,
  Info,
  Clock,
  Navigation,
  MessageCircle,
  CheckCircle2,
  Globe
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
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPorichoyOpen, setIsPorichoyOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);

  // Copy email feedback state
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Contact modal form state
  const [contactForm, setContactForm] = useState({
    name: '',
    emailOrPhone: '',
    topic: 'general',
    message: ''
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('support@usholmama.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.emailOrPhone || !contactForm.message) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: '', emailOrPhone: '', topic: 'general', message: '' });
      setIsContactOpen(false);
    }, 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionScroll = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    // If on homepage, smooth scroll to hash
    if (window.location.pathname === '/') {
      e.preventDefault();
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Flash/highlight target briefly
        el.classList.add('ring-2', 'ring-emerald-500', 'ring-offset-4');
        setTimeout(() => {
          el.classList.remove('ring-2', 'ring-emerald-500', 'ring-offset-4');
        }, 1500);
      }
    }
  };

  return (
    <>
      <footer className="bg-white border-t border-slate-200 pt-16 pb-12 relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
            
            {/* Column 1: Brand & Mission */}
            <div className="space-y-5">
              <Link 
                href="/" 
                onClick={scrollToTop} 
                className="inline-flex items-center space-x-3 group cursor-pointer focus:outline-none"
                title={language === 'BN' ? 'হোমে ফিরে যান' : 'Go to Homepage'}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center font-black text-white text-xl shadow-md shadow-emerald-500/20 group-hover:scale-105 group-hover:shadow-emerald-500/40 transition-all duration-300">
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

              {/* Status Badge */}
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>
                  {language === 'BN' ? 'মেট্রোরেল নেটওয়ার্ক লাইভ • ৯৯.৯% সক্রিয়' : 'Dhaka Metro Live • 99.9% Operational'}
                </span>
              </div>
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

            {/* Column 4: Contact & Support */}
            <div>
              <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-5 flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>{language === 'BN' ? 'যোগাযোগ' : 'Contact'}</span>
              </h5>
              <ul className="space-y-3.5 text-sm text-slate-600">
                {/* Office Location */}
                <li>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="flex items-start space-x-2 text-left hover:text-emerald-600 transition group cursor-pointer"
                    title={language === 'BN' ? 'ম্যাপ ও ঠিকানা দেখুন' : 'View office address and map'}
                  >
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-slate-700 group-hover:text-emerald-600">
                      {language === 'BN' ? 'লেভেল ৪, আইটি পার্ক, কারওয়ান বাজার' : 'Level 4, IT Park, Karwan Bazar'}
                    </span>
                  </button>
                </li>

                {/* Email with mailto and instant copy button */}
                <li className="flex items-center justify-between group">
                  <a 
                    href="mailto:support@usholmama.com"
                    className="flex items-center space-x-2 text-slate-700 hover:text-emerald-600 transition font-medium"
                    title="Send email"
                  >
                    <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>support@usholmama.com</span>
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 text-slate-400 hover:text-emerald-600 rounded hover:bg-slate-100 transition"
                    title={copiedEmail ? (language === 'BN' ? 'কপি হয়েছে!' : 'Copied!') : (language === 'BN' ? 'ইমেইল কপি করুন' : 'Copy Email')}
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </li>

                {/* Phone */}
                <li>
                  <a 
                    href="tel:+8809612000000"
                    className="flex items-center space-x-2 text-slate-700 hover:text-emerald-600 transition font-medium"
                    title="Click to call hotline"
                  >
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>+880 9612-000000</span>
                  </a>
                </li>

                {/* Direct Message CTA */}
                <li className="pt-1">
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="w-full py-2 px-3 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-300 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{language === 'BN' ? 'বার্তা পাঠান / সেফটি ডেস্ক' : 'Message Support Desk'}</span>
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Verified Badges */}
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                © 2026 Ushol Mama Logistics Network. All rights reserved.
              </p>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="text-xs text-slate-400 font-medium">
                {language === 'BN' ? 'ঢাকা মেট্রো ও লোকাল কমিউটার সিকিউরড' : 'Dhaka Metro & Commuter Network'}
              </span>
            </div>

            {/* Interactive Security & Verification Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {/* Porichoy Verified Badge */}
              <button 
                onClick={() => setIsPorichoyOpen(true)}
                className="inline-flex items-center space-x-1.5 text-xs font-bold px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-700 border border-emerald-200/80 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                title={language === 'BN' ? 'পরিচয় এনআইডি ভেরিফিকেশন তথ্য দেখুন' : 'View Porichoy Govt Verification info'}
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Porichoy Verified</span>
              </button>

              {/* Secured with Better Auth Badge */}
              <button 
                onClick={() => setIsSecurityOpen(true)}
                className="inline-flex items-center space-x-1.5 text-xs font-bold px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                title={language === 'BN' ? 'নিরাপত্তা ও এনক্রিপশন প্রোটোকল দেখুন' : 'View Security & Encryption protocols'}
              >
                <Lock className="w-3.5 h-3.5 text-slate-600" />
                <span>Secured with Better Auth</span>
              </button>

              {/* Back to top button */}
              <button
                onClick={scrollToTop}
                className="p-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-500 hover:text-emerald-700 rounded-full border border-slate-200 hover:border-emerald-300 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                title={language === 'BN' ? 'উপরে যান' : 'Back to top'}
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </footer>

      {/* ========================================================
          1. ABOUT US MODAL
      ======================================================== */}
      {isAboutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
            
            {/* Modal Header */}
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

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 text-slate-600 text-sm leading-relaxed">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-emerald-950 font-medium">
                {language === 'BN' 
                  ? 'উসুল মামা হলো এমন এক উদ্ভাবনী প্ল্যাটফর্ম, যা ঢাকার প্রতিদিনের লাখ লাখ যাত্রী (মেট্রোরেল, বাস ও লোকাল রুট) এবং জরুরি ছোট পার্সেল প্রেরকদের মধ্যে সরাসরি সংযোগ তৈরি করে।' 
                  : 'Ushol Mama is a game-changing crowdsourced logistics platform connecting daily Dhaka commuters (Metro Rail, bus routes) with senders requiring instant, hyper-local parcel deliveries.'}
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  {language === 'BN' ? 'আমাদের লক্ষ্য ও ভিশন' : 'Our Mission & Vision'}
                </h4>
                <p>
                  {language === 'BN'
                    ? 'ঢাকার দীর্ঘ ট্রাফিক জ্যাম কুরিয়ার সার্ভিসের গতি থামিয়ে দেয় এবং রাইড শেয়ারিংয়ের খরচ সাধারণ মানুষের নাগালের বাইরে নিয়ে যায়। আমরা বিশ্বাস করি, প্রতিদিন যে শত শত মানুষ অফিস বা বিশ্ববিদ্যালয়ে যাতায়াত করছেন, তাদের ব্যাগের ফাঁকা জায়গা ব্যবহার করেই শহরের সবচেয়ে দ্রুততম ডেলিভারি সম্পন্ন করা সম্ভব।'
                    : 'Dhaka traffic gridlocks traditional couriers and inflates express bike rates. We leverage the spare backpack space of verified daily commuters to deliver bag-sized parcels across town in under 60 minutes while reducing city traffic.'}
                </p>
              </div>

              {/* 4 Core Pillars */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-2xl font-black text-emerald-600 block mb-0.5">৪৫ মিনিট</span>
                  <span className="text-xs font-bold text-slate-700 block">
                    {language === 'BN' ? 'গড় মেট্রো ডেলিভারি' : 'Avg Metro Delivery'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {language === 'BN' ? 'উত্তরা থেকে মতিঝিল' : 'Uttara to Motijheel'}
                  </span>
                </div>
                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-2xl font-black text-emerald-600 block mb-0.5">১০০% NID</span>
                  <span className="text-xs font-bold text-slate-700 block">
                    {language === 'BN' ? 'পরিচয় ভেরিফাইড' : 'Porichoy Verified'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {language === 'BN' ? 'সরকারি ডাটাবেজ লিংকড' : 'Govt Database Linked'}
                  </span>
                </div>
                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-2xl font-black text-emerald-600 block mb-0.5">৳ ৩,০০০</span>
                  <span className="text-xs font-bold text-slate-700 block">
                    {language === 'BN' ? 'ট্রানজিট গ্যারান্টি' : 'Transit Guarantee'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {language === 'BN' ? 'সুরক্ষা তহবিল সুরক্ষা' : 'Dispute Compensation'}
                  </span>
                </div>
                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-2xl font-black text-emerald-600 block mb-0.5">০ গ্রাম</span>
                  <span className="text-xs font-bold text-slate-700 block">
                    {language === 'BN' ? 'অতিরিক্ত কার্বন' : 'Added Carbon'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {language === 'BN' ? 'পরিবেশবান্ধব পরিবহন' : '100% Green Shipping'}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">
                  {language === 'BN' ? 'কীভাবে এটি সবার উপকার করে?' : 'How Everyone Wins'}
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 list-disc pl-5">
                  <li>
                    <strong>{language === 'BN' ? 'যাত্রী (Commuter):' : 'Commuter:'}</strong> {language === 'BN' ? 'যাওয়ার পথে কেবল একটি ছোট পার্সেল নিয়ে নিজের দৈনিক যাতায়াত খরচ (ভাড়া) সম্পূর্ণ উসুল করতে পারেন।' : 'Offsets their daily metro or bus ticket fare just by carrying a small parcel.'}
                  </li>
                  <li>
                    <strong>{language === 'BN' ? 'প্রেরক (Sender):' : 'Sender:'}</strong> {language === 'BN' ? 'জরুরি চাবি, ল্যাপটপ চার্জার বা এফ-কমার্স পার্সেল কুরিয়ারের চেয়ে ৫ গুণ দ্রুত ও অর্ধেক খরচে ডেলিভারি পায়।' : 'Gets urgent documents, chargers, or e-commerce products delivered 5x faster at half the cost.'}
                  </li>
                  <li>
                    <strong>{language === 'BN' ? 'ঢাকা শহর (City of Dhaka):' : 'Dhaka City:'}</strong> {language === 'BN' ? 'রাস্তায় কোনো বাড়তি ডেলিভারি বাইক নামছে না, যানজট ও দূষণ কমছে।' : 'Zero additional delivery motorbikes deployed, mitigating traffic and vehicle exhaust.'}
                  </li>
                </ul>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/find-parcels"
                onClick={() => setIsAboutOpen(false)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition shadow-md shadow-emerald-500/20"
              >
                {language === 'BN' ? 'পার্সেল এক্সপ্লোর করুন' : 'Explore Parcels'}
              </Link>
              <button 
                onClick={() => setIsAboutOpen(false)}
                className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-100 transition"
              >
                {language === 'BN' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          2. TERMS OF SERVICE MODAL
      ======================================================== */}
      {isTermsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
                  <Scale className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    {language === 'BN' ? 'ব্যবহারের শর্তাবলী ও আইনি নীতিমালা' : 'Terms of Service & Legal Policy'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {language === 'BN' ? 'ডিজিটাল কমার্স ও পিটুপি লজিস্টিকস গাইডলাইন ২০২৬' : 'P2P Facilitation & Digital Commerce Policy 2026'}
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

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6 text-slate-600 text-xs sm:text-sm leading-relaxed">
              
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-xs">
                <strong>{language === 'BN' ? 'সংক্ষিপ্ত আইনি সতর্কতা:' : 'Quick Legal Summary:'}</strong>{' '}
                {language === 'BN' 
                  ? 'উসুল মামা কোনো প্রথাগত পরিবহন বা কুরিয়ার কোম্পানি নয়। এটি সাধারণ নিত্যযাত্রী ও প্রেরকের মধ্যে স্বেচ্ছামূলক সংযোগকারী একটি পিয়ার-টু-পিয়ার (P2P) প্রযুক্তি প্ল্যাটফর্ম।' 
                  : 'Ushol Mama is not a conventional common carrier or postal operator. We operate as an intermediary technology platform facilitating peer-to-peer (P2P) transit agreements between commuters and senders.'}
              </div>

              {/* Clause 1 */}
              <div className="space-y-1.5 border-b border-slate-100 pb-4">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black flex items-center justify-center">১</span>
                  {language === 'BN' ? 'প্ল্যাটফর্মের ভূমিকা ও দায়মুক্তি (P2P Facilitation Immunity)' : 'Intermediary Role & Platform Immunity'}
                </h4>
                <p className="text-slate-600 pl-7 text-xs">
                  {language === 'BN'
                    ? 'উসুল মামা শুধুমাত্র যাচাইকৃত প্ল্যাটফর্ম ব্যবহারকারীদের মধ্যে পার্সেল হস্তান্তরের সুযোগ সৃষ্টি করে। ব্যবহারকারীগণ নিজ দায়িত্বে স্বচ্ছ প্যাকেজিংয়ের মাধ্যমে পার্সেল গ্রহণ বা প্রদান করেন। আইনবিরুদ্ধ কোনো কাজ সংঘটিত হলে দায়ী পক্ষের বিরুদ্ধে বাংলাদেশ প্রচলিত আইনের অধীন কঠোর ব্যবস্থা গ্রহণ করা হবে।'
                    : 'The platform facilitates digital connections, verification, and payment escrow. Ushol Mama holds intermediary statutory immunity. Users assume peer responsibility for bona-fide inspection prior to transit.'}
                </p>
              </div>

              {/* Clause 2 */}
              <div className="space-y-1.5 border-b border-slate-100 pb-4">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black flex items-center justify-center">২</span>
                  {language === 'BN' ? 'বাধ্যতামূলক খোলা বা স্বচ্ছ ইনস্পেকশন নীতি (Mandatory Open Inspection)' : 'Mandatory Open Inspection Policy'}
                </h4>
                <p className="text-slate-600 pl-7 text-xs">
                  {language === 'BN'
                    ? 'কোনো সিলগালা বা অস্বচ্ছ প্যাকেট বহন সম্পূর্ণ নিষিদ্ধ। পার্সেল গ্রহণের পূর্বে ভেতরে কী আছে তা স্বচক্ষে দেখে নিশ্চিত হওয়ার ও সন্দেহ হলে তা তাত্ক্ষণিকভাবে প্রত্যাখ্যান করার আইনি অধিকার ও দায়িত্ব যাত্রীর রয়েছে।'
                    : 'Sealed opaque parcels are strictly prohibited. Commuters possess both the statutory right and affirmative duty to physically inspect contents prior to accepting.'}
                </p>
              </div>

              {/* Clause 3 */}
              <div className="space-y-1.5 border-b border-slate-100 pb-4">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black flex items-center justify-center">৩</span>
                  {language === 'BN' ? 'এসক্রো পেমেন্ট ও ডেলিভারি ওটিপি (Escrow Payment & OTP)' : 'Escrow Protection & Dual OTP'}
                </h4>
                <p className="text-slate-600 pl-7 text-xs">
                  {language === 'BN'
                    ? 'প্রেরকের জমাকৃত অর্থ আমাদের সুরক্ষিত এসক্রো ভল্টে সংরক্ষিত থাকে। প্রাপক ব্যক্তি ৬-সংখ্যার ডেলিভারি ওটিপি যাত্রীকে প্রদান না করা পর্যন্ত অর্থ ছাড় হবে না।'
                    : 'Sender funds are locked in an automated escrow vault. Payout is released to the commuter wallet only when the recipient provides the verified delivery OTP.'}
                </p>
              </div>

              {/* Clause 4 */}
              <div className="space-y-1.5 border-b border-slate-100 pb-4">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black flex items-center justify-center">৪</span>
                  {language === 'BN' ? '৳৩,০০০ পর্যন্ত পার্সেল সুরক্ষা গ্যারান্টি (Valuation Cap)' : 'Up to ৳3,000 Transit Valuation Cap'}
                </h4>
                <p className="text-slate-600 pl-7 text-xs">
                  {language === 'BN'
                    ? 'উসুল মামায় ৩,০০০ টাকার বেশি মূল্যের কোনো পণ্য বহন করার অনুমতি নেই। ভেরিফাইড ডেলিভারি চলাকালে কোনো অনাকাঙ্ক্ষিত ক্ষতি বা পার্সেল হারানোর ক্ষেত্রে আমাদের সুরক্ষা তহবিল থেকে সর্বোচ্চ ৩,০০০ টাকা পর্যন্ত ক্ষতিপূরণ বিবেচনা করা হয়।'
                    : 'Items exceeding ৳3,000 in declared value are not permitted. In the rare event of transit dispute or damage, platform emergency insurance covers up to ৳3,000 max.'}
                </p>
              </div>

              {/* Clause 5 */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black flex items-center justify-center">৫</span>
                  {language === 'BN' ? 'নিষিদ্ধ মালামাল ও ফৌজদারি জবাবদিহি (Zero Contraband)' : 'Prohibited Items & Criminal Liability'}
                </h4>
                <p className="text-slate-600 pl-7 text-xs">
                  {language === 'BN'
                    ? 'মাদকদ্রব্য, অস্ত্র, জাল টাকা, রাসায়নিক বা কোনো চোরাই পণ্য প্রেরণের চেষ্টা করলে প্রেরকের এনআইডি ও ডিজিটাল ট্র্যাকিং ডাটা তাৎক্ষণিকভাবে বাংলাদেশ পুলিশ ও সাইবার নিরাপত্তা ইউনিটে হস্তান্তর করা হবে।'
                    : 'Any attempt to transport narcotics, weapons, unauthorized cash (৳500+), or contraband triggers instant transmission of sender KYC to the Bangladesh Police.'}
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                {language === 'BN' ? 'সর্বশেষ হালনাগাদ: জানুয়ারি ২০২৬' : 'Last updated: January 2026'}
              </span>
              <button 
                onClick={() => setIsTermsOpen(false)}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition shadow-md shadow-emerald-500/20"
              >
                {language === 'BN' ? 'আমি শর্তাবলীতে একমত' : 'I Agree & Understand'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          3. PRIVACY POLICY MODAL
      ======================================================== */}
      {isPrivacyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
            
            {/* Modal Header */}
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
                    {language === 'BN' ? 'আপনার ব্যক্তিগত তথ্যের ১০০% গোপনীয়তার প্রতিশ্রুতি' : '100% Commitment to Confidentiality & Data Rights'}
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

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-5 text-slate-600 text-xs sm:text-sm leading-relaxed">
              
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-900 text-xs">
                {language === 'BN'
                  ? 'উসুল মামা আপনার ব্যক্তিগত গোপনীয়তাকে সর্বোচ্চ গুরুত্ব দেয়। সরকারি পরিচয় (Porichoy) এপিআইয়ের মাধ্যমে আপনার পরিচয় যাচাইয়ের সময় কোনো সংবেদনশীল বায়োমেট্রিক ডাটা আমাদের সার্ভারে সংরক্ষণ করা হয় না।'
                  : 'Your privacy is protected. When verifying via the Government Porichoy API, zero raw biometric data is retained on our servers. Only verified tokens are used.'}
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">১. কী ধরনের ডাটা আমরা সংগ্রহ করি?</h4>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                  <li><strong>KYC তথ্য:</strong> জাতীয় পরিচয়পত্র (NID) নম্বর ও লাইভ সেলফি ম্যাচ রেকর্ড।</li>
                  <li><strong>যোগাযোগের তথ্য:</strong> মোবাইল নম্বর ও ইমেইল ঠিকানা।</li>
                  <li><strong>ট্রানজিট লগ:</strong> কেবল একটি সক্রিয় পার্সেল ডেলিভারি চলাকালে স্টেশন টু স্টেশন ট্র্যাকিং ডাটা। কোনো ব্যাকগ্রাউন্ড ট্র্যাকিং হয় না।</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">২. Better Auth এবং এনক্রিপশন</h4>
                <p className="text-xs text-slate-600">
                  {language === 'BN'
                    ? 'সকল পাসওয়ার্ড ও সেশন টোকেন আধুনিক Better Auth আর্কিটেকচার এবং AES-256 বিট এনক্রিপশনের মাধ্যমে সংরক্ষিত। ডাটাবেজে কোনো প্লেইনটেক্সট পাসওয়ার্ড থাকে না।'
                    : 'All credentials and sessions are secured via Better Auth tokenization with AES-256 bit encryption in transit and at rest.'}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">৩. তথ্য শেয়ারিংয়ের নীতিমালা</h4>
                <p className="text-xs text-slate-600">
                  {language === 'BN'
                    ? 'আমরা কোনো বাণিজ্যিক বিজ্ঞাপনদাতার কাছে তথ্য বিক্রি বা ভাড়া দিই না। শুধুমাত্র দেশের আইন ও বিচারিক নির্দেশের প্রেক্ষিতে অপরাধ দমনকারী সংস্থা ব্যতীত কারও কাছে কোনো তথ্য উন্মোচন করা হয় না।'
                    : 'We never sell or lease user data to third parties. Disclosure occurs only upon lawful warrant from Bangladesh law enforcement or judicial authorities.'}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">৪. একাউন্ট ও ডাটা ডিলিট করার অধিকার</h4>
                <p className="text-xs text-slate-600">
                  {language === 'BN'
                    ? 'যেকোনো ব্যবহারকারী চাইলে যেকোনো সময় আমাদের সেফটি ডেস্কে অনুরোধ জানিয়ে তার প্রোফাইল ও সংরক্ষিত ডাটা স্থায়ীভাবে মুছে ফেলার আবেদন করতে পারেন।'
                    : 'Users hold the right to request permanent purge of their profile and associated telemetry logs at any time via our privacy desk.'}
                </p>
              </div>

            </div>

            {/* Modal Footer */}
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

      {/* ========================================================
          4. CONTACT / OFFICE / MESSAGE MODAL
      ======================================================== */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    {language === 'BN' ? 'যোগাযোগ ও হেড অফিস' : 'Contact & Head Office'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {language === 'BN' ? '২৪/৭ সেফটি ডেস্ক ও কাস্টমার কেয়ার' : '24/7 Safety Desk & Support Center'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsContactOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Quick Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-3">
                
                {/* Office Card */}
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs uppercase tracking-wide">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>{language === 'BN' ? 'প্রধান কার্যালয়' : 'Headquarters'}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800 leading-snug">
                    {language === 'BN' ? 'লেভেল ৪, আইটি পার্ক, কারওয়ান বাজার, ঢাকা-১২১৫' : 'Level 4, IT Park, Karwan Bazar, Dhaka-1215'}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {language === 'BN' ? 'নিকটবর্তী মেট্রো: কারওয়ান বাজার স্টেশন (গেট ২)' : 'Nearest Metro: Karwan Bazar Station (Exit 2)'}
                  </p>
                  <a
                    href="https://maps.google.com/?q=Karwan+Bazar+Dhaka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline pt-1"
                  >
                    <span>{language === 'BN' ? 'গুগল ম্যাপে দেখুন' : 'View on Google Maps'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Hotlines Card */}
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs uppercase tracking-wide">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>{language === 'BN' ? 'হটলাইন ও সহায়তা' : 'Helpline & SOS'}</span>
                  </div>
                  <div className="space-y-1 text-xs text-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">{language === 'BN' ? 'সাপোর্ট:' : 'Support:'}</span>
                      <a href="tel:+8809612000000" className="font-bold text-slate-900 hover:text-emerald-600">+880 9612-000000</a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">{language === 'BN' ? 'জরুরি পুলিশ:' : 'Police SOS:'}</span>
                      <a href="tel:999" className="font-bold text-rose-600 hover:underline">৯৯৯ (999)</a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">{language === 'BN' ? 'ইমেইল:' : 'Email:'}</span>
                      <a href="mailto:support@usholmama.com" className="font-bold text-emerald-600">support@usholmama.com</a>
                    </div>
                  </div>
                  <div className="pt-1 text-[11px] text-slate-500">
                    {language === 'BN' ? 'সাপোর্ট সময়: প্রতিদিন সকাল ৮:০০ - রাত ১১:০০' : 'Support Hours: 8:00 AM - 11:00 PM Daily'}
                  </div>
                </div>

              </div>

              {/* Direct Message Form */}
              <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 space-y-4">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Send className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'BN' ? 'আমাদের সরাসরি বার্তা পাঠান' : 'Send us a Direct Message'}</span>
                </h4>

                {contactSubmitted ? (
                  <div className="p-4 bg-emerald-100/80 border border-emerald-200 rounded-xl text-center space-y-1 text-emerald-900">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <p className="font-bold text-sm">
                      {language === 'BN' ? 'ধন্যবাদ! আপনার বার্তাটি গৃহীত হয়েছে।' : 'Thank you! Your message has been received.'}
                    </p>
                    <p className="text-xs text-emerald-700">
                      {language === 'BN' ? 'আমাদের সেফটি ও সাপোর্ট টিম শীঘ্রই যোগাযোগ করবে।' : 'Our support & safety team will reach out promptly.'}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          {language === 'BN' ? 'আপনার নাম' : 'Your Name'}
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder={language === 'BN' ? 'উদা: সাকিব আহমেদ' : 'e.g. Shakib Ahmed'}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          {language === 'BN' ? 'ফোন বা ইমেইল' : 'Phone or Email'}
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.emailOrPhone}
                          onChange={(e) => setContactForm({ ...contactForm, emailOrPhone: e.target.value })}
                          placeholder="017XXXXXXXX / user@example.com"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        {language === 'BN' ? 'বিষয়' : 'Topic'}
                      </label>
                      <select
                        value={contactForm.topic}
                        onChange={(e) => setContactForm({ ...contactForm, topic: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-medium"
                      >
                        <option value="general">{language === 'BN' ? 'সাধারণ জিজ্ঞাসা' : 'General Inquiry'}</option>
                        <option value="parcel">{language === 'BN' ? 'পার্সেল বা ডেলিভারি সংক্রান্ত' : 'Parcel / Transit Support'}</option>
                        <option value="safety">{language === 'BN' ? 'নিরাপত্তা বা অভিযোগ' : 'Safety / Report Issue'}</option>
                        <option value="business">{language === 'BN' ? 'মার্চেন্ট বা এফ-কমার্স পার্টনারশিপ' : 'Merchant / F-Commerce Partnership'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        {language === 'BN' ? 'আপনার বার্তা' : 'Message'}
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder={language === 'BN' ? 'আপনার জিজ্ঞাসা বা মতামত লিখুন...' : 'Write your inquiry or feedback...'}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-medium resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition shadow-md shadow-emerald-500/20 flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{language === 'BN' ? 'বার্তা পাঠান' : 'Submit Message'}</span>
                    </button>
                  </form>
                )}

              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          5. PORICHOY VERIFICATION MODAL
      ======================================================== */}
      {isPorichoyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
            
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Porichoy Verified™
                  </h3>
                  <p className="text-xs text-emerald-600 font-bold">
                    {language === 'BN' ? 'বাংলাদেশ সরকারি নির্বাচন কমিশন ডাটাবেজ ইন্টিগ্রেটেড' : 'Govt Election Commission Database Integrated'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsPorichoyOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 space-y-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div className="p-4 bg-emerald-50 border border-emerald-200/80 rounded-2xl space-y-2">
                <div className="flex items-center space-x-2 text-emerald-800 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'BN' ? '১০০% এনআইডি ভেরিফিকেশন নিশ্চয়তা' : '100% NID Verification Guarantee'}</span>
                </div>
                <p className="text-xs text-emerald-900">
                  {language === 'BN'
                    ? 'উসুল মামা প্ল্যাটফর্মে কোনো বেনামী বা ভুয়া প্রোফাইল নেই। প্রতিটি প্রেরক ও যাত্রীর ১০ বা ১৭-সংখ্যার জাতীয় পরিচয়পত্র (NID) সরকারি পরিচয় (Porichoy) গেটওয়ের মাধ্যমে রিয়েল-টাইমে যাচাই করা হয়।'
                    : 'Zero anonymous profiles. Every commuter and sender undergoes real-time NID authentication via the Bangladesh National Porichoy Gateway.'}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">
                  {language === 'BN' ? 'ভেরিফিকেশন কীভাবে সম্পন্ন হয়?' : 'How Verification Operates'}
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-start space-x-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-black flex items-center justify-center shrink-0">1</span>
                    <div>
                      <strong className="text-slate-800 block">{language === 'BN' ? 'এনআইডি ইনপুট:' : 'NID Submission:'}</strong>
                      <span>{language === 'BN' ? 'ব্যবহারকারী তার স্মার্ট এনআইডি নম্বর এবং জন্ম তারিখ প্রদান করেন।' : 'Commuters enter their official 10 or 17-digit National ID and Date of Birth.'}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-start space-x-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-black flex items-center justify-center shrink-0">2</span>
                    <div>
                      <strong className="text-slate-800 block">{language === 'BN' ? 'লাইভ সেলফি ও ফেস ম্যাচ:' : 'Live Selfie & Face Match:'}</strong>
                      <span>{language === 'BN' ? 'লাইভ ক্যামেরার মাধ্যমে মুখের ছবি মিলিয়ে দেখা হয়।' : 'A live liveness test verifies real-time identity against Election Commission data.'}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-start space-x-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-black flex items-center justify-center shrink-0">3</span>
                    <div>
                      <strong className="text-slate-800 block">{language === 'BN' ? 'ডিজিটাল ট্রাস্ট সিল:' : 'Digital Trust Seal:'}</strong>
                      <span>{language === 'BN' ? 'ভেরিফিকেশন সফল হলে প্রোফাইলে গ্রিন টিক ও সেফটি ব্যাজ যুক্ত হয়।' : 'Upon validation, a cryptographic trust seal and verified commuter badge are granted.'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
              <button 
                onClick={() => setIsPorichoyOpen(false)}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition"
              >
                {language === 'BN' ? 'বুঝেছি' : 'Got it'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          6. BETTER AUTH & SECURITY SPECS MODAL
      ======================================================== */}
      {isSecurityOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
            
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
                  <Lock className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Better Auth & Escrow Vault™
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {language === 'BN' ? 'দ্বিমুখী ওটিপি এবং নিরাপদ ডিজিটাল এসক্রো সিস্টেম' : 'Dual OTP Handshake & Smart Escrow Vault Architecture'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsSecurityOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 space-y-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl space-y-2">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wide">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{language === 'BN' ? 'সুরক্ষিত আর্থিক ও ডাটা ফ্রেমওয়ার্ক' : 'Zero-Trust Security Framework'}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'BN'
                    ? 'উসুল মামার প্রতিটি লেনদেন স্বয়ংক্রিয় এসক্রো ভল্টে আবদ্ধ থাকে। প্রেরক বা প্রাপক কারোর অর্থ অপব্যবহার হওয়ার কোনো সুযোগ নেই।'
                    : 'Every transaction is protected in an automated escrow lock. Payments are only released upon physical dual-OTP handshake.'}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">
                  {language === 'BN' ? 'নিরাপত্তা ফিচারসমূহ' : 'Key Security Features'}
                </h4>
                
                <div className="grid gap-2.5 text-xs">
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <strong className="text-slate-800 block mb-0.5">🔒 Better Auth Tokenization:</strong>
                    <span className="text-slate-500">
                      {language === 'BN' ? 'স্টেটলেস ক্রিপ্টোগ্রাফিক সেশন টোকেন ও CSRF প্রিভেনশন আর্কিটেকচার।' : 'Stateless cryptographic token sessions with strict anti-CSRF cookies.'}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <strong className="text-slate-800 block mb-0.5">🤝 Dual-OTP Handshake:</strong>
                    <span className="text-slate-500">
                      {language === 'BN' ? 'পিকআপে ৪-সংখ্যার ওটিপি ও ড্রপঅফে প্রাপকের ৬-সংখ্যার ওটিপি ভেরিফিকেশন।' : '4-digit pickup code + 6-digit dropoff verification code.'}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <strong className="text-slate-800 block mb-0.5">🏦 100% Escrow Fund Release:</strong>
                    <span className="text-slate-500">
                      {language === 'BN' ? 'ডেলিভারি সফল হওয়া পর্যন্ত টাকা ব্যাংকিং গ্রেড এসক্রোতে লক থাকে।' : 'Funds reside in bank-grade escrow until final OTP signature.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
              <button 
                onClick={() => setIsSecurityOpen(false)}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition"
              >
                {language === 'BN' ? 'বুঝেছি' : 'Close'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          7. SAFETY DECLARATION & PROHIBITED ITEMS MODAL
      ======================================================== */}
      <SafetyDeclarationModal
        isOpen={isSafetyOpen}
        onClose={() => setIsSafetyOpen(false)}
        onAccept={() => {
          setIsSafetyOpen(false);
          alert(language === 'BN' ? 'ধন্যবাদ! আপনি প্ল্যাটফর্মের নিরাপত্তা ও আইনি ঘোষণাপত্রে সম্মতি দিয়েছেন।' : 'Thank you! You have agreed to the platform Safety Declaration & Legal Policy.');
        }}
        language={language}
      />
    </>
  );
}
