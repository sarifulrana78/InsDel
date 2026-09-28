"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Package, 
  ArrowLeft, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  KeyRound, 
  QrCode, 
  Calculator,
  Info
} from 'lucide-react';
import { useApp, ParcelItem } from '@/context/AppContext';
import SafetyDeclarationModal from '@/components/SafetyDeclarationModal';
import RecipientQRModal from '@/components/RecipientQRModal';

export default function NewRequestPage() {
  const router = useRouter();
  const { language, user, createParcel } = useApp();

  const dhakaMetroStations = [
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
    'Bashundhara (NSU, IUB)',
    'New Market',
    'Puran Dhaka (Jagannath Uni)'
  ];

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'electronics' as 'electronics' | 'documents' | 'clothing' | 'food' | 'other',
    declaredValueBDT: '1500',
    pickupLocation: 'Uttara North (Metro)',
    dropoffLocation: 'Farmgate (Metro)',
    recipientName: '',
    recipientPhone: '',
    payoutBDT: '90',
    weightConfirmed: true,
    legalDeclarationAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdParcel, setCreatedParcel] = useState<ParcelItem | null>(null);
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  // Auto calculate suggested fare when stations change
  const handleStationChange = (field: 'pickupLocation' | 'dropoffLocation', value: string) => {
    setFormData(prev => {
      const pickup = field === 'pickupLocation' ? value : prev.pickupLocation;
      const dropoff = field === 'dropoffLocation' ? value : prev.dropoffLocation;
      
      const distanceFactor = Math.abs(pickup.length - dropoff.length) + 3;
      const calculatedPayout = Math.min(220, Math.max(60, 40 + distanceFactor * 10));
      
      return {
        ...prev,
        [field]: value,
        payoutBDT: calculatedPayout.toString()
      };
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.legalDeclarationAccepted) {
      alert(language === 'BN' ? 'অনুগ্রহ করে আইনি ঘোষণাপত্রে সম্মতি দিন।' : 'Please agree to the legal declaration.');
      return;
    }

    setIsSubmitting(true);

    const parcel = createParcel({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      declaredValueBDT: parseInt(formData.declaredValueBDT, 10) || 500,
      payoutBDT: parseInt(formData.payoutBDT, 10) || 80,
      pickupLocation: formData.pickupLocation,
      dropoffLocation: formData.dropoffLocation,
      recipientName: formData.recipientName,
      recipientPhone: formData.recipientPhone,
    });

    setIsSubmitting(false);
    setCreatedParcel(parcel);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-24 pt-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Back button */}
      <div className="mb-6 flex items-center justify-between">
        <Link 
          href="/dashboard" 
          className="inline-flex items-center space-x-2 text-sm font-bold text-slate-600 hover:text-emerald-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'BN' ? 'ড্যাশবোর্ডে ফিরে যান' : 'Back to Dashboard'}</span>
        </Link>

        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          🛡️ ১০০% সুরক্ষিত এসক্রো পেমেন্ট
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
        
        {/* Header */}
        <div className="border-b border-slate-100 pb-6 mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'BN' ? 'কমিউটার ক্রাউড-শিপিং রিকোয়েস্ট' : 'Commuter Crowd-Shipping Request'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'BN' ? 'নতুন পার্সেল পাঠানোর আবেদন' : 'Post a New Delivery Request'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {language === 'BN' 
              ? 'তথ্যগুলো পূরণ করুন। আপনার রুটের যেকোনো মেট্রো বা বাস যাত্রী পার্সেলটি বহন করে পৌঁছে দেবেন।' 
              : 'Fill in details. A commuter traveling your route will accept and deliver it.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Route Selection */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">১</span>
              <span>{language === 'BN' ? 'যাতায়াতের রুট ও স্টেশন' : 'Route & Stations'}</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {language === 'BN' ? 'পিকআপ স্টেশন (Pickup Station)' : 'Pickup Station'}
                </label>
                <select
                  value={formData.pickupLocation}
                  onChange={(e) => handleStationChange('pickupLocation', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                >
                  {dhakaMetroStations.map(st => (
                    <option key={`from-${st}`} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {language === 'BN' ? 'ড্রপঅফ স্টেশন (Dropoff Station)' : 'Dropoff Station'}
                </label>
                <select
                  value={formData.dropoffLocation}
                  onChange={(e) => handleStationChange('dropoffLocation', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                >
                  {dhakaMetroStations.map(st => (
                    <option key={`to-${st}`} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Parcel Information */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">২</span>
              <span>{language === 'BN' ? 'পার্সেলের বিবরণ' : 'Parcel Details'}</span>
            </h3>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {language === 'BN' ? 'পার্সেল শিরোনাম' : 'Parcel Title'}
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder={language === 'BN' ? 'যেমন: জরুরি আইনি ফাইল বা ব্যবহৃত ফোন' : 'e.g. Legal papers or Phone'}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {language === 'BN' ? 'ক্যাটাগরি' : 'Category'}
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none capitalize"
                >
                  <option value="electronics">Electronics (ইলেকট্রনিক্স)</option>
                  <option value="documents">Documents (ডকুমেন্টস)</option>
                  <option value="clothing">Clothing (পোশাক)</option>
                  <option value="food">Food/Tiffin (খাবার/টিফিন)</option>
                  <option value="other">Other (অন্যান্য)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {language === 'BN' ? 'আইটেমের বিস্তারিত বর্ণনা (স্বচ্ছ বা খোলা প্যাকেজিংয়ের ধরন)' : 'Detailed Description'}
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder={language === 'BN' ? 'প্যাকেটের ভেতরের জিনিস স্পষ্টভাবে উল্লেখ করুন...' : 'Specify contents clearly...'}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-normal text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span>{language === 'BN' ? 'ঘোষিত মূল্য (Declared Value BDT)' : 'Declared Value (BDT)'}</span>
                  <span className="text-[10px] text-amber-600 font-bold">সর্বোচ্চ ৳৩,০০০ কভারেজ</span>
                </label>
                <input
                  type="number"
                  name="declaredValueBDT"
                  value={formData.declaredValueBDT}
                  onChange={handleChange}
                  max="3000"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span>{language === 'BN' ? 'কমিউটার অফার ফি / ভাড়া (Payout BDT)' : 'Commuter Fare Payout'}</span>
                  <span className="text-[10px] text-emerald-600 font-bold">অটো-ক্যালকুলেটেড</span>
                </label>
                <input
                  type="number"
                  name="payoutBDT"
                  value={formData.payoutBDT}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-black text-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>
            </div>

          </div>

          {/* Section 3: Recipient Details */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">৩</span>
              <span>{language === 'BN' ? 'প্রাপকের তথ্য' : 'Recipient Contact Details'}</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {language === 'BN' ? 'প্রাপকের নাম (Recipient Name)' : 'Recipient Full Name'}
                </label>
                <input
                  type="text"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                  placeholder="e.g. তানজিলা হক"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {language === 'BN' ? 'প্রাপকের মোবাইল নম্বর (SMS ও ডেলিভারি ওটিপি যাবে)' : 'Recipient Mobile Number'}
                </label>
                <input
                  type="tel"
                  name="recipientPhone"
                  value={formData.recipientPhone}
                  onChange={handleChange}
                  placeholder="01XXXXXXXXX"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 4: Safety Declarations */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            
            <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4 flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
              <div className="text-xs text-emerald-900 leading-relaxed">
                <span className="font-bold block mb-1">
                  {language === 'BN' ? 'উসুল মামা সেফটি ও স্বচ্ছ প্যাকেজিং গ্যারান্টি:' : 'Safety & Inspection Protocol:'}
                </span>
                {language === 'BN'
                  ? 'পার্সেলটি সিলগালা বা অস্বচ্ছ রাখা যাবে না। স্টেশনে হ্যান্ডওভারের সময় যাত্রী নিজ চোখে পণ্যটি দেখে ইনস্পেকশন সম্পন্ন করার পরেই পিকআপ গ্রহণ করবেন।'
                  : 'The parcel must be unsealed or transparent. The commuter will visually inspect the contents before verifying pickup.'}
              </div>
            </div>

            {/* Checkbox 1: Weight limit */}
            <label className="flex items-start space-x-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
              <input
                type="checkbox"
                name="weightConfirmed"
                checked={formData.weightConfirmed}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                required
              />
              <span className="text-xs font-semibold text-slate-700 leading-relaxed">
                {language === 'BN' 
                  ? 'পার্সেলটির ওজন ২.০ কেজির কম এবং এটি মেট্রো বা পাবলিক বাসে ব্যাগে বহন উপযোগী।' 
                  : 'Parcel weight is under 2.0 kg and compliant with handbag / Metro travel.'}
              </span>
            </label>

            {/* Checkbox 2: Legal oath */}
            <label className="flex items-start space-x-3 p-3.5 rounded-xl border-2 border-emerald-500/50 bg-emerald-50/30 hover:bg-emerald-50/50 cursor-pointer transition">
              <input
                type="checkbox"
                name="legalDeclarationAccepted"
                checked={formData.legalDeclarationAccepted}
                onChange={handleChange}
                className="mt-1 w-5 h-5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                required
              />
              <div className="text-xs font-semibold text-slate-800 leading-relaxed">
                {language === 'BN' 
                  ? 'আমি শপথ করছি যে এই পার্সেলে কোনো মাদক, আগ্নেয়াস্ত্র, নগদ টাকা বা নিষিদ্ধ পণ্য নেই। মিথ্যা ঘোষণা দিলে বাংলাদেশ আইন অনুযায়ী আমার NID ও ডিজিটাল লগ পুলিশে দেওয়া হবে।' 
                  : 'I declare that this parcel does not contain any narcotics, weapons, cash, or contraband. False declarations are subject to prosecution under BD Law.'}
                <button
                  type="button"
                  onClick={() => setIsSafetyModalOpen(true)}
                  className="text-emerald-700 underline ml-2 font-bold hover:text-emerald-800 inline-block"
                >
                  {language === 'BN' ? 'নিষিদ্ধ পণ্যের পূর্ণ তালিকা দেখুন' : 'View Prohibited List'}
                </button>
              </div>
            </label>

          </div>

          {/* Submit CTA */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting || !formData.legalDeclarationAccepted}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-base rounded-2xl shadow-lg shadow-emerald-500/20 transition flex items-center justify-center space-x-2"
            >
              <Package className="w-5 h-5" />
              <span>
                {isSubmitting 
                  ? (language === 'BN' ? 'পোস্ট করা হচ্ছে...' : 'Posting...') 
                  : (language === 'BN' ? `পার্সেল পোস্ট করুন (এসক্রো চার্জ: ৳${formData.payoutBDT})` : `Post Delivery Request (Escrow: ৳${formData.payoutBDT})`)}
              </span>
            </button>
          </div>

        </form>

      </div>

      {/* PROHIBITED ITEMS MODAL */}
      <SafetyDeclarationModal
        isOpen={isSafetyModalOpen}
        onClose={() => setIsSafetyModalOpen(false)}
        onAccept={() => {
          setFormData(prev => ({ ...prev, legalDeclarationAccepted: true }));
          setIsSafetyModalOpen(false);
        }}
        language={language}
      />

      {/* SUCCESS CREATED MODAL */}
      {createdParcel && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-center space-y-5 animate-in zoom-in-95">
            
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
                {language === 'BN' ? 'সফলভাবে পোস্ট করা হয়েছে!' : 'Request Posted Successfully!'}
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                {createdParcel.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                ID: {createdParcel.id} • {createdParcel.pickupLocation} ➔ {createdParcel.dropoffLocation}
              </p>
            </div>

            {/* Secret Codes Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    {language === 'BN' ? 'পিকআপ ওটিপি (কমিউটারকে দিন)' : 'Pickup OTP (For Commuter)'}
                  </span>
                  <span className="text-2xl font-black text-emerald-600 tracking-wider">
                    {createdParcel.pickupOTP}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    {language === 'BN' ? 'ডেলিভারি ওটিপি (প্রাপককে দিন)' : 'Dropoff OTP (For Recipient)'}
                  </span>
                  <span className="text-2xl font-black text-cyan-600 tracking-wider">
                    {createdParcel.dropoffOTP}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-xs text-slate-600 font-semibold">
                  {language === 'BN' ? 'ডেলিভারি QR কোড:' : 'Delivery QR Code:'}
                </span>
                <button
                  type="button"
                  onClick={() => setShowQRModal(true)}
                  className="px-3 py-1 bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 text-xs font-bold rounded-lg transition flex items-center space-x-1"
                >
                  <QrCode className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === 'BN' ? 'QR কোড দেখুন' : 'View QR'}</span>
                </button>
              </div>
            </div>

            <div className="text-xs text-slate-500 leading-relaxed">
              {language === 'BN'
                ? 'আপনার রুটের যাত্রী পার্সেলটি গ্রহণ করলে আপনাকে জানানো হবে। স্টেশনে দেখা করে পার্সেল ও পিকআপ ওটিপি হস্তান্তর করুন।'
                : 'Commuters on this route can now accept your gig. Hand over the open parcel at the station.'}
            </div>

            <button
              onClick={() => router.push('/dashboard')}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition"
            >
              {language === 'BN' ? 'ড্যাশবোর্ডে ট্র্যাক করুন' : 'Go to Dashboard & Track'}
            </button>

          </div>
        </div>
      )}

      {/* QR MODAL */}
      {showQRModal && createdParcel && (
        <RecipientQRModal
          isOpen={showQRModal}
          onClose={() => setShowQRModal(false)}
          parcelId={createdParcel.id}
          recipientPhone={createdParcel.recipientPhone}
          language={language}
        />
      )}

    </div>
  );
}
