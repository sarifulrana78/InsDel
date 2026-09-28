"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldCheck, 
  Wallet, 
  PlusCircle, 
  Search, 
  LayoutDashboard, 
  Menu, 
  X, 
  ArrowRightLeft,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, user, switchRole, topupWallet } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [topupAmount, setTopupAmount] = useState('200');

  const navLinks = [
    { 
      href: '/dashboard', 
      label: language === 'BN' ? 'ড্যাশবোর্ড' : 'Dashboard', 
      icon: LayoutDashboard 
    },
    { 
      href: '/find-parcels', 
      label: language === 'BN' ? 'পার্সেল খুঁজুন' : 'Find Parcels', 
      icon: Search 
    },
    { 
      href: '/new-request', 
      label: language === 'BN' ? 'পার্সেল পাঠান' : 'Post Parcel', 
      icon: PlusCircle 
    },
    { 
      href: '/#safety', 
      label: language === 'BN' ? 'নিরাপত্তা' : 'Safety', 
      icon: ShieldCheck 
    }
  ];

  const handleTopup = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(topupAmount, 10);
    if (val > 0) {
      topupWallet(val);
      setIsWalletModalOpen(false);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center font-black text-white text-2xl shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                  উ
                </div>
                <div>
                  <span className="text-2xl font-black text-slate-900 tracking-tight block leading-none">
                    Ushol Mama
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 tracking-wider uppercase block mt-1">
                    {language === 'BN' ? 'কমিউটার ক্রাউড-শিপিং' : 'Commuter Logistics'}
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Actions: Role Toggle, Wallet, Language & Profile */}
            <div className="hidden md:flex items-center space-x-3">
              
              {/* Role Switcher Pill */}
              <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200/80">
                <button
                  onClick={() => switchRole('sender')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    user.role === 'sender'
                      ? 'bg-white text-emerald-700 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Switch to Sender view"
                >
                  <span>📦</span>
                  <span>{language === 'BN' ? 'প্রেরক' : 'Sender'}</span>
                </button>
                <button
                  onClick={() => switchRole('commuter')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    user.role === 'commuter'
                      ? 'bg-white text-emerald-700 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Switch to Commuter / Earner view"
                >
                  <span>🎒</span>
                  <span>{language === 'BN' ? 'যাত্রী' : 'Commuter'}</span>
                </button>
              </div>

              {/* Wallet Pill */}
              <button
                onClick={() => setIsWalletModalOpen(true)}
                className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100/80 transition-all text-xs font-black"
                title="View Wallet Balance & Add Money"
              >
                <Wallet className="w-4 h-4 text-emerald-600" />
                <span>৳ {user.walletBalance}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </button>

              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'BN' ? 'EN' : 'BN')}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
              >
                {language === 'BN' ? 'EN' : 'বাংলা'}
              </button>

              {/* Verified Profile Badge */}
              <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-sm ring-2 ring-emerald-500/30">
                    {user.name.slice(0, 1)}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-2 ring-white" title="NID Porichoy Verified">
                    <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-800 leading-tight flex items-center gap-1">
                    <span>{user.name}</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3 inline" />
                    <span>NID ভেরিফাইড</span>
                  </span>
                </div>
              </div>

            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 md:hidden">
              <button
                onClick={() => setIsWalletModalOpen(true)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black"
              >
                <Wallet className="w-3.5 h-3.5 text-emerald-600" />
                <span>৳{user.walletBalance}</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
            
            {/* Role switch in mobile */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100">
              <span className="text-xs font-bold text-slate-600">{language === 'BN' ? 'বর্তমান মোড:' : 'Current Role:'}</span>
              <div className="flex space-x-1">
                <button
                  onClick={() => { switchRole('sender'); setMobileMenuOpen(false); }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    user.role === 'sender' ? 'bg-emerald-600 text-white' : 'text-slate-600'
                  }`}
                >
                  📦 {language === 'BN' ? 'প্রেরক' : 'Sender'}
                </button>
                <button
                  onClick={() => { switchRole('commuter'); setMobileMenuOpen(false); }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    user.role === 'commuter' ? 'bg-emerald-600 text-white' : 'text-slate-600'
                  }`}
                >
                  🎒 {language === 'BN' ? 'যাত্রী' : 'Commuter'}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 text-emerald-600" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                  {user.name.slice(0, 1)}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">{user.name}</p>
                  <p className="text-[10px] text-emerald-600 font-medium">Porichoy NID Verified</p>
                </div>
              </div>
              <button
                onClick={() => setLanguage(language === 'BN' ? 'EN' : 'BN')}
                className="px-3 py-1 rounded-lg border border-slate-200 text-xs font-bold text-slate-700"
              >
                {language === 'BN' ? 'English' : 'বাংলা'}
              </button>
            </div>

          </div>
        )}
      </nav>

      {/* Wallet Top-up Modal */}
      {isWalletModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsWalletModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {language === 'BN' ? 'উসুল মামা ওয়ালেট' : 'Ushol Mama Wallet'}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'BN' ? 'এসক্রো সুরক্ষিত ব্যালেন্স' : 'Escrow Secured Balance'}
                </p>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mb-4 text-center">
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block mb-1">
                {language === 'BN' ? 'বর্তমান ব্যালেন্স' : 'Available Balance'}
              </span>
              <span className="text-3xl font-black text-emerald-700">৳ {user.walletBalance}</span>
              <span className="block text-[11px] text-emerald-600 font-medium mt-1">
                🔒 {language === 'BN' ? `এসক্রোতে সংরক্ষিত: ৳${user.escrowLockedBalance}` : `Escrow Locked: ৳${user.escrowLockedBalance}`}
              </span>
            </div>

            <form onSubmit={handleTopup} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  {language === 'BN' ? 'রিচার্জ পরিমাণ (bKash/Nagad)' : 'Top-Up Amount (BDT)'}
                </label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {['100', '200', '500'].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTopupAmount(amt)}
                      className={`py-2 text-xs font-bold rounded-xl border transition ${
                        topupAmount === amt
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      +৳{amt}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={topupAmount}
                  onChange={(e) => setTopupAmount(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="অন্যান্য পরিমাণ..."
                  min="50"
                  required
                />
              </div>

              <div className="text-[11px] text-slate-400 leading-tight">
                {language === 'BN'
                  ? '* টাকা ইনস্ট্যান্ট আপনার উসুল মামা ওয়ালেটে জমা হবে এবং পার্সেল পাঠানোর সময় স্বয়ংক্রিয়ভাবে এসক্রোতে সংরক্ষিত হবে।'
                  : '* Funds will be added instantly to your wallet and protected under automated escrow.'}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition"
              >
                {language === 'BN' ? 'তাৎক্ষণিক রিচার্জ করুন' : 'Instant Top-Up'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
