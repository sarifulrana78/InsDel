"use client";

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Timer,
  Leaf,
  Briefcase,
  GraduationCap,
  Coffee,
  Check,
  Package,
  Lock,
  Eye,
  Scale,
  UserCheck,
  PhoneCall,
  AlertTriangle,
  FileCheck2
} from 'lucide-react';
import { AuthModal } from '@/components/AuthModal';
import SafetyDeclarationModal from '@/components/SafetyDeclarationModal';
import { useApp } from '@/context/AppContext';

export default function App() {
  const { language, setLanguage, user, switchRole } = useApp();
  const userRole = user.role;
  const setUserRole = (r: 'sender' | 'commuter') => switchRole(r);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);

  // Estimator State
  const [pickupLocation, setPickupLocation] = useState('Uttara North (Metro)');
  const [dropoffLocation, setDropoffLocation] = useState('Farmgate (Metro)');
  const [estimatedFare, setEstimatedFare] = useState(70);

  const dhakaLocations = [
    // Metro Stations
    'Uttara North (Metro)', 'Uttara Center (Metro)', 'Uttara South (Metro)', 'Pallabi (Metro)', 
    'Mirpur 11 (Metro)', 'Mirpur 10 (Metro)', 'Kazipara (Metro)', 'Shewrapara (Metro)', 
    'Agargaon (Metro)', 'Bijoy Sarani (Metro)', 'Farmgate (Metro)', 'Karwan Bazar (Metro)', 
    'Shahbagh (Metro)', 'Dhaka University (Metro)', 'Secretariat (Metro)', 'Motijheel (Metro)',
    // Major Hubs & University/College Areas
    'Azimpur (Eden College)', 'Aftabnagar (East West Uni)', 'Badda', 'Banani', 
    'Bashundhara (NSU, IUB)', 'Dhanmondi (Dhaka College, ULAB)', 'Gabtoli', 'Gulshan', 
    'Jatrabari', 'Kuril (AIUB)', 'Madani Avenue (UIU)', 'Mohammadpur', 
    'Mohakhali (BRAC, Titumir)', 'New Market', 'Palashi (BUET)', 'Paltan', 
    'Puran Dhaka (Jagannath Uni)', 'Rampura', 'Savar (Jahangirnagar Uni)', 'Shyamoli', 'Uttara'
  ];

  const handleEstimate = (from: string, to: string) => {
    setPickupLocation(from);
    setDropoffLocation(to);
    const distanceFactor = Math.abs(from.length - to.length) + 2;
    setEstimatedFare(40 + distanceFactor * 10);
  };

  // Live Ticker Data
  const tickerItems = [
    language === 'BN' ? '✅ ডকুমেন্টস ডেলিভারি: উত্তরা ➔ ফার্মগেট (২৮ মিনিট)' : '✅ Documents Delivered: Uttara ➔ Farmgate (28 mins)',
    language === 'BN' ? '✅ চাবি ডেলিভারি: মিরপুর ১০ ➔ শাহবাগ (৩৫ মিনিট)' : '✅ Keys Delivered: Mirpur 10 ➔ Shahbagh (35 mins)',
    language === 'BN' ? '✅ টিফিন ডেলিভারি: ধানমন্ডি ➔ মতিঝিল (৪৫ মিনিট)' : '✅ Tiffin Delivered: Dhanmondi ➔ Motijheel (45 mins)',
    language === 'BN' ? '✅ ই-কমার্স পার্সেল: গুলশান ➔ বনানী (১৫ মিনিট)' : '✅ E-commerce Parcel: Gulshan ➔ Banani (15 mins)',
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Hero Section Begins */}

      {/* 2. HERO SECTION (Split Layout) */}
      <section className="relative bg-slate-50 pt-16 pb-24 overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-emerald-100/50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-amber-100/50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* Left: Copy */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              <Zap className="w-4 h-4" />
              <span>{language === 'BN' ? 'ঢাকার ১ম কমিউটার লজিস্টিকস' : "Dhaka's 1st Commuter Logistics"}</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]">
              {language === 'BN' ? 'যাওয়ার পথে' : 'Recover your fare'} <br />
              <span className="text-emerald-600">
                {language === 'BN' ? 'ভাড়া উসুল!' : 'on the way!'}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-lg">
              {language === 'BN' 
                ? 'মেট্রোরেল বা বাসে প্রতিদিন যাতায়াত করছেন? যাওয়ার পথে ছোট একটা পার্সেল সাথে নিয়ে এক ক্লিকেই নিজের যাতায়াত খরচ তুলুন। দ্রুত, নিরাপদ এবং সাশ্রয়ী।' 
                : 'Commuting daily by Metro or bus? Carry a small bag-sized parcel on your route and recover your travel costs with one click. Fast, secure, and affordable.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-base shadow-lg transition flex items-center justify-center space-x-2"
              >
                <span>{language === 'BN' ? 'পার্সেল পাঠান' : 'Send a Parcel'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-xl border-2 border-slate-200 bg-white hover:border-emerald-600 hover:text-emerald-600 text-slate-700 font-bold text-base transition flex items-center justify-center space-x-2"
              >
                <span>{language === 'BN' ? 'উসুল মামা (রাইডার) হন' : 'Drive for Ushol Mama'}</span>
              </button>
            </div>
          </div>

          {/* Right: Quick Quote Card (Roadie Style Estimator) */}
          <div className="bg-white rounded-3xl p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              {language === 'BN' ? 'ভাড়া ও আয় ক্যালকুলেটর' : 'Quick Quote Estimate'}
            </h3>
            <p className="text-sm text-slate-500 mb-8">
              {language === 'BN' ? 'ছোট পার্সেল পাঠানোর খরচ বা বহনের আয় জানুন।' : 'See how much it costs to send or how much you earn.'}
            </p>

            <div className="space-y-5">
              <div className="relative">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">{language === 'BN' ? 'পিকআপ (Pickup)' : 'Pickup Location'}</label>
                <div className="flex items-center border-2 border-slate-200 rounded-xl px-4 py-1 focus-within:border-emerald-500 transition bg-slate-50">
                  <MapPin className="w-5 h-5 text-slate-400 mr-2" />
                  <select 
                    value={pickupLocation}
                    onChange={(e) => handleEstimate(e.target.value, dropoffLocation)}
                    className="w-full bg-transparent py-3 text-sm text-slate-800 font-medium focus:outline-none appearance-none cursor-pointer"
                  >
                    {dhakaLocations.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="relative">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">{language === 'BN' ? 'ড্রপঅফ (Dropoff)' : 'Dropoff Location'}</label>
                <div className="flex items-center border-2 border-slate-200 rounded-xl px-4 py-1 focus-within:border-emerald-500 transition bg-slate-50">
                  <MapPin className="w-5 h-5 text-slate-400 mr-2" />
                  <select 
                    value={dropoffLocation}
                    onChange={(e) => handleEstimate(pickupLocation, e.target.value)}
                    className="w-full bg-transparent py-3 text-sm text-slate-800 font-medium focus:outline-none appearance-none cursor-pointer"
                  >
                    {dhakaLocations.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold text-emerald-800 uppercase tracking-wide mb-1">
                    {language === 'BN' ? 'আনুমানিক রেট' : 'Estimated Rate'}
                  </span>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-black text-emerald-700">৳{estimatedFare}</span>
                    <span className="text-sm font-medium text-emerald-600">BDT</span>
                  </div>
                </div>
                <a href="/dashboard">
                  <button 
                    className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl text-sm hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition"
                  >
                    {language === 'BN' ? 'এগিয়ে যান' : 'Continue'}
                  </button>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2.5 LIVE TICKER */}
      <div className="bg-slate-900 py-3 overflow-hidden whitespace-nowrap">
        <div className="flex animate-[marquee_20s_linear_infinite]">
          {[...tickerItems, ...tickerItems].map((text, i) => (
            <span key={i} className="mx-8 text-sm font-medium text-slate-300">
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* 3. VALUE PROPOSITION (Why Ushol Mama) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              {language === 'BN' ? 'কেন উসুল মামা?' : 'Why Ushol Mama?'}
            </h2>
            <p className="text-lg text-slate-600">
              {language === 'BN' 
                ? 'প্রথাগত কুরিয়ারের ধীরগতি এবং রাইড-শেয়ারিং এর উচ্চ খরচের বিকল্প হিসেবে আমাদের সমাধান।' 
                : 'The smart alternative to slow traditional couriers and expensive ride-sharing delivery.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Value 1 */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-lg transition duration-300">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
                <Timer className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                {language === 'BN' ? 'সেম-আওয়ার ডেলিভারি' : 'Same-Hour Delivery'}
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {language === 'BN' 
                  ? 'মেট্রোরেল যাত্রীদের মাধ্যমে ট্রাফিক জ্যাম এড়িয়ে ১-২ ঘন্টার মধ্যে শহরের এক প্রান্ত থেকে অন্য প্রান্তে ডেলিভারি।' 
                  : 'Skip the traffic jams. Deliver across the city in 1-2 hours leveraging the speed of Metro Rail commuters.'}
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-lg transition duration-300">
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                {language === 'BN' ? '১০০% ভেরিফাইড ও নিরাপদ' : '100% Verified & Secure'}
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {language === 'BN' 
                  ? 'পরিচয় (Porichoy) API এর মাধ্যমে সকল যাত্রীর NID ভেরিফিকেশন এবং পিকআপ/ড্রপঅফে ডুয়েল OTP নিরাপত্তা।' 
                  : 'NID verification for all commuters via Porichoy API, and Dual OTP security at pickup and dropoff points.'}
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-lg transition duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                <Leaf className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                {language === 'BN' ? 'সাশ্রয়ী ও পরিবেশবান্ধব' : 'Eco-Friendly & Cheap'}
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {language === 'BN' 
                  ? 'ডেলিভারির জন্য রাস্তায় নতুন কোনো বাইক নামছে না। যাত্রীরা তাদের ব্যাগে পার্সেল বহন করায় খরচ অনেক কম।' 
                  : 'Zero extra vehicles on the road. Commuters carry parcels in their bags, making the service incredibly affordable and green.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. USE CASES (Perfect for Everyday Needs) */}
      <section id="solutions" className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              {language === 'BN' ? 'দৈনন্দিন সকল প্রয়োজনে' : 'Perfect for your everyday needs'}
            </h2>
            <p className="text-lg text-slate-400">
              {language === 'BN' ? 'ব্যাগ-সাইজের ছোট পার্সেল, ডকুমেন্টস বা গিফট—সবকিছুই যাবে উসুল মামায়।' : 'Small bag-sized parcels, documents, or gifts—Ushol Mama handles it all.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="bg-slate-800 rounded-3xl p-8 hover:bg-slate-700 transition">
              <Briefcase className="w-10 h-10 text-emerald-400 mb-6" />
              <h4 className="text-xl font-bold mb-3">{language === 'BN' ? 'অফিস ডকুমেন্টস ও চাবি' : 'Office Documents & Keys'}</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {language === 'BN' 
                  ? 'জরুরি কন্ট্রাক্ট পেপার, ভুলে ফেলে আসা ল্যাপটপের চার্জার বা অফিসের চাবি নিরাপদে পাঠিয়ে দিন একই দিনে।' 
                  : 'Send urgent contracts, forgotten laptop chargers, or office keys safely on the same day.'}
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center"><Check className="w-4 h-4 text-emerald-400 mr-2" /> {language === 'BN' ? '১০০% ক্লিয়ার প্যাকেজিং' : '100% Clear Packaging'}</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-emerald-400 mr-2" /> {language === 'BN' ? 'ভেরিফাইড বাহক' : 'Verified Carriers'}</li>
              </ul>
            </div>

            <div className="bg-slate-800 rounded-3xl p-8 hover:bg-slate-700 transition border border-emerald-500/30">
              <Package className="w-10 h-10 text-amber-400 mb-6" />
              <h4 className="text-xl font-bold mb-3">{language === 'BN' ? 'এফ-কমার্স পার্সেল' : 'F-Commerce Parcels'}</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {language === 'BN' 
                  ? 'ফেসবুক পেজের ছোট পোশাক, গয়না বা কসমেটিকস কাস্টমারকে দ্রুত ডেলিভারি দিয়ে বিজনেসে এগিয়ে থাকুন।' 
                  : 'Stay ahead by delivering small clothing, jewelry, or cosmetics to your customers instantly.'}
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center"><Check className="w-4 h-4 text-emerald-400 mr-2" /> {language === 'BN' ? '৳৩,০০০ পর্যন্ত ভ্যালুয়েশন কভার' : 'Up to ৳3,000 Valuation Cap'}</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-emerald-400 mr-2" /> {language === 'BN' ? 'কাস্টমারের সামনে আনবক্সিং' : 'Unboxing at Delivery'}</li>
              </ul>
            </div>

            <div className="bg-slate-800 rounded-3xl p-8 hover:bg-slate-700 transition">
              <GraduationCap className="w-10 h-10 text-blue-400 mb-6" />
              <h4 className="text-xl font-bold mb-3">{language === 'BN' ? 'স্টুডেন্ট নোটস ও বই' : 'Student Notes & Books'}</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {language === 'BN' 
                  ? 'বন্ধুর খাতা, এসাইনমেন্ট বা বই ক্যাম্পাসের মধ্যে আদান-প্রদান করুন নামমাত্র খরচে।' 
                  : 'Exchange notes, assignments, or books between campuses at minimal cost.'}
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center"><Check className="w-4 h-4 text-emerald-400 mr-2" /> {language === 'BN' ? 'ইউনিভার্সিটি এলাকা কভারেজ' : 'University Area Coverage'}</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-emerald-400 mr-2" /> {language === 'BN' ? 'স্টুডেন্ট বাজেট ফ্রেন্ডলি' : 'Student Budget Friendly'}</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (Tabbed Interface) */}
      <section id="how-it-works" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
              {language === 'BN' ? 'কীভাবে কাজ করে?' : 'How does it work?'}
            </h2>
            
            {/* Role Toggle Switch */}
            <div className="inline-flex p-1.5 bg-slate-200/80 rounded-2xl">
              <button 
                onClick={() => setUserRole('sender')}
                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${userRole === 'sender' ? 'bg-white text-emerald-700 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {language === 'BN' ? 'আমি পার্সেল পাঠাব (Sender)' : 'I am a Sender'}
              </button>
              <button 
                onClick={() => setUserRole('commuter')}
                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${userRole === 'commuter' ? 'bg-white text-emerald-700 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {language === 'BN' ? 'আমি ডেলিভারি করব (Commuter)' : 'I am a Commuter'}
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-black text-xl mb-6">1</div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                {userRole === 'commuter' ? (language === 'BN' ? 'রুট অনুযায়ী পার্সেল খুঁজুন' : 'Find parcel by route') : (language === 'BN' ? 'পার্সেল ডিটেইলস পোস্ট করুন' : 'Post parcel details')}
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {userRole === 'commuter' 
                  ? (language === 'BN' ? 'আপনার নিয়মিত ভ্রমণের রুট (যেমন: উত্তরা থেকে ফার্মগেট) সিলেক্ট করে এভেলেবল ব্যাগ-সাইজ পার্সেল দেখুন।' : 'Select your regular travel route (e.g. Uttara to Farmgate) and see available bag-sized parcels.') 
                  : (language === 'BN' ? 'পিকআপ ও ড্রপঅফ স্টেশন নির্বাচন করে ছোট পার্সেলের বিবরণ ও অফার প্রাইস সাবমিট করুন।' : 'Select pickup and dropoff stations, and submit parcel details with your offer price.')}
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-black text-xl mb-6">2</div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                {userRole === 'commuter' ? (language === 'BN' ? 'স্টেশন থেকে পিকআপ করুন' : 'Pickup from station') : (language === 'BN' ? 'উসুল মামার সাথে কনফার্ম করুন' : 'Confirm with Commuter')}
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {userRole === 'commuter' 
                  ? (language === 'BN' ? 'স্টেশনের গেটে প্রেরকের সাথে দেখা করে পার্সেল বুঝে নিন এবং অ্যাপে পিকআপ OTP ভেরিফাই করুন।' : 'Meet the sender at the station gate, inspect the parcel, and verify Pickup OTP in the app.') 
                  : (language === 'BN' ? 'ভেরিফাইড যাত্রীর প্রোফাইল ও এনআইডি দেখে স্টেশনে তার হাতে স্বচ্ছ প্যাকেজে পার্সেল হ্যান্ডওভার করুন।' : 'Check the verified profile of the commuter and hand over the unsealed parcel at the station.')}
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-black text-xl mb-6">3</div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                {userRole === 'commuter' ? (language === 'BN' ? 'ডেলিভারি দিয়ে ইনস্ট্যান্ট পেআউট' : 'Deliver for instant payout') : (language === 'BN' ? 'নিরাপদে ডেলিভারি রিসিভ' : 'Receive delivery safely')}
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {userRole === 'commuter' 
                  ? (language === 'BN' ? 'গন্তব্য স্টেশনে রিসিভারকে পার্সেল বুঝিয়ে দিন। ডেলিভারি OTP এন্টার করতেই টাকা ওয়ালেটে জমা!' : 'Hand over the parcel to the receiver at the destination station. Enter Delivery OTP and get instant payout!') 
                  : (language === 'BN' ? 'প্রাপক ওটিপির মাধ্যমে পার্সেল বুঝে নেওয়ার পর অটোমেটিক পেমেন্ট রিলিজ হবে।' : 'Payment will be automatically released once the receiver takes the parcel via OTP.')}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. SAFETY & TRUST */}
      <section id="safety" className="py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-t border-slate-800 text-slate-100 relative overflow-hidden">
        {/* Ambient lighting accents */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          
          {/* Section Header */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <ShieldCheck className="w-4 h-4" />
              <span>{language === 'BN' ? 'নিরাপত্তা ও বিশ্বাসযোগ্যতা | ১০০% গ্যারান্টিযুক্ত প্রোটোকল' : 'Safety & Trust Standard | 100% Guaranteed Protocol'}</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {language === 'BN' 
                ? 'সরকারি ভেরিফিকেশন, ডিজিটাল এসক্রো ও আইনি সুরক্ষায় আপনার প্রতিটি পার্সেল ১০০% নিরাপদ'
                : 'Govt NID Verification, Digital Escrow & Legal Shield for 100% Safe Transit'}
            </h2>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {language === 'BN' 
                ? 'উসুল মামা কোনো অনানুষ্ঠানিক মাধ্যম নয়—এটি জাতীয় পরিচয়পত্র (Porichoy API), দ্বিমুখী ওটিপি হ্যান্ডশেক, স্বচ্ছ প্যাকেজিং পলিসি, এসক্রো ফান্ড এবং ৩,০০০ টাকা পর্যন্ত ট্রানজিট সুরক্ষা ফান্ডের সমন্বয়ে গঠিত একটি নিরাপদ কমিউটার ইকোসিস্টেম।'
                : 'Ushol Mama is not an unverified courier. We operate under strict digital surveillance: Bangladesh Porichoy API verification, dual OTP handshakes, mandatory open-box inspection, automated escrow, and up to ৳3,000 transit protection.'}
            </p>
          </div>

          {/* Main 2-Column Grid: Pillars vs Live Telemetry */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Cols: 6 Safety Pillars */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              
              {/* Pillar 1: Porichoy API NID */}
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/70 p-5 rounded-2xl hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5 flex items-center gap-1.5">
                  {language === 'BN' ? 'পরিচয় (Porichoy API) NID ভেরিফিকেশন' : 'Porichoy API NID Verification'}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'BN'
                    ? 'সরকারি নির্বাচন কমিশন ডাটাবেজের মাধ্যমে প্রতিটি প্রেরক ও যাত্রীর জাতীয় পরিচয়পত্র (NID) এবং সেলফি যাচাই করা হয়। কোনো বেনামী বা ভুয়া প্রোফাইল নেই।'
                    : 'Every commuter and sender’s National ID is verified in real-time against the Bangladesh Election Commission database via Porichoy API. Zero anonymous profiles.'}
                </p>
              </div>

              {/* Pillar 2: Dual OTP Security */}
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/70 p-5 rounded-2xl hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5 flex items-center gap-1.5">
                  {language === 'BN' ? 'দ্বিমুখী ওটিপি (Dual OTP) হ্যান্ডশেক' : 'Dual-OTP Handshake Security'}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'BN'
                    ? 'পিকআপের সময় প্রেরকের ওটিপি এবং ড্রপঅফে প্রাপকের ডেলিভারি ওটিপি মেলানো ছাড়া ট্রিপ শুরু বা সম্পন্ন হতে পারে না। হ্যান্ডওভার ১০০% নিশ্চিত ও ডিজিটাল রেকর্ডভুক্ত।'
                    : 'Unique 4-digit OTP at pickup and recipient verification OTP at dropoff. Handover cannot complete and funds cannot release without physical verification.'}
                </p>
              </div>

              {/* Pillar 3: Open-Box & Transparent Inspection */}
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/70 p-5 rounded-2xl hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5 flex items-center gap-1.5">
                  {language === 'BN' ? 'স্বচ্ছ প্যাকেজিং ও ওপেন ইনস্পেকশন' : 'Mandatory Open-Box Inspection'}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'BN'
                    ? 'কোনো সিলগালা বা অস্বচ্ছ প্যাকেট বহন সম্পূর্ণ নিষিদ্ধ। পার্সেল গ্রহণের পূর্বে ভেতরে কী আছে তা স্বচক্ষে দেখে নিশ্চিত হওয়ার ও সন্দেহ হলে তা প্রত্যাখ্যানের আইনি অধিকার যাত্রীর রয়েছে।'
                    : 'Sealed blind boxes are strictly forbidden. Commuters have the mandatory right and obligation to physically inspect parcel contents before accepting.'}
                </p>
              </div>

              {/* Pillar 4: 100% Escrow Protection */}
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/70 p-5 rounded-2xl hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5 flex items-center gap-1.5">
                  {language === 'BN' ? '১০০% এসক্রো ভল্ট পেমেন্ট সুরক্ষা' : '100% Escrow Vault Protection'}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'BN'
                    ? 'ডেলিভারি সফল হওয়ার আগে অর্থ কারও কাছে যায় না। এটি সুরক্ষিত এসক্রো ভল্টে থাকে এবং প্রাপক ওটিপি ইনপুট দিলেই সরাসরি ওয়ালেটে জমা হয়। কোনো সমস্যা হলে ১০০% রিফান্ড।'
                    : 'Sender payments are held in an automated escrow vault. Money is disbursed only upon receiver confirmation, with a full refund guarantee upon dispute.'}
                </p>
              </div>

              {/* Pillar 5: Damage Guarantee Cap */}
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/70 p-5 rounded-2xl hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5 flex items-center gap-1.5">
                  {language === 'BN' ? '৳৩,০০০ পর্যন্ত পার্সেল সুরক্ষা গ্যারান্টি' : 'Up to ৳3,000 Transit Guarantee'}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'BN'
                    ? 'ভেরিফাইড ডেলিভারি চলাকালে কোনো অনাকাঙ্ক্ষিত ক্ষতি বা পার্সেল হারানোর ক্ষেত্রে আমাদের ডেডিকেটেড রিজার্ভ ফান্ড থেকে সর্বোচ্চ ৩,০০০ টাকা পর্যন্ত ক্ষতিপূরণের নিশ্চয়তা।'
                    : 'In the rare event of transit damage or loss of a verified package, our platform protection reserve provides up to ৳3,000 compensation.'}
                </p>
              </div>

              {/* Pillar 6: Legal Declaration & Zero Contraband */}
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/70 p-5 rounded-2xl hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5 flex items-center gap-1.5">
                  {language === 'BN' ? 'আইনি শপথ ও জিরো টলারেন্স নীতি' : 'Legal Declaration & Zero Contraband'}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'BN'
                    ? 'প্রতিটি পার্সেল পোস্ট করার পূর্বে প্রেরক বাংলাদেশ মাদকদ্রব্য নিয়ন্ত্রণ আইন ও সাইবার সুরক্ষা আইনের আওতায় ডিজিটাল শপথ গ্রহণ করেন। বেআইনি সামগ্রী প্রেরকের তথ্য সাথে সাথে পুলিশে দেওয়া হয়।'
                    : 'Senders must legally sign a digital declaration under BD Law. Contraband attempts trigger immediate reporting to police with NID and audit logs.'}
                </p>
              </div>

            </div>

            {/* Right 5 Cols: Live Security Status / High-Tech Telemetry */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-800/90 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-700 shadow-2xl space-y-6 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    {language === 'BN' ? 'লাইভ সিকিউরিটি ইঞ্জিন' : 'Live Security Engine'}
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider">
                  ACTIVE SHIELD • 99.98% SAFE
                </span>
              </div>

              {/* Status Spec Table */}
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300 font-medium">NID Matching Engine</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Porichoy API Ready
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Identity Authentication</span>
                  <span className="text-emerald-400 font-bold">100% NID + Live Selfie</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Handover Protocol</span>
                  <span className="text-emerald-400 font-bold">Dual OTP Verification</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Payment Vault</span>
                  <span className="text-cyan-400 font-bold">Automated Escrow Hold</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Parcel Valuation Cap</span>
                  <span className="text-amber-400 font-bold">৳ 3,000 Guarantee</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Max Parcel Weight</span>
                  <span className="text-slate-200 font-bold">2.0 kg (Metro Bag-Size)</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Contraband Filter</span>
                  <span className="text-rose-400 font-bold">Zero-Tolerance Active</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Emergency Response</span>
                  <span className="text-rose-400 font-bold">999 SOS Dispatch Ready</span>
                </div>
              </div>

              {/* Emergency Box */}
              <div className="pt-2 border-t border-slate-800/80 space-y-3">
                <div className="bg-rose-950/30 border border-rose-800/40 rounded-xl p-3.5 flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-rose-200/90 leading-relaxed">
                    {language === 'BN'
                      ? 'কোনো সন্দেহজনক বস্তু বা আচরণ লক্ষ্য করলে তাৎক্ষণিক ট্রিপ বাতিল করুন এবং জাতীয় জরুরি হেল্পলাইন ৯৯৯ অথবা আমাদের সেফটি ডেস্কে রিপোর্ট করুন।'
                      : 'If you notice suspicious activity or prohibited items, decline transit immediately and contact National Helpline 999 or our Safety Desk.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <a 
                    href="tel:999"
                    className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition shadow-md shadow-rose-950/50"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{language === 'BN' ? 'জরুরি ৯৯৯ কল' : 'Emergency 999'}</span>
                  </a>
                  <a 
                    href="tel:+8809612000000"
                    className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{language === 'BN' ? 'সেফটি ডেস্ক' : 'Safety Desk'}</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Prohibited Items & Legal Declaration Banner */}
          <div className="bg-slate-800/70 border border-slate-700/80 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-5">
              <div>
                <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{language === 'BN' ? 'জিরো টলারেন্স আইনি নীতিমালা' : 'Zero-Tolerance Contraband Policy'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {language === 'BN' ? 'নিষিদ্ধ মালামাল ও আইনি শপথনামা' : 'Prohibited Items & Legal Declaration'}
                </h3>
              </div>
              <button
                onClick={() => setIsSafetyModalOpen(true)}
                className="px-5 py-2.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 w-full md:w-auto cursor-pointer"
              >
                <span>{language === 'BN' ? 'নিষিদ্ধ পণ্যের তালিকা ও শপথনামা দেখুন' : 'View Prohibited Items & Legal Oath'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'BN'
                ? 'বাংলাদেশ মাদকদ্রব্য নিয়ন্ত্রণ আইন, পোস্ট অফিস আইন এবং সাইবার নিরাপত্তা আইনের অধীন নিম্নলিখিত বস্তুসমূহ বহন বা প্রেরণ কঠোরভাবে নিষিদ্ধ। মিথ্যা তথ্য প্রদানকারীর বিরুদ্ধে তাৎক্ষণিক আইনি ব্যবস্থা গ্রহণ করা হয়:'
                : 'Under Bangladesh Narcotics Control Act, Post Office Act and Cyber Security Regulations, transporting the following items is strictly prohibited and subject to immediate legal prosecution:'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { icon: '🚫', bn: 'মাদকদ্রব্য ও অ্যালকোহল', en: 'Narcotics & Alcohol' },
                { icon: '💣', bn: 'অস্ত্র ও বিস্ফোরক', en: 'Weapons & Explosives' },
                { icon: '💵', bn: 'নগদ টাকা (৳৫০০+) ও স্বর্ণ', en: 'Cash (৳500+) & Gold' },
                { icon: '🧪', bn: 'দাহ্য বা বিষাক্ত রাসায়নিক', en: 'Hazardous Chemicals' },
                { icon: '📦', bn: 'চোরাই বা বেআইনি মালপত্র', en: 'Stolen or Illegal Goods' },
                { icon: '🍗', bn: 'খোলা পচনশীল খাবার ও তরল', en: 'Perishable Food & Liquid' },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center flex flex-col items-center justify-center space-y-1 hover:border-rose-500/30 transition">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-[11px] font-bold text-slate-200 leading-tight">
                    {language === 'BN' ? item.bn : item.en}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3 Pillars of Trust (Sender, Commuter, Legal) */}
          <div className="grid md:grid-cols-3 gap-6 pt-4">
            
            {/* Sender Protection */}
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                ১
              </div>
              <h4 className="text-base font-bold text-white">
                {language === 'BN' ? 'প্রেরকের সুরক্ষা গ্যারান্টি' : 'Sender Protection Guarantee'}
              </h4>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{language === 'BN' ? '১০০% এনআইডি ভেরিফাইড সরকারি ডাটাবেজ লিংকড যাত্রী' : '100% NID verified commuters linked to Govt database'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{language === 'BN' ? 'প্রাপক ডেলিভারি ওটিপি কনফার্ম না করা পর্যন্ত এসক্রো সুরক্ষা' : 'Escrow protection until recipient inputs delivery OTP'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{language === 'BN' ? '৳৩,০০০ পর্যন্ত ড্যামেজ/লস ট্রানজিট কভারেজ ফান্ড' : 'Up to ৳3,000 transit loss & damage coverage fund'}</span>
                </li>
              </ul>
            </div>

            {/* Commuter Protection */}
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm">
                ২
              </div>
              <h4 className="text-base font-bold text-white">
                {language === 'BN' ? 'যাত্রী ও কমিউটারের আইনি সুরক্ষা' : 'Commuter Legal Safeguard'}
              </h4>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{language === 'BN' ? 'পার্সেল খুলে স্বচক্ষে দেখে গ্রহণের শতভাগ আইনি অধিকার' : 'Mandatory right to inspect parcel contents before transit'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{language === 'BN' ? 'কোনো সিলগালা বা অস্বচ্ছ প্যাকেট প্রত্যাখ্যানের সুযোগ' : 'Right to immediately reject sealed or suspicious parcels'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{language === 'BN' ? 'প্রেরকের ডিজিটাল শপথের কারণে সৎ পরিবহনে পূর্ণ দায়মুক্তি' : 'Legal immunity for bona-fide commuters via sender affidavit'}</span>
                </li>
              </ul>
            </div>

            {/* Compliance & Emergency */}
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                ৩
              </div>
              <h4 className="text-base font-bold text-white">
                {language === 'BN' ? 'আইনি জবাবদিহি ও পুলিশ সহায়তা' : 'Legal Compliance & Police Dispatch'}
              </h4>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{language === 'BN' ? 'ডিজিটাল কমার্স পরিচালনা নির্দেশিকা ২০২১ অনুযায়ী পরিচালিত' : 'Compliant with Digital Commerce Guidelines 2021'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{language === 'BN' ? '১-ক্লিকে জাতীয় জরুরি সেবা ৯৯৯ এবং ট্রিপ ট্র্যাকিং লগ' : '1-click 999 integration with full trip GPS audit logs'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{language === 'BN' ? '২৪/৭ ডেডিকেটেড ডিসপিউট ও ফ্রড প্রিভেনশন ডেস্ক' : '24/7 Dedicated dispute & fraud prevention response desk'}</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-white border-t border-slate-200 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-2 md:col-span-1 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center font-black text-white text-xl">উ</div>
              <span className="text-xl font-black text-slate-900">Ushol Mama</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              {language === 'BN' ? 'বাংলাদেশের প্রথম কমিউটার-ভিত্তিক ক্রাউড-শিপিং প্ল্যাটফর্ম। যাওয়ার পথে ভাড়া উসুল!' : 'Bangladesh\'s first commuter-based crowd-shipping platform. Recover your fare on the way!'}
            </p>
          </div>

          <div>
            <h5 className="text-sm font-bold text-slate-900 mb-6">{language === 'BN' ? 'কোম্পানি' : 'Company'}</h5>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-emerald-600 transition">{language === 'BN' ? 'আমাদের সম্পর্কে' : 'About Us'}</a></li>
              <li><a href="#how-it-works" className="hover:text-emerald-600 transition">{language === 'BN' ? 'কীভাবে কাজ করে' : 'How it works'}</a></li>
              <li><a href="#solutions" className="hover:text-emerald-600 transition">{language === 'BN' ? 'সমাধান' : 'Solutions'}</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-bold text-slate-900 mb-6">{language === 'BN' ? 'আইনি বিষয়াবলী' : 'Legal & Compliance'}</h5>
            <ul className="space-y-4 text-sm text-slate-500">
              <li>
                <a href="#" className="hover:text-emerald-600 transition block">
                  {language === 'BN' ? 'টার্মস অ্যান্ড কন্ডিশনস' : 'Terms of Service'}
                  <span className="block text-[10px] text-slate-400 mt-1 leading-tight">
                    {language === 'BN' 
                      ? '* প্ল্যাটফর্ম দায়মুক্ত (P2P Facilitation)। ইনস্পেকশন রুলস প্রযোজ্য।' 
                      : '* Platform holds immunity under P2P facilitation. Inspection rules apply.'}
                  </span>
                </a>
              </li>
              <li><a href="#" className="hover:text-emerald-600 transition">{language === 'BN' ? 'প্রাইভেসি পলিসি' : 'Privacy Policy'}</a></li>
              <li>
                <button 
                  onClick={() => setIsSafetyModalOpen(true)} 
                  className="hover:text-rose-400 transition text-rose-500 font-semibold cursor-pointer text-left"
                >
                  {language === 'BN' ? 'নিষিদ্ধ মালামাল ও আইনি শপথ' : 'Prohibited Items & Legal Declaration'}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-bold text-slate-900 mb-6">{language === 'BN' ? 'যোগাযোগ' : 'Contact'}</h5>
            <ul className="space-y-4 text-sm text-slate-500">
              <li>{language === 'BN' ? 'লেভেল ৪, আইটি পার্ক, কারওয়ান বাজার' : 'Level 4, IT Park, Karwan Bazar'}</li>
              <li>support@usholmama.com</li>
              <li>+880 9612-000000</li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-slate-400 mb-4 md:mb-0">
            © 2026 Ushol Mama Logistics Network. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <div className="text-sm font-medium px-3 py-1 bg-slate-100 text-slate-600 rounded-full">Porichoy Verified</div>
            <div className="text-sm font-medium px-3 py-1 bg-slate-100 text-slate-600 rounded-full">Secured with Better Auth</div>
          </div>
        </div>
      </footer>

      {/* CSS for Marquee (Put inside global.css or here for demo) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        language={language} 
      />

      <SafetyDeclarationModal 
        isOpen={isSafetyModalOpen} 
        onClose={() => setIsSafetyModalOpen(false)} 
        onAccept={() => {
          setIsSafetyModalOpen(false);
          alert(language === 'BN' ? 'ধন্যবাদ! আপনি প্ল্যাটফর্মের নিরাপত্তা ও আইনি ঘোষণাপত্রে সম্মতি দিয়েছেন।' : 'Thank you! You have agreed to the platform Safety Declaration & Legal Policy.');
        }} 
        language={language} 
      />
    </div>
  );
}
