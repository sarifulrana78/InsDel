"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Package, 
  PlusCircle, 
  Search, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Eye, 
  QrCode, 
  KeyRound, 
  AlertTriangle, 
  Wallet, 
  ArrowUpRight, 
  CheckCircle,
  Truck,
  User,
  Phone,
  Camera,
  X,
  Sparkles,
  RefreshCw,
  TrendingUp,
  Award
} from 'lucide-react';
import { useApp, ParcelItem } from '@/context/AppContext';
import RecipientQRModal from '@/components/RecipientQRModal';
import SafetyDeclarationModal from '@/components/SafetyDeclarationModal';

export default function Dashboard() {
  const { 
    language, 
    user, 
    switchRole, 
    parcels, 
    acceptParcel, 
    confirmPickup, 
    arriveAtDestination, 
    completeDelivery,
    reportParcel,
    cancelParcel,
    withdrawWallet,
    resetDemoData
  } = useApp();

  // Active Mission Modals
  const [selectedParcelForQR, setSelectedParcelForQR] = useState<ParcelItem | null>(null);
  const [inspectionParcel, setInspectionParcel] = useState<ParcelItem | null>(null);
  const [handoverParcel, setHandoverParcel] = useState<ParcelItem | null>(null);
  const [reportModalParcel, setReportModalParcel] = useState<ParcelItem | null>(null);
  const [reportReason, setReportReason] = useState('');
  
  // Inspection Form State
  const [inspectionCheckbox, setInspectionCheckbox] = useState(false);
  const [pickupEnteredOTP, setPickupEnteredOTP] = useState('');
  const [inspectionPhotoPreview, setInspectionPhotoPreview] = useState<string | null>(null);
  const [inspectionError, setInspectionError] = useState('');

  // Handover Form State
  const [handoverEnteredOTP, setHandoverEnteredOTP] = useState('');
  const [handoverPhotoPreview, setHandoverPhotoPreview] = useState<string | null>(null);
  const [handoverError, setHandoverError] = useState('');
  const [handoverTab, setHandoverTab] = useState<'otp' | 'qr'>('otp');

  // Withdraw Modal
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('300');
  const [withdrawPhone, setWithdrawPhone] = useState('01712-345678');
  const [withdrawMethod, setWithdrawMethod] = useState<'bKash' | 'Nagad'>('bKash');
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  // Status Filter
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'delivered'>('all');

  // Commuter's active deliveries
  const commuterActiveParcels = parcels.filter(
    p => p.commuterId === user.id && p.status !== 'delivered' && p.status !== 'cancelled'
  );

  // Sender's parcels
  const senderParcels = parcels.filter(p => p.senderId === user.id);

  // Filtered parcels based on role and tab
  const displayedParcels = user.role === 'sender'
    ? senderParcels.filter(p => {
        if (statusFilter === 'active') return p.status !== 'delivered' && p.status !== 'cancelled';
        if (statusFilter === 'delivered') return p.status === 'delivered';
        return true;
      })
    : parcels.filter(p => {
        if (statusFilter === 'active') return p.status !== 'delivered' && p.status !== 'cancelled';
        if (statusFilter === 'delivered') return p.status === 'delivered';
        return true;
      });

  // Handler for Inspection & Pickup
  const handleConfirmPickupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inspectionParcel) return;
    if (!inspectionCheckbox) {
      setInspectionError(language === 'BN' ? 'অনুগ্রহ করে পার্সেল চেক করার টিক চিহ্ন দিন।' : 'Please check the inspection confirmation.');
      return;
    }
    if (!pickupEnteredOTP) {
      setInspectionError(language === 'BN' ? 'প্রেরকের ৪-সংখ্যার পিকআপ OTP প্রদান করুন।' : 'Please enter the 4-digit pickup OTP.');
      return;
    }

    const mockPhoto = inspectionPhotoPreview || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&auto=format&fit=crop&q=80';
    const result = confirmPickup(inspectionParcel.id, pickupEnteredOTP, mockPhoto);
    if (!result.success) {
      setInspectionError(result.message);
    } else {
      alert(result.message);
      setInspectionParcel(null);
      setInspectionCheckbox(false);
      setPickupEnteredOTP('');
      setInspectionPhotoPreview(null);
      setInspectionError('');
    }
  };

  // Handler for Final Handover
  const handleCompleteHandoverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handoverParcel) return;
    if (!handoverEnteredOTP) {
      setHandoverError(language === 'BN' ? 'প্রাপকের ৬-সংখ্যার ডেলিভারি OTP দিন।' : 'Enter the 6-digit delivery OTP.');
      return;
    }

    const mockPhoto = handoverPhotoPreview || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&auto=format&fit=crop&q=80';
    const result = completeDelivery(handoverParcel.id, handoverEnteredOTP, mockPhoto);
    if (!result.success) {
      setHandoverError(result.message);
    } else {
      alert(result.message);
      setHandoverParcel(null);
      setHandoverEnteredOTP('');
      setHandoverPhotoPreview(null);
      setHandoverError('');
    }
  };

  // Handler for Withdraw
  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseInt(withdrawAmount, 10);
    if (amt > 0 && amt <= user.walletBalance) {
      const ok = withdrawWallet(amt);
      if (ok) {
        setWithdrawSuccess(true);
        setTimeout(() => {
          setWithdrawSuccess(false);
          setIsWithdrawOpen(false);
        }, 1500);
      }
    } else {
      alert(language === 'BN' ? 'পর্যাপ্ত ব্যালেন্স নেই!' : 'Insufficient wallet balance!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-24 pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* 1. TOP PROFILE & ROLE SWITCH BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          {/* User info */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white font-black text-2xl flex items-center justify-center shadow-lg">
                {user.name.slice(0, 1)}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-400 text-slate-900 flex items-center justify-center ring-4 ring-slate-900" title="Porichoy NID Verified">
                <CheckCircle2 className="w-4 h-4 stroke-[3]" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{user.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Porichoy NID ভেরিফাইড
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 flex items-center gap-3">
                <span>📱 {user.phone}</span>
                <span>⭐ {user.rating} রেটিং</span>
                <span>📦 {user.totalTrips} ট্রিপ সম্পন্ন</span>
              </p>
            </div>
          </div>

          {/* Role Switching & Quick Wallet Card */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Wallet Quick Box */}
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl px-5 py-3 flex items-center space-x-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  {language === 'BN' ? 'ওয়ালেট ব্যালেন্স' : 'Wallet Balance'}
                </span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400">
                  ৳ {user.walletBalance}
                </span>
              </div>
              <button
                onClick={() => setIsWithdrawOpen(true)}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1 shadow-sm"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{language === 'BN' ? 'ক্যাশআউট' : 'Withdraw'}</span>
              </button>
            </div>

            {/* Role Switcher Pill */}
            <div className="bg-slate-950 p-1.5 rounded-2xl border border-slate-700 flex items-center">
              <button
                onClick={() => switchRole('sender')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                  user.role === 'sender'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>📦</span>
                <span>{language === 'BN' ? 'প্রেরক মোড' : 'Sender Mode'}</span>
              </button>
              <button
                onClick={() => switchRole('commuter')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                  user.role === 'commuter'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🎒</span>
                <span>{language === 'BN' ? 'যাত্রী মোড' : 'Commuter Mode'}</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* 2. COMMUTER ACTIVE MISSIONS (Only shown if in Commuter role and has active jobs) */}
      {user.role === 'commuter' && commuterActiveParcels.length > 0 && (
        <div className="mb-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-slate-900">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <h2 className="text-xl font-black">
                {language === 'BN' ? 'আপনার চলমান ডেলিভারি মিশন (Active Mission)' : 'Your Active Delivery Mission'}
              </h2>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              {commuterActiveParcels.length} {language === 'BN' ? 'টি অ্যাক্টিভ' : 'Active'}
            </span>
          </div>

          <div className="grid gap-6">
            {commuterActiveParcels.map((parcel) => (
              <div 
                key={parcel.id}
                className="bg-white rounded-3xl border-2 border-emerald-500/40 shadow-lg shadow-emerald-500/5 p-6 sm:p-8 space-y-6"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-emerald-100 text-emerald-800">
                        {parcel.category}
                      </span>
                      <span className="text-xs font-bold text-slate-400">ID: {parcel.id}</span>
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> ১০০% সুরক্ষিত এসক্রো
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mt-1">{parcel.title}</h3>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs font-semibold text-slate-500 block">
                      {language === 'BN' ? 'আপনার আয় (পেমেন্ট)' : 'Your Earnings'}
                    </span>
                    <span className="text-2xl font-black text-emerald-600">৳ {parcel.payoutBDT}</span>
                  </div>
                </div>

                {/* Route */}
                <div className="grid sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-100 shrink-0" />
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {language === 'BN' ? 'পিকআপ পয়েন্ট (প্রেরক)' : 'Pickup Station (Sender)'}
                      </p>
                      <p className="text-sm font-bold text-slate-800">{parcel.pickupLocation}</p>
                      <p className="text-xs text-slate-500">{parcel.senderName} • 📞 {parcel.senderPhone}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="mt-1 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100 shrink-0" />
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {language === 'BN' ? 'ড্রপঅফ পয়েন্ট (প্রাপক)' : 'Dropoff Station (Recipient)'}
                      </p>
                      <p className="text-sm font-bold text-slate-800">{parcel.dropoffLocation}</p>
                      <p className="text-xs text-slate-500">{parcel.recipientName} • 📞 {parcel.recipientPhone}</p>
                    </div>
                  </div>
                </div>

                {/* Stepper Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className={parcel.status === 'accepted' ? 'text-emerald-600' : 'text-slate-400'}>
                      ১. স্টেশনে পিকআপ
                    </span>
                    <span className={parcel.status === 'picked_up' ? 'text-emerald-600' : 'text-slate-400'}>
                      ২. মেট্রোতে অন-ট্রানজিট
                    </span>
                    <span className={parcel.status === 'arrived_at_destination' ? 'text-emerald-600' : 'text-slate-400'}>
                      ৩. গন্তব্যে আগমন
                    </span>
                    <span className={parcel.status === 'delivered' ? 'text-emerald-600' : 'text-slate-400'}>
                      ৪. সফল হ্যান্ডওভার
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full transition-all duration-500"
                      style={{
                        width: 
                          parcel.status === 'accepted' ? '25%' :
                          parcel.status === 'picked_up' ? '50%' :
                          parcel.status === 'arrived_at_destination' ? '75%' : '100%'
                      }}
                    />
                  </div>
                </div>

                {/* Commuter Interactive Action Triggers */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  
                  {/* Step 1: Accepted -> Needs Pickup & Inspection */}
                  {parcel.status === 'accepted' && (
                    <button
                      onClick={() => {
                        setInspectionParcel(parcel);
                        setInspectionError('');
                      }}
                      className="flex-1 min-w-[200px] py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-500/20 transition flex items-center justify-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>{language === 'BN' ? '১. পার্সেল ইনস্পেকশন ও পিকআপ OTP ভেরিফাই করুন' : '1. Open-Box Inspection & Verify Pickup OTP'}</span>
                    </button>
                  )}

                  {/* Step 2: Picked Up -> Needs Arrival */}
                  {parcel.status === 'picked_up' && (
                    <button
                      onClick={() => {
                        const res = arriveAtDestination(parcel.id);
                        alert(res.message);
                      }}
                      className="flex-1 min-w-[200px] py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition flex items-center justify-center space-x-2"
                    >
                      <Truck className="w-4 h-4" />
                      <span>{language === 'BN' ? '২. গন্তব্য স্টেশনে পৌঁছে গেছি (Mark Arrived)' : '2. Arrived at Destination Station'}</span>
                    </button>
                  )}

                  {/* Step 3: Arrived -> Needs Final Recipient Handover */}
                  {parcel.status === 'arrived_at_destination' && (
                    <button
                      onClick={() => {
                        setHandoverParcel(parcel);
                        setHandoverError('');
                      }}
                      className="flex-1 min-w-[200px] py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-500/20 transition flex items-center justify-center space-x-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>{language === 'BN' ? '৩. প্রাপককে হ্যান্ডওভার ও OTP ভেরিফাই করুন' : '3. Verify Recipient OTP & Complete Handover'}</span>
                    </button>
                  )}

                  {/* Emergency Safety Trigger */}
                  <button
                    onClick={() => {
                      setReportModalParcel(parcel);
                    }}
                    className="py-3.5 px-4 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition flex items-center space-x-1"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>{language === 'BN' ? 'সন্দেহজনক কিছু দেখলে রিপোর্ট' : 'Report Issue'}</span>
                  </button>

                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. MAIN DASHBOARD CONTENT */}
      <div className="space-y-6">
        
        {/* Navigation & Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Tabs */}
          <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 sm:pb-0 sm:border-none">
            <h2 className="text-xl font-black text-slate-900 mr-4">
              {user.role === 'sender'
                ? (language === 'BN' ? 'আমার পাঠানো পার্সেলসমূহ' : 'My Posted Parcels')
                : (language === 'BN' ? 'ডেলিভারি হিস্ট্রি ও পার্সেল' : 'Delivery History & Parcels')}
            </h2>

            <div className="bg-slate-200/80 p-1 rounded-xl flex items-center text-xs font-bold">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  statusFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'BN' ? 'সকল' : 'All'}
              </button>
              <button
                onClick={() => setStatusFilter('active')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  statusFilter === 'active' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'BN' ? 'অ্যাক্টিভ' : 'Active'}
              </button>
              <button
                onClick={() => setStatusFilter('delivered')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  statusFilter === 'delivered' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'BN' ? 'সম্পন্ন' : 'Completed'}
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3">
            <Link
              href="/find-parcels"
              className="px-4 py-2.5 bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 text-xs font-bold rounded-xl transition flex items-center space-x-2 shadow-sm"
            >
              <Search className="w-4 h-4 text-emerald-600" />
              <span>{language === 'BN' ? 'পার্সেল খুঁজুন' : 'Find Parcels'}</span>
            </Link>

            <Link
              href="/new-request"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center space-x-2 shadow-md shadow-emerald-500/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{language === 'BN' ? 'নতুন পার্সেল পাঠান' : 'Post New Parcel'}</span>
            </Link>
          </div>

        </div>

        {/* Parcels Grid */}
        {displayedParcels.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              {language === 'BN' ? 'কোনো পার্সেল পাওয়া যায়নি' : 'No parcels found'}
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              {user.role === 'sender'
                ? (language === 'BN' ? 'আপনার কোনো পার্সেল এখনো পোস্ট করা হয়নি। এখনই একটি নতুন ডেলিভারি রিকোয়েস্ট তৈরি করুন।' : 'You have not posted any parcels yet. Create a new request now.')
                : (language === 'BN' ? 'আপনার রুটের জন্য নতুন কোনো পার্সেল এভেলেবল নেই। নতুন পার্সেল খুঁজুন পেজে যান।' : 'No active parcels on your route. Check the find parcels page.')}
            </p>
            <Link
              href={user.role === 'sender' ? '/new-request' : '/find-parcels'}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition"
            >
              <span>{user.role === 'sender' ? (language === 'BN' ? 'পার্সেল পাঠান' : 'Post Parcel') : (language === 'BN' ? 'পার্সেল খুঁজুন' : 'Find Parcels')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedParcels.map((parcel) => {
              const isSenderOfParcel = parcel.senderId === user.id;

              return (
                <div
                  key={parcel.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-5 relative group"
                >
                  <div className="space-y-4">
                    
                    {/* Top Row: Category & Status */}
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full capitalize">
                        {parcel.category}
                      </span>

                      {/* Status Badges */}
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        parcel.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                        parcel.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                        parcel.status === 'picked_up' ? 'bg-indigo-100 text-indigo-800' :
                        parcel.status === 'arrived_at_destination' ? 'bg-cyan-100 text-cyan-800' :
                        parcel.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {parcel.status === 'pending' ? (language === 'BN' ? 'যাত্রীর অপেক্ষায়' : 'Pending') :
                         parcel.status === 'accepted' ? (language === 'BN' ? 'গৃহীত / পিকআপ বাকি' : 'Accepted') :
                         parcel.status === 'picked_up' ? (language === 'BN' ? 'মেট্রোতে অন-ট্রানজিট' : 'In Transit') :
                         parcel.status === 'arrived_at_destination' ? (language === 'BN' ? 'গন্তব্যে পৌঁছেছে' : 'Arrived') :
                         parcel.status === 'delivered' ? (language === 'BN' ? 'ডেলিভারি সম্পন্ন' : 'Delivered') :
                         (language === 'BN' ? 'রিপোর্টেড / ফ্ল্যাগড' : 'Reported')}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h4 className="text-base font-black text-slate-900 group-hover:text-emerald-600 transition">
                        {parcel.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {parcel.description}
                      </p>
                    </div>

                    {/* Route Details */}
                    <div className="space-y-2 bg-slate-50/80 p-3 rounded-2xl border border-slate-100 text-xs">
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 shrink-0" />
                        <div>
                          <span className="text-[10px] text-slate-400 block font-bold uppercase">পিকআপ (Pickup)</span>
                          <span className="font-bold text-slate-700">{parcel.pickupLocation}</span>
                        </div>
                      </div>
                      <div className="border-l-2 border-dashed border-slate-300 ml-1 h-3" />
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
                        <div>
                          <span className="text-[10px] text-slate-400 block font-bold uppercase">ড্রপঅফ (Dropoff)</span>
                          <span className="font-bold text-slate-700">{parcel.dropoffLocation}</span>
                        </div>
                      </div>
                    </div>

                    {/* SENDER SECRET SECURITY CODES (Only visible to the sender or recipient) */}
                    {isSenderOfParcel && parcel.status !== 'delivered' && parcel.status !== 'cancelled' && (
                      <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3.5 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-600 flex items-center gap-1">
                            <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
                            পিকআপ ওটিপি (Pickup OTP):
                          </span>
                          <span className="font-black text-sm text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-300">
                            {parcel.pickupOTP}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-600 flex items-center gap-1">
                            <KeyRound className="w-3.5 h-3.5 text-cyan-600" />
                            প্রাপকের ওটিপি (Dropoff OTP):
                          </span>
                          <span className="font-black text-sm text-cyan-700 bg-white px-2 py-0.5 rounded border border-cyan-300">
                            {parcel.dropoffOTP}
                          </span>
                        </div>
                        <p className="text-[10px] text-emerald-800 leading-tight">
                          * যাত্রীর হাতে পার্সেল তুলে দেওয়ার সময় পিকআপ ওটিপি দিন। প্রাপককে ডেলিভারি ওটিপি বা কিউআর কোড পাঠান।
                        </p>
                      </div>
                    )}

                    {/* Price & Payout */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">ঘোষিত মূল্য (Valuation)</span>
                        <span className="font-bold text-slate-700">৳ {parcel.declaredValueBDT}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 block text-[10px]">কমিউটার ভাড়া (Payout)</span>
                        <span className="font-black text-base text-emerald-600">৳ {parcel.payoutBDT}</span>
                      </div>
                    </div>

                  </div>

                  {/* Actions Bar */}
                  <div className="pt-2 flex items-center gap-2">
                    
                    {/* View Recipient QR Code */}
                    <button
                      onClick={() => setSelectedParcelForQR(parcel)}
                      className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                      title="ডেলিভারি QR কোড দেখুন"
                    >
                      <QrCode className="w-4 h-4 text-emerald-600" />
                    </button>

                    {/* Sender can cancel if pending */}
                    {isSenderOfParcel && parcel.status === 'pending' && (
                      <button
                        onClick={() => {
                          if (confirm(language === 'BN' ? 'আপনি কি নিশ্চিত পার্সেলটি বাতিল করতে চান?' : 'Cancel this parcel?')) {
                            cancelParcel(parcel.id);
                          }
                        }}
                        className="py-2.5 px-3 rounded-xl border border-slate-200 text-slate-500 hover:text-rose-600 text-xs font-bold transition"
                      >
                        {language === 'BN' ? 'বাতিল' : 'Cancel'}
                      </button>
                    )}

                    {/* Commuter can accept if pending */}
                    {!isSenderOfParcel && parcel.status === 'pending' && (
                      <button
                        onClick={() => {
                          acceptParcel(parcel.id);
                          alert(language === 'BN' ? 'অভিনন্দন! আপনি পার্সেল ডেলিভারি গ্রহণ করেছেন।' : 'Delivery accepted!');
                        }}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center justify-center space-x-1"
                      >
                        <span>{language === 'BN' ? 'ডেলিভারি এক্সেপ্ট করুন' : 'Accept Delivery'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* If in progress, show quick action */}
                    {parcel.status !== 'pending' && parcel.status !== 'delivered' && (
                      <button
                        onClick={() => {
                          if (parcel.status === 'accepted') setInspectionParcel(parcel);
                          else if (parcel.status === 'picked_up') arriveAtDestination(parcel.id);
                          else if (parcel.status === 'arrived_at_destination') setHandoverParcel(parcel);
                        }}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition text-center"
                      >
                        {parcel.status === 'accepted' ? (language === 'BN' ? 'পিকআপ সম্পন্ন করুন' : 'Confirm Pickup') :
                         parcel.status === 'picked_up' ? (language === 'BN' ? 'গন্তব্যে পৌঁছান' : 'Arrived') :
                         (language === 'BN' ? 'হ্যান্ডওভার ও পেআউট' : 'Handover')}
                      </button>
                    )}

                    {/* If delivered, show receipt pill */}
                    {parcel.status === 'delivered' && (
                      <div className="flex-1 py-2 px-3 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{language === 'BN' ? 'সফল ডেলিভারি' : 'Delivered'}</span>
                      </div>
                    )}

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* 4. MODALS */}

      {/* RECIPIENT QR MODAL */}
      {selectedParcelForQR && (
        <RecipientQRModal
          isOpen={!!selectedParcelForQR}
          onClose={() => setSelectedParcelForQR(null)}
          parcelId={selectedParcelForQR.id}
          recipientPhone={selectedParcelForQR.recipientPhone}
          language={language}
        />
      )}

      {/* INSPECTION & PICKUP MODAL */}
      {inspectionParcel && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setInspectionParcel(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  {language === 'BN' ? 'ওপেন-বক্স ইনস্পেকশন ও পিকআপ' : 'Open-Box Inspection & Pickup'}
                </h3>
                <p className="text-xs text-slate-500">
                  ID: {inspectionParcel.id} • {inspectionParcel.title}
                </p>
              </div>
            </div>

            {inspectionError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold mb-4">
                ⚠️ {inspectionError}
              </div>
            )}

            <form onSubmit={handleConfirmPickupSubmit} className="space-y-5">
              
              {/* Mandatory Checklist */}
              <label className="flex items-start space-x-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={inspectionCheckbox}
                  onChange={(e) => setInspectionCheckbox(e.target.checked)}
                  className="mt-1 w-5 h-5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <div className="text-xs font-semibold text-slate-700 leading-relaxed">
                  {language === 'BN'
                    ? 'আমি পার্সেলটি স্বচক্ষে খুলে দেখেছি। এতে কোনো সিলগালা অস্বচ্ছ প্যাকেট বা নিষিদ্ধ পণ্য (মাদক, অস্ত্র, বিস্ফোরক) নেই।'
                    : 'I have physically inspected the unsealed contents. There are no prohibited or illegal items.'}
                </div>
              </label>

              {/* Photo Proof */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  {language === 'BN' ? 'পিকআপের ছবি তুলুন (Optional for Demo)' : 'Capture Live Photo (Optional)'}
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden shrink-0">
                    {inspectionPhotoPreview ? (
                      <img src={inspectionPhotoPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="w-8 h-8 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      id="inspection-file"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const url = URL.createObjectURL(e.target.files[0]);
                          setInspectionPhotoPreview(url);
                        }
                      }}
                    />
                    <label
                      htmlFor="inspection-file"
                      className="inline-block px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer transition mb-1"
                    >
                      {language === 'BN' ? 'ছবি সিলেক্ট করুন' : 'Select Photo'}
                    </label>
                    <p className="text-[10px] text-slate-400">
                      {language === 'BN' ? 'ক্যামেরা অথবা গ্যালারি থেকে স্বচ্ছ ছবি দিন' : 'Upload open parcel photo'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pickup OTP */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    {language === 'BN' ? 'প্রেরকের দেওয়া ৪-সংখ্যার পিকআপ OTP' : 'Enter 4-Digit Pickup OTP from Sender'}
                  </label>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    ডেমো ওটিপি: {inspectionParcel.pickupOTP}
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={4}
                  value={pickupEnteredOTP}
                  onChange={(e) => setPickupEnteredOTP(e.target.value)}
                  placeholder="e.g. 4821"
                  className="w-full text-center tracking-[0.5em] text-2xl font-black py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-500/20 transition"
              >
                {language === 'BN' ? 'পিকআপ নিশ্চিত করুন' : 'Confirm Pickup & Handshake'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FINAL HANDOVER & RECIPIENT OTP MODAL */}
      {handoverParcel && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setHandoverParcel(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  {language === 'BN' ? 'চূড়ান্ত ডেলিভারি ও হ্যান্ডওভার' : 'Final Delivery & Handover'}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'BN' ? `প্রাপক: ${handoverParcel.recipientName} (${handoverParcel.recipientPhone})` : `Recipient: ${handoverParcel.recipientName}`}
                </p>
              </div>
            </div>

            {handoverError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold mb-4">
                ⚠️ {handoverError}
              </div>
            )}

            <form onSubmit={handleCompleteHandoverSubmit} className="space-y-5">
              
              {/* Delivery OTP */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    {language === 'BN' ? 'প্রাপকের ৬-সংখ্যার ডেলিভারি OTP' : 'Enter 6-Digit Recipient OTP'}
                  </label>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    ডেমো ওটিপি: {handoverParcel.dropoffOTP}
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={handoverEnteredOTP}
                  onChange={(e) => setHandoverEnteredOTP(e.target.value)}
                  placeholder="------"
                  className="w-full text-center tracking-[0.4em] text-3xl font-black py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              {/* Handover Proof Photo */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  {language === 'BN' ? 'হস্তান্তরের প্রমাণ ছবি (Live Evidence Photo)' : 'Live Handover Photo'}
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden shrink-0">
                    {handoverPhotoPreview ? (
                      <img src={handoverPhotoPreview} alt="Handover Proof" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="w-8 h-8 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      id="handover-file"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const url = URL.createObjectURL(e.target.files[0]);
                          setHandoverPhotoPreview(url);
                        }
                      }}
                    />
                    <label
                      htmlFor="handover-file"
                      className="inline-block px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer transition mb-1"
                    >
                      {language === 'BN' ? 'ছবি তুলুন' : 'Capture Photo'}
                    </label>
                    <p className="text-[10px] text-slate-400">
                      {language === 'BN' ? 'প্রাপকের হাতে পার্সেল বুঝিয়ে দেওয়ার ছবি' : 'Photo of recipient taking delivery'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-800 font-medium">
                💰 {language === 'BN' 
                  ? `ওটিপি নিশ্চিত হওয়ামাত্রই আপনার উসুল ওয়ালেটে ৳${handoverParcel.payoutBDT} সাথে সাথে জমা হবে!` 
                  : `৳${handoverParcel.payoutBDT} will be credited to your wallet instantly upon OTP verification!`}
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-500/20 transition flex items-center justify-center space-x-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>{language === 'BN' ? 'ডেলিভারি সম্পন্ন ও ক্যাশআউট নিন' : 'Complete Delivery & Release Payout'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* REPORT ISSUE MODAL */}
      {reportModalParcel && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setReportModalParcel(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4 text-rose-600">
              <AlertTriangle className="w-8 h-8" />
              <h3 className="text-xl font-black">
                {language === 'BN' ? 'জরুরি সেফটি রিপোর্ট' : 'Report Security Concern'}
              </h3>
            </div>

            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              {language === 'BN'
                ? 'পার্সেলে কোনো অবৈধ, বিপজ্জনক বা সন্দেহজনক বস্তু পাওয়া গেলে ট্রিপ বাতিল করুন। আমাদের সেফটি ডেস্ক ও আইনশৃঙ্খলা বাহিনী সরাসরি তদন্ত করবে।'
                : 'If parcel contains contraband or suspicious items, cancel transit. Our Safety Desk and law enforcement will investigate.'}
            </p>

            <div className="space-y-4">
              <textarea
                rows={3}
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder={language === 'BN' ? 'সমস্যার বিবরণ লিখুন (যেমন: সিলগালা প্যাকেট খুলতে অস্বীকৃতি)...' : 'Describe the reason...'}
                className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setReportModalParcel(null)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
                >
                  {language === 'BN' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    reportParcel(reportModalParcel.id, reportReason || 'Prohibited items violation');
                    setReportModalParcel(null);
                    setReportReason('');
                    alert(language === 'BN' ? 'রিপোর্ট সফল হয়েছে। সেফটি টিম অ্যাকশন গ্রহণ করেছে।' : 'Report submitted successfully.');
                  }}
                  className="w-1/2 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition"
                >
                  {language === 'BN' ? 'রিপোর্ট পাঠান' : 'Submit Report'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WITHDRAW / CASHOUT MODAL */}
      {isWithdrawOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsWithdrawOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {language === 'BN' ? 'উসুল মামা ক্যাশআউট' : 'Cashout Wallet'}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'BN' ? `উপলব্ধ ব্যালেন্স: ৳${user.walletBalance}` : `Available: ৳${user.walletBalance}`}
                </p>
              </div>
            </div>

            {withdrawSuccess ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-slate-800">
                  {language === 'BN' ? 'ক্যাশআউট সফল হয়েছে!' : 'Cashout Successful!'}
                </h4>
                <p className="text-xs text-slate-500">
                  {language === 'BN' ? `৳${withdrawAmount} আপনার ${withdrawMethod} অ্যাকাউন্টে পাঠানো হয়েছে।` : `৳${withdrawAmount} sent to your ${withdrawMethod}.`}
                </p>
              </div>
            ) : (
              <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'BN' ? 'পেমেন্ট মাধ্যম' : 'Payment Method'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setWithdrawMethod('bKash')}
                      className={`py-2 rounded-xl text-xs font-bold border transition ${
                        withdrawMethod === 'bKash' ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      bKash
                    </button>
                    <button
                      type="button"
                      onClick={() => setWithdrawMethod('Nagad')}
                      className={`py-2 rounded-xl text-xs font-bold border transition ${
                        withdrawMethod === 'Nagad' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      Nagad
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'BN' ? `${withdrawMethod} নম্বর` : `${withdrawMethod} Number`}
                  </label>
                  <input
                    type="text"
                    value={withdrawPhone}
                    onChange={(e) => setWithdrawPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'BN' ? 'উত্তোলনের পরিমাণ (টাকা)' : 'Amount (BDT)'}
                  </label>
                  <input
                    type="number"
                    value={withdrawAmount}
                    max={user.walletBalance}
                    min="50"
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-bold text-slate-800"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={user.walletBalance < 50}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition disabled:opacity-50"
                >
                  {language === 'BN' ? 'তাৎক্ষণিক উত্তোলন সম্পন্ন করুন' : 'Instant Withdraw'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
