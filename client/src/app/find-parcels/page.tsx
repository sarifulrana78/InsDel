"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  Filter, 
  Package, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  ArrowLeft,
  DollarSign
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { getLocalizedParcelText } from '@/utils/parcelUtils';

export default function FindParcelsPage() {
  const router = useRouter();
  const { language, user, switchRole, parcels, acceptParcel } = useApp();

  const dhakaStations = [
    'All Stations',
    'Uttara North (Metro)',
    'Uttara Center (Metro)',
    'Uttara South (Metro)',
    'Pallabi (Metro)',
    'Mirpur 11 (Metro)',
    'Mirpur 10 (Metro)',
    'Kazipara (Metro)',
    'Shewrapara (Metro)',
    'Agargaon (Metro)',
    'Bijoy Sarani (Metro)',
    'Farmgate (Metro)',
    'Karwan Bazar (Metro)',
    'Shahbagh (Metro)',
    'Dhaka University (Metro)',
    'Secretariat (Metro)',
    'Motijheel (Metro)',
    'Dhanmondi (Dhaka College, ULAB)',
    'Gulshan',
    'Banani',
    'Mohakhali (BRAC, Titumir)',
    'Bashundhara (NSU, IUB)'
  ];

  const [pickupFilter, setPickupFilter] = useState('All Stations');
  const [dropoffFilter, setDropoffFilter] = useState('All Stations');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [acceptedModalParcel, setAcceptedModalParcel] = useState<any>(null);

  // Available pending parcels
  const availableParcels = parcels.filter(p => {
    if (p.status !== 'pending') return false;

    if (pickupFilter !== 'All Stations' && !p.pickupLocation.includes(pickupFilter.replace(' (Metro)', ''))) {
      return false;
    }
    if (dropoffFilter !== 'All Stations' && !p.dropoffLocation.includes(dropoffFilter.replace(' (Metro)', ''))) {
      return false;
    }
    if (categoryFilter !== 'all' && p.category !== categoryFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const loc = getLocalizedParcelText(p, language);
      const matchTitle = p.title.toLowerCase().includes(q) || (p.titleEn && p.titleEn.toLowerCase().includes(q)) || loc.title.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q) || (p.descriptionEn && p.descriptionEn.toLowerCase().includes(q)) || loc.description.toLowerCase().includes(q);
      const matchPickup = p.pickupLocation.toLowerCase().includes(q);
      const matchDrop = p.dropoffLocation.toLowerCase().includes(q);
      const matchSender = p.senderName.toLowerCase().includes(q) || (p.senderNameEn && p.senderNameEn.toLowerCase().includes(q)) || loc.senderName.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchPickup && !matchDrop && !matchSender) return false;
    }

    return true;
  });

  const handleAccept = (parcel: any) => {
    // Automatically switch to commuter role so they can handle the mission
    if (user.role !== 'commuter') {
      switchRole('commuter');
    }
    acceptParcel(parcel.id);
    setAcceptedModalParcel(parcel);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-24 pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Banner */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link 
            href="/dashboard" 
            className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-emerald-600 transition mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'BN' ? 'ড্যাশবোর্ডে ফিরে যান' : 'Back to Dashboard'}</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'BN' ? 'আপনার রুটের এভেলেবল পার্সেলসমূহ' : 'Available Parcels on Your Route'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {language === 'BN' 
              ? 'মেট্রোরেল বা বাসে যাওয়ার পথে ছোট পার্সেল নিয়ে এক ক্লিকেই ভাড়া উসুল করুন।' 
              : 'Pick up small bag-sized parcels along your commute and recover your travel fare.'}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/new-request"
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-500/20 transition flex items-center space-x-1.5"
          >
            <span>{language === 'BN' ? 'পার্সেল পাঠাতে চান? পোস্ট করুন' : 'Need to send? Post Parcel'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Filter Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-8 space-y-4">
        <div className="flex items-center space-x-2 text-slate-800 text-xs font-bold uppercase tracking-wider">
          <Filter className="w-4 h-4 text-emerald-600" />
          <span>{language === 'BN' ? 'রুট ও ক্যাটাগরি ফিল্টার' : 'Filter Routes & Categories'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Pickup filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              {language === 'BN' ? 'পিকআপ স্টেশন (From)' : 'Pickup Station'}
            </label>
            <select
              value={pickupFilter}
              onChange={(e) => setPickupFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {dhakaStations.map(st => (
                <option key={`pick-${st}`} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Dropoff filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              {language === 'BN' ? 'গন্তব্য স্টেশন (To)' : 'Destination Station'}
            </label>
            <select
              value={dropoffFilter}
              onChange={(e) => setDropoffFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {dhakaStations.map(st => (
                <option key={`drop-${st}`} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Category filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              {language === 'BN' ? 'পণ্য ক্যাটাগরি' : 'Category'}
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 capitalize"
            >
              <option value="all">{language === 'BN' ? 'সকল ক্যাটাগরি' : 'All Categories'}</option>
              <option value="clothing">{language === 'BN' ? 'পোশাক (Clothing)' : 'Clothing'}</option>
              <option value="food">{language === 'BN' ? 'খাবার (Food)' : 'Food'}</option>
              <option value="documents">{language === 'BN' ? 'ডকুমেন্টস (Documents)' : 'Documents'}</option>
              <option value="electronics">{language === 'BN' ? 'ইলেকট্রনিক্স (Electronics)' : 'Electronics'}</option>
              <option value="other">{language === 'BN' ? 'অন্যান্য (Other)' : 'Other'}</option>
            </select>
          </div>

          {/* Search box */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              {language === 'BN' ? 'সার্চ করুন' : 'Search Keywords'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'BN' ? 'ডকুমেন্টস, ফোন, পোশাক...' : 'Search items...'}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-slate-600">
          {availableParcels.length} {language === 'BN' ? 'টি পার্সেল বহনযোগ্য রয়েছে' : 'parcels available'}
        </span>
        {(pickupFilter !== 'All Stations' || dropoffFilter !== 'All Stations' || categoryFilter !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setPickupFilter('All Stations');
              setDropoffFilter('All Stations');
              setCategoryFilter('all');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-emerald-600 hover:underline"
          >
            {language === 'BN' ? 'ফিল্টার রিসেট করুন' : 'Reset Filters'}
          </button>
        )}
      </div>

      {/* Parcels Grid */}
      {availableParcels.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            {language === 'BN' ? 'এই রুটে বর্তমানে কোনো পার্সেল নেই' : 'No parcels found for this route'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {language === 'BN' ? 'অন্য কোনো স্টেশন সিলেক্ট করুন বা ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।' : 'Try changing your station filters.'}
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableParcels.map((parcel) => {
            const loc = getLocalizedParcelText(parcel, language);
            return (
              <div
                key={parcel.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all p-6 flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full capitalize">
                      {loc.category}
                    </span>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-semibold">
                        {language === 'BN' ? 'আপনার ইনকাম' : 'Your Earnings'}
                      </span>
                      <span className="text-2xl font-black text-emerald-600">৳ {parcel.payoutBDT}</span>
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <div>
                    <h3 className="text-base font-black text-slate-900 group-hover:text-emerald-600 transition">
                      {loc.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {loc.description}
                    </p>
                  </div>

                  {/* Route */}
                  <div className="space-y-2 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 text-xs">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold uppercase">
                          {language === 'BN' ? 'পিকআপ (Pickup)' : 'PICKUP'}
                        </span>
                        <span className="font-bold text-slate-800">{parcel.pickupLocation}</span>
                      </div>
                    </div>
                    <div className="border-l-2 border-dashed border-slate-300 ml-1 h-3" />
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold uppercase">
                          {language === 'BN' ? 'ড্রপঅফ (Dropoff)' : 'DROPOFF'}
                        </span>
                        <span className="font-bold text-slate-800">{parcel.dropoffLocation}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sender Trust & Safety */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-[10px]">
                        {loc.senderInitial}
                      </div>
                      <div>
                        <span className="font-bold text-slate-700 block text-[11px]">{loc.senderName}</span>
                        <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5 inline" /> Porichoy NID Verified
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-400 font-medium">
                      {loc.weight}
                    </span>
                  </div>

                </div>

                {/* Accept Button */}
                <button
                  onClick={() => handleAccept(parcel)}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center space-x-2"
                >
                  <span>{language === 'BN' ? 'ডেলিভারি গ্রহণ করুন (Accept Gig)' : 'Accept Delivery Gig'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>
            );
          })}
        </div>
      )}

      {/* ACCEPTED SUCCESS MODAL */}
      {acceptedModalParcel && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-center space-y-5 animate-in zoom-in-95">
            
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
                {language === 'BN' ? 'ডেলিভারি সফলভাবে গৃহীত হয়েছে!' : 'Delivery Accepted!'}
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                {acceptedModalParcel.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {acceptedModalParcel.pickupLocation} ➔ {acceptedModalParcel.dropoffLocation}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2">
              <p className="font-bold text-slate-700">পরবর্তী পদক্ষেপ (Next Steps):</p>
              <ul className="space-y-1.5 text-slate-600 text-[11px]">
                <li>১. পিকআপ স্টেশনের গেটে প্রেরকের সাথে দেখা করুন।</li>
                <li>২. পার্সেলটি স্বচক্ষে দেখে ইনস্পেকশন সম্পন্ন করুন।</li>
                <li>৩. প্রেরকের কাছ থেকে ৪-সংখ্যার পিকআপ OTP নিয়ে ইনপুট দিন।</li>
              </ul>
            </div>

            <button
              onClick={() => router.push('/dashboard')}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition"
            >
              {language === 'BN' ? 'মিশন কন্ট্রোল ও ইনস্পেকশন পেজে যান' : 'Go to Mission Control & Inspect'}
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
