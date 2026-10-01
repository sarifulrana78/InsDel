"use client";

import React, { useState, useEffect, useRef } from 'react';
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
  CheckCircle2, 
  Sparkles,
  Bell,
  ChevronDown,
  Globe,
  ArrowUpRight,
  Zap,
  Lock,
  User,
  Compass,
  CreditCard,
  LogOut,
  ExternalLink,
  Flame,
  Radio
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { AuthModal } from '@/components/AuthModal';
import Logo from '@/components/Logo';

export default function Navbar() {
  const pathname = usePathname();
  const { 
    language, 
    setLanguage, 
    user, 
    switchRole, 
    topupWallet, 
    parcels,
    isAuthModalOpen,
    authModalMode,
    openAuthModal,
    closeAuthModal,
    logout
  } = useApp();

  // Navigation states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [topupAmount, setTopupAmount] = useState('200');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'bKash' | 'Nagad' | 'Upay'>('bKash');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTopTicker, setShowTopTicker] = useState(true);

  // Dropdown click outside listeners
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Active parcels count
  const activeParcelsCount = parcels.filter(
    p => p.status !== 'delivered' && p.status !== 'cancelled'
  ).length;

  // Scroll detection for dynamic glassmorphic elevation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside and Escape key handler for dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsProfileDropdownOpen(false);
        setIsNotificationsOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navLinks = [
    { 
      href: '/dashboard', 
      label: language === 'BN' ? 'ড্যাশবোর্ড' : 'Dashboard', 
      icon: LayoutDashboard,
      badge: null
    },
    { 
      href: '/find-parcels', 
      label: language === 'BN' ? 'পার্সেল খুঁজুন' : 'Find Parcels', 
      icon: Search,
      badge: language === 'BN' ? 'লাইভ' : 'Live'
    },
    { 
      href: '/new-request', 
      label: language === 'BN' ? 'পার্সেল পাঠান' : 'Post Parcel', 
      icon: PlusCircle,
      badge: language === 'BN' ? 'ইনস্ট্যান্ট' : 'Instant'
    },
    { 
      href: '/#safety', 
      label: language === 'BN' ? 'নিরাপত্তা' : 'Safety', 
      icon: ShieldCheck,
      badge: null
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
      {/* Top Metro Network Announcement Bar */}
      {showTopTicker && (
        <aside 
          aria-label={language === 'BN' ? 'মেট্রোরেল ঘোষণা' : 'Metro rail announcement'}
          className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-slate-300 text-[11px] py-1.5 px-4 border-b border-slate-800/80 transition-all duration-300"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2 overflow-hidden whitespace-nowrap">
              <span className="flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] tracking-wider uppercase border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>MRT Line-6</span>
              </span>
              <span className="text-slate-300 font-medium truncate">
                {language === 'BN' 
                  ? 'ঢাকা মেট্রোরেল উত্তরা উত্তর ⇄ মতিঝিল সকল ১৬টি স্টেশনে পার্সেল পিকআপ/ড্রপঅফ সম্পূর্ণ সক্রিয়।' 
                  : 'Dhaka Metro Rail (Uttara North ⇄ Motijheel) all 16 stations active for crowd-shipping.'}
              </span>
            </div>

            <div className="hidden sm:flex items-center space-x-4 shrink-0 text-slate-400">
              <span className="flex items-center space-x-1 text-emerald-400 font-medium">
                <Sparkles className="w-3 h-3" />
                <span>{language === 'BN' ? '১০০% এসক্রো সুরক্ষা' : '100% Escrow Shield'}</span>
              </span>
              <button 
                onClick={() => setShowTopTicker(false)}
                className="text-slate-500 hover:text-slate-300 transition text-xs"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Main Glassmorphic Sticky Header - Deep Midnight & Emerald Slate Theme */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/90 backdrop-blur-2xl border-b border-emerald-500/25 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.7)] py-2' 
          : 'bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/90 shadow-[0_8px_30px_rgba(0,0,0,0.5)] py-3'
      }`}>
        {/* Subtle Ambient Emerald Horizon Glow */}
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/35 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-14 sm:h-16">
            
            {/* 1. Logo & Brand identity */}
            <div className="flex items-center space-x-3">
              <Logo theme="dark" size="md" />
            </div>

            {/* 2. Desktop Navigation Center Pill */}
            <div className="hidden lg:flex items-center bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-inner ring-1 ring-white/5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/35 shadow-sm shadow-emerald-950/50 font-black'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span>{link.label}</span>

                    {/* Badge */}
                    {link.badge && (
                      <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-black uppercase tracking-wider ${
                        isActive 
                          ? 'bg-emerald-500 text-slate-950' 
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* 3. Actions Toolbar: Role Switcher, Wallet, Notifications & Profile OR Login & Register */}
            <div className="hidden md:flex items-center space-x-2.5">
              {user.isLoggedIn ? (
                <>
                  {/* Dynamic Role Switch Capsule */}
                  <div className="bg-slate-900/90 p-1 rounded-2xl flex items-center border border-slate-800 shadow-sm ring-1 ring-white/5" title={language === 'BN' ? 'মোড পরিবর্তন করুন' : 'Toggle between Sender & Commuter view'}>
                    <button
                      onClick={() => switchRole('sender')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                        user.role === 'sender'
                          ? 'bg-slate-800 text-emerald-300 shadow-sm ring-1 ring-slate-700 font-black'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="text-sm">📦</span>
                      <span>{language === 'BN' ? 'প্রেরক' : 'Sender'}</span>
                    </button>
                    <button
                      onClick={() => switchRole('commuter')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                        user.role === 'commuter'
                          ? 'bg-slate-800 text-emerald-300 shadow-sm ring-1 ring-slate-700 font-black'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="text-sm">🎒</span>
                      <span>{language === 'BN' ? 'যাত্রী' : 'Commuter'}</span>
                    </button>
                  </div>

                  {/* Wallet Glass Pill */}
                  <button
                    onClick={() => setIsWalletModalOpen(true)}
                    className="group flex items-center space-x-2 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-emerald-950/60 border border-emerald-500/30 hover:border-emerald-400 text-emerald-300 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/15 cursor-pointer ring-1 ring-white/5"
                    title={language === 'BN' ? 'ওয়ালেট ব্যালেন্স দেখুন ও রিচার্জ করুন' : 'View wallet balance & instant topup'}
                  >
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <Wallet className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left leading-tight">
                      <span className="text-[10px] text-emerald-400/80 font-bold block uppercase tracking-wider">
                        {language === 'BN' ? 'ওয়ালেট' : 'Wallet'}
                      </span>
                      <span className="text-xs font-black text-white">
                        ৳{user.walletBalance}
                      </span>
                    </div>
                    {user.escrowLockedBalance > 0 && (
                      <span className="ml-1 px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 font-extrabold text-[9px] flex items-center space-x-0.5" title={`৳${user.escrowLockedBalance} in escrow hold`}>
                        <Lock className="w-2.5 h-2.5" />
                        <span>৳{user.escrowLockedBalance}</span>
                      </span>
                    )}
                  </button>

                  {/* Notification Bell Dropdown */}
                  <div className="relative" ref={notifRef}>
                    <button
                      onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                      aria-haspopup="dialog"
                      aria-expanded={isNotificationsOpen}
                      aria-label={language === 'BN' ? 'নোটিফিকেশন প্যানেল' : 'Notifications panel'}
                      className="relative p-2 rounded-2xl border border-slate-800 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer ring-1 ring-white/5"
                      title={language === 'BN' ? 'নোটিফিকেশন' : 'Notifications'}
                    >
                      <Bell className="w-4 h-4" />
                      {activeParcelsCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-black text-[9px] flex items-center justify-center ring-2 ring-slate-950">
                          {activeParcelsCount}
                        </span>
                      )}
                    </button>

                    {/* Notifications Flyout */}
                    {isNotificationsOpen && (
                      <div className="absolute right-0 mt-2 w-80 bg-slate-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-800 p-4 z-50 animate-in fade-in slide-in-from-top-2 text-slate-200 ring-1 ring-white/10">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                          <div className="flex items-center space-x-2">
                            <Bell className="w-4 h-4 text-emerald-400" />
                            <h4 className="text-xs font-bold text-white">
                              {language === 'BN' ? 'লাইভ পার্সেল অ্যালার্ট' : 'Live Parcel Alerts'}
                            </h4>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {activeParcelsCount} {language === 'BN' ? 'সক্রিয়' : 'Active'}
                          </span>
                        </div>

                        <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                          {parcels.slice(0, 3).map((p) => (
                            <Link
                              key={p.id}
                              href="/dashboard"
                              onClick={() => setIsNotificationsOpen(false)}
                              className="block p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition group"
                            >
                              <div className="flex items-center justify-between text-[11px] font-bold text-slate-200 mb-1">
                                <span className="truncate max-w-[170px]">{p.title}</span>
                                <span className="text-emerald-400 font-black">৳{p.payoutBDT}</span>
                              </div>
                              <div className="flex items-center justify-between text-[10px] text-slate-400">
                                <span>{p.pickupLocation.split(' ')[0]} ➔ {p.dropoffLocation.split(' ')[0]}</span>
                                <span className="font-semibold text-slate-300 capitalize">{p.status}</span>
                              </div>
                            </Link>
                          ))}
                        </div>

                        <div className="pt-3 border-t border-slate-800 mt-3 text-center">
                          <Link
                            href="/dashboard"
                            onClick={() => setIsNotificationsOpen(false)}
                            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center justify-center space-x-1"
                          >
                            <span>{language === 'BN' ? 'সব দেখুন ড্যাশবোর্ডে' : 'View all in Dashboard'}</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Language Switcher Capsule */}
                  <button
                    onClick={() => setLanguage(language === 'BN' ? 'EN' : 'BN')}
                    className="flex items-center space-x-1 px-2.5 py-1.5 rounded-2xl border border-slate-800 bg-slate-900/90 hover:bg-slate-800 text-xs font-bold text-slate-200 hover:text-white transition cursor-pointer ring-1 ring-white/5"
                    title={language === 'BN' ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}
                  >
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    <span>{language === 'BN' ? 'EN' : 'বাংলা'}</span>
                  </button>

                  {/* Profile Card & Dropdown */}
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                      aria-haspopup="menu"
                      aria-expanded={isProfileDropdownOpen}
                      aria-label={language === 'BN' ? 'ইউজার প্রোফাইল মেনু' : 'User profile menu'}
                      className="flex items-center space-x-2 pl-1.5 pr-2.5 py-1 rounded-2xl border border-slate-800 hover:border-slate-700 bg-slate-900/90 transition cursor-pointer group ring-1 ring-white/5"
                    >
                      <div className="relative">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-black flex items-center justify-center text-xs shadow-sm">
                          {user.name.slice(0, 1)}
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-2 ring-slate-950">
                          <CheckCircle2 className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      </div>
                      <div className="text-left hidden xl:block">
                        <p className="text-xs font-bold text-slate-200 leading-tight group-hover:text-emerald-400 transition">
                          {user.name}
                        </p>
                        <p className="text-[10px] text-emerald-400 font-semibold leading-none mt-0.5">
                          ★ {user.rating} ({user.totalTrips})
                        </p>
                      </div>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200 transition" />
                    </button>

                    {/* Profile Flyout Dropdown */}
                    {isProfileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-800 p-4 z-50 animate-in fade-in slide-in-from-top-2 ring-1 ring-white/10 text-slate-200">
                        
                        {/* Header info */}
                        <div className="flex items-center space-x-3 pb-3 border-b border-slate-800 mb-3">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-md shadow-emerald-500/20">
                            {user.name.slice(0, 1)}
                          </div>
                          <div className="overflow-hidden">
                            <h4 className="text-xs font-bold text-white truncate">{user.name}</h4>
                            <p className="text-[11px] text-slate-400 truncate">{user.phone || user.email}</p>
                            <span className="inline-flex items-center space-x-1 text-[10px] text-emerald-400 font-bold mt-0.5">
                              <ShieldCheck className="w-3 h-3" />
                              <span>Porichoy NID Verified</span>
                            </span>
                          </div>
                        </div>

                        {/* Stats pills */}
                        <div className="grid grid-cols-2 gap-2 mb-3 text-center">
                          <div className="p-2 bg-slate-800/60 rounded-xl border border-slate-700/60">
                            <span className="text-slate-400 text-[10px] block font-medium">{language === 'BN' ? 'রেটিং' : 'Rating'}</span>
                            <span className="text-xs font-black text-white">★ {user.rating}</span>
                          </div>
                          <div className="p-2 bg-slate-800/60 rounded-xl border border-slate-700/60">
                            <span className="text-slate-400 text-[10px] block font-medium">{language === 'BN' ? 'মোট ট্রিপ' : 'Total Trips'}</span>
                            <span className="text-xs font-black text-white">{user.totalTrips}</span>
                          </div>
                        </div>

                        {/* Dropdown Links */}
                        <div className="space-y-1 text-xs font-bold text-slate-300">
                          <Link
                            href="/dashboard"
                            onClick={() => setIsProfileDropdownOpen(false)}
                            className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-slate-800 hover:text-emerald-400 transition"
                          >
                            <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                            <span>{language === 'BN' ? 'মিশন কন্ট্রোল ও ড্যাশবোর্ড' : 'Mission Control Dashboard'}</span>
                          </Link>

                          <button
                            onClick={() => { setIsProfileDropdownOpen(false); setIsWalletModalOpen(true); }}
                            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-800 hover:text-emerald-400 transition text-left cursor-pointer"
                          >
                            <span className="flex items-center space-x-2.5">
                              <Wallet className="w-4 h-4 text-emerald-400" />
                              <span>{language === 'BN' ? 'ওয়ালেট রিচার্জ করুন' : 'Top-Up Wallet'}</span>
                            </span>
                            <span className="text-emerald-400 font-black">৳{user.walletBalance}</span>
                          </button>

                          <button
                            onClick={() => { setIsProfileDropdownOpen(false); openAuthModal('login'); }}
                            className="w-full flex items-center space-x-2.5 p-2 rounded-xl hover:bg-slate-800 hover:text-emerald-400 transition text-left cursor-pointer"
                          >
                            <User className="w-4 h-4 text-emerald-400" />
                            <span>{language === 'BN' ? 'অন্য অ্যাকাউন্টে লগইন' : 'Switch Account'}</span>
                          </button>

                          <Link
                            href="/#safety"
                            onClick={() => setIsProfileDropdownOpen(false)}
                            className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-slate-800 hover:text-emerald-400 transition"
                          >
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            <span>{language === 'BN' ? 'সেফটি ও আইনি গাইডলাইন' : 'Safety & Legal Guidelines'}</span>
                          </Link>

                          {/* Log Out Button */}
                          <button
                            onClick={() => { setIsProfileDropdownOpen(false); logout(); }}
                            className="w-full flex items-center space-x-2.5 p-2 rounded-xl hover:bg-rose-950/40 text-rose-400 hover:text-rose-300 transition text-left cursor-pointer mt-1 pt-2 border-t border-slate-800 font-bold"
                          >
                            <LogOut className="w-4 h-4 text-rose-500" />
                            <span>{language === 'BN' ? 'লগআউট করুন' : 'Log Out'}</span>
                          </button>
                        </div>

                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Logged-out Toolbar */}
                  <button
                    onClick={() => setLanguage(language === 'BN' ? 'EN' : 'BN')}
                    className="flex items-center space-x-1 px-3 py-2 rounded-2xl border border-slate-800 bg-slate-900/90 hover:bg-slate-800 text-xs font-bold text-slate-200 hover:text-white transition cursor-pointer ring-1 ring-white/5"
                    title={language === 'BN' ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}
                  >
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    <span>{language === 'BN' ? 'EN' : 'বাংলা'}</span>
                  </button>

                  <button
                    onClick={() => openAuthModal('login')}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-2xl border border-slate-700/80 hover:border-slate-600 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-bold transition cursor-pointer shadow-sm ring-1 ring-white/5"
                  >
                    <User className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{language === 'BN' ? 'লগইন' : 'Sign In'}</span>
                  </button>

                  <button
                    onClick={() => openAuthModal('signup')}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/25 transition cursor-pointer active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{language === 'BN' ? 'রেজিস্টার' : 'Sign Up'}</span>
                  </button>
                </>
              )}
            </div>

            {/* 4. Mobile Trigger Bar */}
            <div className="flex items-center space-x-2 md:hidden">
              {user.isLoggedIn ? (
                <button
                  onClick={() => setIsWalletModalOpen(true)}
                  className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-black cursor-pointer"
                >
                  <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                  <span>৳{user.walletBalance}</span>
                </button>
              ) : (
                <button
                  onClick={() => openAuthModal('login')}
                  className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-black shadow-sm cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{language === 'BN' ? 'লগইন' : 'Sign In'}</span>
                </button>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-2xl border border-slate-800 text-slate-300 hover:bg-slate-900 transition focus:outline-none cursor-pointer ring-1 ring-white/5"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* 5. Mobile Glass Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800/80 bg-slate-950/98 backdrop-blur-2xl px-4 pt-4 pb-6 space-y-4 animate-in slide-in-from-top-3 text-slate-200">
            
            {user.isLoggedIn ? (
              <>
                {/* Mobile User Banner */}
                <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-sm">
                      {user.name.slice(0, 1)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{user.name}</p>
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Porichoy Verified</span>
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setLanguage(language === 'BN' ? 'EN' : 'BN')}
                    className="px-2.5 py-1 rounded-xl border border-slate-800 text-xs font-bold text-slate-300 bg-slate-900 hover:bg-slate-800 cursor-pointer"
                  >
                    {language === 'BN' ? 'EN' : 'বাংলা'}
                  </button>
                </div>

                {/* Role switch in mobile */}
                <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-xs font-bold text-slate-400 pl-1">{language === 'BN' ? 'মোড:' : 'Role:'}</span>
                  <div className="flex space-x-1.5">
                    <button
                      onClick={() => { switchRole('sender'); setMobileMenuOpen(false); }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        user.role === 'sender' ? 'bg-emerald-500 text-slate-950 font-black shadow-sm' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      📦 {language === 'BN' ? 'প্রেরক' : 'Sender'}
                    </button>
                    <button
                      onClick={() => { switchRole('commuter'); setMobileMenuOpen(false); }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        user.role === 'commuter' ? 'bg-emerald-500 text-slate-950 font-black shadow-sm' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      🎒 {language === 'BN' ? 'যাত্রী' : 'Commuter'}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Logged Out Mobile Banner */
              <div className="p-4 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/80 rounded-2xl border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-black text-white">
                      {language === 'BN' ? 'উসুল মামায় স্বাগতম' : 'Welcome to Ushol Mama'}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {language === 'BN' ? 'লগইন করে যাতায়াত খরচ উসুল করুন' : 'Sign in to start sending or carrying'}
                    </p>
                  </div>
                  <button
                    onClick={() => setLanguage(language === 'BN' ? 'EN' : 'BN')}
                    className="px-2.5 py-1 rounded-xl border border-slate-800 text-xs font-bold text-slate-300 bg-slate-900 cursor-pointer"
                  >
                    {language === 'BN' ? 'EN' : 'বাংলা'}
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { setMobileMenuOpen(false); openAuthModal('login'); }}
                    className="w-full py-2.5 bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs rounded-xl shadow-sm hover:bg-slate-700 transition cursor-pointer"
                  >
                    {language === 'BN' ? 'লগইন করুন' : 'Log In'}
                  </button>
                  <button
                    onClick={() => { setMobileMenuOpen(false); openAuthModal('signup'); }}
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-sm hover:from-emerald-400 hover:to-teal-300 transition cursor-pointer"
                  >
                    {language === 'BN' ? 'রেজিস্টার' : 'Sign Up'}
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Navigation Links */}
            <div className="space-y-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-emerald-400" />
                      <span>{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Wallet CTA / Logout CTA */}
            {user.isLoggedIn ? (
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => { setMobileMenuOpen(false); setIsWalletModalOpen(true); }}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs rounded-2xl transition flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  <Wallet className="w-4 h-4 text-slate-950" />
                  <span>{language === 'BN' ? 'ওয়ালেট রিচার্জ করুন (৳' + user.walletBalance + ')' : 'Top-Up Wallet (৳' + user.walletBalance + ')'}</span>
                </button>

                <button
                  onClick={() => { setMobileMenuOpen(false); logout(); }}
                  className="w-full py-2.5 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/60 text-rose-300 font-bold text-xs rounded-2xl transition flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-400" />
                  <span>{language === 'BN' ? 'লগআউট করুন' : 'Log Out'}</span>
                </button>
              </div>
            ) : null}

          </div>
        )}
      </header>

      {/* Modern Wallet Top-Up Modal 2.0 */}
      {isWalletModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative border border-slate-100 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsWalletModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/20">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {language === 'BN' ? 'উসুল মামা ওয়ালেট' : 'Ushol Mama Wallet'}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {language === 'BN' ? '১০০% এসক্রো সুরক্ষিত ব্যালেন্স' : '100% Escrow Protected Balance'}
                </p>
              </div>
            </div>

            {/* Current Balance Card */}
            <div className="bg-gradient-to-br from-emerald-50 via-teal-50/60 to-emerald-50 border border-emerald-200/80 rounded-2xl p-4 mb-5 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/10 rounded-full blur-xl pointer-events-none" />
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                {language === 'BN' ? 'ব্যবহারযোগ্য ব্যালেন্স' : 'Available Balance'}
              </span>
              <div className="flex items-baseline justify-center space-x-1">
                <span className="text-3xl font-black text-emerald-700">৳{user.walletBalance}</span>
                <span className="text-xs font-bold text-emerald-600">BDT</span>
              </div>
              {user.escrowLockedBalance > 0 && (
                <div className="mt-2 inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-[10px] font-bold">
                  <Lock className="w-2.5 h-2.5" />
                  <span>{language === 'BN' ? `এসক্রোতে লক: ৳${user.escrowLockedBalance}` : `Locked in Escrow: ৳${user.escrowLockedBalance}`}</span>
                </div>
              )}
            </div>

            {/* Payment Method Selector */}
            <div className="mb-4">
              <label className="block text-[11px] font-bold text-slate-700 mb-2 uppercase tracking-wide">
                {language === 'BN' ? 'পেমেন্ট মেথড নির্বাচন করুন' : 'Select Payment Method'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'bKash', name: 'বিকাশ', color: 'border-pink-500 bg-pink-50 text-pink-700' },
                  { id: 'Nagad', name: 'নগদ', color: 'border-amber-500 bg-amber-50 text-amber-700' },
                  { id: 'Upay', name: 'উপায়', color: 'border-blue-500 bg-blue-50 text-blue-700' }
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedPaymentMethod(m.id as any)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border-2 transition text-center cursor-pointer ${
                      selectedPaymentMethod === m.id
                        ? `${m.color} shadow-sm font-black`
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleTopup} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  {language === 'BN' ? 'রিচার্জের পরিমাণ' : 'Amount (BDT)'}
                </label>
                
                {/* Quick amount chips */}
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {['100', '250', '500'].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTopupAmount(amt)}
                      className={`py-1.5 text-xs font-bold rounded-xl border transition cursor-pointer ${
                        topupAmount === amt
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-black'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      +৳{amt}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">৳</span>
                  <input
                    type="number"
                    value={topupAmount}
                    onChange={(e) => setTopupAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
                    placeholder="অন্য পরিমাণ লিখুন"
                    min="50"
                    required
                  />
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[10px] text-slate-500 leading-tight">
                🔒 {language === 'BN'
                  ? 'অর্থ সরাসরি এসক্রো ভল্টে জমা থাকবে। পার্সেল ডেলিভারি নিশ্চিত না হওয়া পর্যন্ত কারও কাছে যাবে না।'
                  : 'Funds reside in the bank-grade escrow vault until delivery OTP verification.'}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/25 transition active:scale-[0.98] cursor-pointer"
              >
                {language === 'BN' ? `${selectedPaymentMethod} দিয়ে ৳${topupAmount} রিচার্জ করুন` : `Top-up ৳${topupAmount} via ${selectedPaymentMethod}`}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Global Auth Modal for instant access from anywhere */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
        language={language} 
        initialMode={authModalMode} 
      />
    </>
  );
}
