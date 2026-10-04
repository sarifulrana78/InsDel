"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { deriveDisplayNameFromEmail, normalizeGoogleEmail } from '@/utils/authUtils';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: 'sender' | 'commuter';
  isNidVerified: boolean;
  nidNumber: string;
  walletBalance: number;
  escrowLockedBalance: number;
  rating: number;
  totalTrips: number;
  avatar: string;
  isLoggedIn: boolean;
  authProvider?: 'google' | 'manual' | 'demo';
}

export interface ParcelTimelineEvent {
  step: string;
  timestamp: string;
  description: string;
}

export interface ParcelItem {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  category: 'electronics' | 'documents' | 'clothing' | 'food' | 'other';
  declaredValueBDT: number;
  payoutBDT: number;
  pickupLocation: string;
  dropoffLocation: string;
  senderId: string;
  senderName: string;
  senderNameEn?: string;
  senderPhone: string;
  recipientName: string;
  recipientNameEn?: string;
  recipientPhone: string;
  commuterId?: string;
  commuterName?: string;
  commuterNameEn?: string;
  commuterPhone?: string;
  status: 'pending' | 'accepted' | 'picked_up' | 'arrived_at_destination' | 'delivered' | 'cancelled' | 'reported';
  pickupOTP: string;
  dropoffOTP: string;
  inspectionPhotoUrl?: string;
  deliveryProofPhotoUrl?: string;
  createdAt: string;
  weight?: string;
  weightEn?: string;
  timeline: ParcelTimelineEvent[];
}

export interface AppContextType {
  language: 'BN' | 'EN';
  setLanguage: (lang: 'BN' | 'EN') => void;
  user: UserProfile;
  switchRole: (role: 'sender' | 'commuter') => void;
  updateUser: (fields: Partial<UserProfile>) => void;
  topupWallet: (amount: number) => void;
  withdrawWallet: (amount: number) => boolean;
  parcels: ParcelItem[];
  createParcel: (data: Omit<ParcelItem, 'id' | 'senderId' | 'senderName' | 'senderPhone' | 'status' | 'pickupOTP' | 'dropoffOTP' | 'createdAt' | 'timeline'>) => ParcelItem;
  acceptParcel: (parcelId: string) => boolean;
  confirmPickup: (parcelId: string, enteredOTP: string, photoUrl: string) => { success: boolean; message: string };
  arriveAtDestination: (parcelId: string) => { success: boolean; message: string };
  completeDelivery: (parcelId: string, enteredOTP: string, photoUrl: string) => { success: boolean; message: string };
  reportParcel: (parcelId: string, reason: string) => { success: boolean; message: string };
  cancelParcel: (parcelId: string) => boolean;
  getParcelById: (id: string) => ParcelItem | undefined;
  resetDemoData: () => void;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  loginManual: (credentials: { identifier: string; password?: string; role?: 'sender' | 'commuter'; name?: string }) => { success: boolean; message?: string };
  loginWithGoogle: (googleData?: { name?: string; email?: string; avatar?: string; role?: 'sender' | 'commuter' }) => { success: boolean; message?: string };
  registerManual: (data: { name?: string; emailOrPhone: string; password?: string; role?: 'sender' | 'commuter'; nidNumber?: string }) => { success: boolean; message?: string };
  logout: () => void;
}

export const DEMO_USERS = {
  tanvir: {
    id: 'usr_tanvir_01',
    name: 'তানভীর আহমেদ',
    phone: '01712-345678',
    email: 'tanvir.commuter@gmail.com',
    role: 'sender' as const,
    isNidVerified: true,
    nidNumber: '19952692817290123',
    walletBalance: 650,
    escrowLockedBalance: 150,
    rating: 4.95,
    totalTrips: 18,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    isLoggedIn: true,
    authProvider: 'demo' as const
  },
  kamrul: {
    id: 'usr_commuter_88',
    name: 'কামরুল হাসান (মেট্রো যাত্রী)',
    phone: '01911-556677',
    email: 'kamrul.hasan@gmail.com',
    role: 'commuter' as const,
    isNidVerified: true,
    nidNumber: '19882692817290456',
    walletBalance: 1420,
    escrowLockedBalance: 0,
    rating: 5.0,
    totalTrips: 42,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    isLoggedIn: true,
    authProvider: 'demo' as const
  }
};

const DEFAULT_USER: UserProfile = {
  id: '',
  name: 'অতিথি ব্যবহারকারী',
  phone: '',
  email: '',
  role: 'sender',
  isNidVerified: false,
  nidNumber: '',
  walletBalance: 0,
  escrowLockedBalance: 0,
  rating: 5.0,
  totalTrips: 0,
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  isLoggedIn: false,
  authProvider: undefined
};

const INITIAL_PARCELS: ParcelItem[] = [
  {
    id: 'PRC-1001',
    title: 'জরুরি আইনি ডকুমেন্টস (Court Papers)',
    titleEn: 'Urgent Legal Documents (Court Papers)',
    description: 'হাইকোর্টের মামলার মূল কাগজপত্রের ফাইল। কোনো অবস্থাতেই বাঁকানো যাবে না।',
    descriptionEn: 'High Court case documents file. Must not be bent or folded under any circumstances.',
    category: 'documents',
    declaredValueBDT: 500,
    payoutBDT: 90,
    pickupLocation: 'Uttara North (Metro)',
    dropoffLocation: 'Farmgate (Metro)',
    senderId: 'usr_tanvir_01',
    senderName: 'তানভীর আহমেদ',
    senderNameEn: 'Tanvir Ahmed',
    senderPhone: '01712-345678',
    recipientName: 'ব্যারিস্টার জামান',
    recipientNameEn: 'Barrister Zaman',
    recipientPhone: '01819-223344',
    commuterId: 'usr_commuter_88',
    commuterName: 'কামরুল হাসান (মেট্রো যাত্রী)',
    commuterNameEn: 'Kamrul Hasan (Metro Commuter)',
    commuterPhone: '01911-556677',
    status: 'accepted',
    pickupOTP: '4821',
    dropoffOTP: '719203',
    weight: 'ওজন: < ১.০ কেজি',
    weightEn: 'Weight: < 1.0 kg',
    createdAt: 'আজ, সকাল ৯:১৫',
    timeline: [
      { step: 'Order Placed', timestamp: '০৯:১৫ AM', description: 'প্রেরক পার্সেল পোস্ট করেছেন এবং এসক্রো ফান্ড লক করা হয়েছে।' },
      { step: 'Commuter Assigned', timestamp: '০৯:২২ AM', description: 'যাত্রী কামরুল হাসান পার্সেলটি গ্রহণ করেছেন।' }
    ]
  },
  {
    id: 'PRC-1002',
    title: 'ব্যবহৃত আইফোন ১২ (Original Boxed)',
    titleEn: 'Used iPhone 12 (Original Boxed)',
    description: 'আইফোন ১২ ও অরিজিনাল ক্যাবল। খোলা প্যাকেট, ইনস্পেকশন সম্পন্ন যোগ্য।',
    descriptionEn: 'iPhone 12 with original cable. Open box, ready for inspection.',
    category: 'electronics',
    declaredValueBDT: 2800,
    payoutBDT: 150,
    pickupLocation: 'Mirpur 10 (Metro)',
    dropoffLocation: 'Shahbagh (Metro)',
    senderId: 'usr_nadim_02',
    senderName: 'নাদিম চৌধুরী',
    senderNameEn: 'Nadim Chowdhury',
    senderPhone: '01912-334455',
    recipientName: 'আসিফ রায়হান',
    recipientNameEn: 'Asif Raihan',
    recipientPhone: '01511-998877',
    status: 'pending',
    pickupOTP: '6219',
    dropoffOTP: '448291',
    weight: 'ওজন: < ১.০ কেজি',
    weightEn: 'Weight: < 1.0 kg',
    createdAt: 'আজ, সকাল ১০:০৫',
    timeline: [
      { step: 'Order Placed', timestamp: '১০:০৫ AM', description: 'উসুল মামা প্ল্যাটফর্মে পার্সেল পোস্ট করা হয়েছে।' }
    ]
  },
  {
    id: 'PRC-1003',
    title: 'শীতের শাল ও কার্ডিগান গিফট প্যাক',
    titleEn: 'Winter Shawl & Cardigan Gift Pack',
    description: 'হাতে বোনা কাশ্মীরি শাল ও শালীন উপহার সামগ্রী। ওজন ১ কেজি।',
    descriptionEn: 'Handcrafted Kashmiri shawl and elegant gift items. Weight 1 kg.',
    category: 'clothing',
    declaredValueBDT: 1400,
    payoutBDT: 110,
    pickupLocation: 'Agargaon (Metro)',
    dropoffLocation: 'Dhaka University (Metro)',
    senderId: 'usr_farhana_03',
    senderName: 'ফারহানা ইসলাম',
    senderNameEn: 'Farhana Islam',
    senderPhone: '01755-667788',
    recipientName: 'তানজিলা হক (রোকেয়া হল)',
    recipientNameEn: 'Tanjila Haque (Rokeya Hall)',
    recipientPhone: '01622-112233',
    status: 'pending',
    pickupOTP: '3514',
    dropoffOTP: '883912',
    weight: 'ওজন: < ২.০ কেজি',
    weightEn: 'Weight: < 2.0 kg',
    createdAt: 'আজ, সকাল ১০:৪০',
    timeline: [
      { step: 'Order Placed', timestamp: '১০:৪০ AM', description: 'উসুল মামা প্ল্যাটফর্মে পার্সেল পোস্ট করা হয়েছে।' }
    ]
  },
  {
    id: 'PRC-1004',
    title: 'হোমমেড স্পেশাল লাঞ্চ টিফিন বক্স',
    titleEn: 'Homemade Special Lunch Tiffin Box',
    description: 'পরিষ্কার টিফিন ক্যারিয়ার। অফিস টাইমে দুপুরের আগে ডেলিভারি প্রয়োজন।',
    descriptionEn: 'Clean tiffin carrier. Requires prompt delivery before office lunch hour.',
    category: 'food',
    declaredValueBDT: 400,
    payoutBDT: 80,
    pickupLocation: 'Dhanmondi (Dhaka College, ULAB)',
    dropoffLocation: 'Motijheel (Metro)',
    senderId: 'usr_sultana_04',
    senderName: 'সুলতানা জাহান',
    senderNameEn: 'Sultana Jahan',
    senderPhone: '01833-445566',
    recipientName: 'ইকবাল মাহমুদ',
    recipientNameEn: 'Iqbal Mahmud',
    recipientPhone: '01744-556677',
    status: 'pending',
    pickupOTP: '8910',
    dropoffOTP: '239841',
    weight: 'ওজন: < ২.০ কেজি',
    weightEn: 'Weight: < 2.0 kg',
    createdAt: 'আজ, সকাল ১১:১০',
    timeline: [
      { step: 'Order Placed', timestamp: '১১:১০ AM', description: 'উসুল মামা প্ল্যাটফর্মে পার্সেল পোস্ট করা হয়েছে।' }
    ]
  },
  {
    id: 'PRC-1005',
    title: 'প্রেসক্রিপশন মেডিসিন ফাইল (ইনসুলিন ও জরুরি ওষুধ)',
    titleEn: 'Prescription Medicine File (Insulin & Emergency Meds)',
    description: 'ফার্মেসি থেকে ক্রয়কৃত ইনসুলিন কুলপ্যাকসহ। আর্জেন্ট হ্যান্ডওভার আবশ্যক।',
    descriptionEn: 'Insulin purchased from pharmacy with cool pack. Urgent handover required.',
    category: 'other',
    declaredValueBDT: 950,
    payoutBDT: 130,
    pickupLocation: 'Pallabi (Metro)',
    dropoffLocation: 'Secretariat (Metro)',
    senderId: 'usr_doctor_05',
    senderName: 'ডা. রফিকুজ্জামান',
    senderNameEn: 'Dr. Rafiquzzaman',
    senderPhone: '01711-002233',
    recipientName: 'আবুল কালাম আজাদ',
    recipientNameEn: 'Abul Kalam Azad',
    recipientPhone: '01822-445566',
    status: 'pending',
    pickupOTP: '1729',
    dropoffOTP: '601924',
    weight: 'ওজন: < ২.০ কেজি',
    weightEn: 'Weight: < 2.0 kg',
    createdAt: 'আজ, দুপুর ১২:০৫',
    timeline: [
      { step: 'Order Placed', timestamp: '১২:০৫ PM', description: 'উসুল মামা প্ল্যাটফর্মে পার্সেল পোস্ট করা হয়েছে।' }
    ]
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<'BN' | 'EN'>('BN');
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [parcels, setParcels] = useState<ParcelItem[]>(INITIAL_PARCELS);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const storedLang = localStorage.getItem('ushol_lang') as 'BN' | 'EN' | null;
      if (storedLang) setLanguageState(storedLang);

      const storedUser = localStorage.getItem('ushol_user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        // Clear legacy hardcoded demo user if present so it starts clean
        if (parsed.id === 'usr_tanvir_01' && parsed.authProvider === 'demo') {
          setUser(DEFAULT_USER);
          localStorage.removeItem('ushol_user');
        } else {
          setUser(parsed);
        }
      }

      const storedParcels = localStorage.getItem('ushol_parcels');
      if (storedParcels) {
        const parsed: ParcelItem[] = JSON.parse(storedParcels);
        // Merge with initial parcels to ensure localized fields exist
        const enriched = parsed.map(p => {
          const init = INITIAL_PARCELS.find(ip => ip.id === p.id);
          if (init) {
            return {
              ...init,
              ...p,
              titleEn: p.titleEn || init.titleEn,
              descriptionEn: p.descriptionEn || init.descriptionEn,
              senderNameEn: p.senderNameEn || init.senderNameEn,
              recipientNameEn: p.recipientNameEn || init.recipientNameEn,
              commuterNameEn: p.commuterNameEn || init.commuterNameEn,
              weight: p.weight || init.weight,
              weightEn: p.weightEn || init.weightEn
            };
          }
          return p;
        });
        setParcels(enriched);
      } else {
        localStorage.setItem('ushol_parcels', JSON.stringify(INITIAL_PARCELS));
      }
    } catch (e) {
      console.error('Error loading state from localStorage:', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('ushol_lang', language);
    } catch (e) {
      console.error(e);
    }
  }, [language, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('ushol_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  }, [user, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('ushol_parcels', JSON.stringify(parcels));
    } catch (e) {
      console.error(e);
    }
  }, [parcels, isInitialized]);

  const setLanguage = (lang: 'BN' | 'EN') => {
    setLanguageState(lang);
  };

  const switchRole = (role: 'sender' | 'commuter') => {
    setUser(prev => ({ ...prev, role }));
  };

  const updateUser = (fields: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...fields }));
  };

  const topupWallet = (amount: number) => {
    setUser(prev => ({
      ...prev,
      walletBalance: prev.walletBalance + amount
    }));
  };

  const withdrawWallet = (amount: number): boolean => {
    if (user.walletBalance < amount) return false;
    setUser(prev => ({
      ...prev,
      walletBalance: prev.walletBalance - amount
    }));
    return true;
  };

  const createParcel = (data: Omit<ParcelItem, 'id' | 'senderId' | 'senderName' | 'senderPhone' | 'status' | 'pickupOTP' | 'dropoffOTP' | 'createdAt' | 'timeline'>): ParcelItem => {
    const newId = `PRC-${Math.floor(1000 + Math.random() * 9000)}`;
    const pickupOTP = Math.floor(1000 + Math.random() * 9000).toString();
    const dropoffOTP = Math.floor(100000 + Math.random() * 900000).toString();
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newParcel: ParcelItem = {
      ...data,
      id: newId,
      senderId: user.id,
      senderName: user.name,
      senderPhone: user.phone,
      status: 'pending',
      pickupOTP,
      dropoffOTP,
      createdAt: 'এখন মাত্র',
      timeline: [
        {
          step: 'Order Placed',
          timestamp: nowTime,
          description: 'উসুল মামা প্ল্যাটফর্মে পার্সেল সফলভাবে পোস্ট করা হয়েছে।'
        }
      ]
    };

    setParcels(prev => [newParcel, ...prev]);

    // Lock payout in escrow
    setUser(prev => ({
      ...prev,
      escrowLockedBalance: prev.escrowLockedBalance + data.payoutBDT
    }));

    return newParcel;
  };

  const acceptParcel = (parcelId: string): boolean => {
    let updated = false;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setParcels(prev =>
      prev.map(p => {
        if (p.id === parcelId && p.status === 'pending') {
          updated = true;
          return {
            ...p,
            status: 'accepted',
            commuterId: user.id,
            commuterName: user.name,
            commuterPhone: user.phone,
            timeline: [
              ...p.timeline,
              {
                step: 'Trip Accepted',
                timestamp: nowTime,
                description: `${user.name} পার্সেল বহন করতে সম্মত হয়েছেন। স্টেশনে পিকআপের প্রস্তুতি চলছে।`
              }
            ]
          };
        }
        return p;
      })
    );

    return updated;
  };

  const confirmPickup = (parcelId: string, enteredOTP: string, photoUrl: string) => {
    const parcel = parcels.find(p => p.id === parcelId);
    if (!parcel) {
      return { success: false, message: 'পার্সেলটি খুঁজে পাওয়া যায়নি।' };
    }

    if (parcel.pickupOTP.trim() !== enteredOTP.trim()) {
      return { success: false, message: `ভুল পিকআপ OTP! প্রেরকের কাছ থেকে সঠিক ৪-সংখ্যার ওটিপি সংগ্রহ করুন (প্রেরকের ওটিপি: ${parcel.pickupOTP})` };
    }

    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setParcels(prev =>
      prev.map(p => {
        if (p.id === parcelId) {
          return {
            ...p,
            status: 'picked_up',
            inspectionPhotoUrl: photoUrl || p.inspectionPhotoUrl,
            timeline: [
              ...p.timeline,
              {
                step: 'Picked Up & Inspected',
                timestamp: nowTime,
                description: 'কমিউটার কর্তৃক পার্সেল স্বচক্ষে ইনস্পেকশন সম্পন্ন এবং পিকআপ OTP ভেরিফাইড।'
              }
            ]
          };
        }
        return p;
      })
    );

    return { success: true, message: 'পিকআপ ও ইনস্পেকশন সফলভাবে নিশ্চিত করা হয়েছে! পার্সেল এখন অন-ট্রানজিট।' };
  };

  const arriveAtDestination = (parcelId: string) => {
    const parcel = parcels.find(p => p.id === parcelId);
    if (!parcel) {
      return { success: false, message: 'পার্সেলটি খুঁজে পাওয়া যায়নি।' };
    }

    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setParcels(prev =>
      prev.map(p => {
        if (p.id === parcelId) {
          return {
            ...p,
            status: 'arrived_at_destination',
            timeline: [
              ...p.timeline,
              {
                step: 'Arrived at Destination Station',
                timestamp: nowTime,
                description: `কমিউটার গন্তব্য স্টেশন (${p.dropoffLocation})-এ পৌঁছেছেন। প্রাপকের নিকট এসএমএস ও ডেলিভারি ওটিপি পাঠানো হয়েছে।`
              }
            ]
          };
        }
        return p;
      })
    );

    return { success: true, message: 'গন্তব্যে আগমন রেকর্ড করা হয়েছে! প্রাপককে ডেলিভারি ওটিপি ও কিউআর কোড পাঠানো হয়েছে।' };
  };

  const completeDelivery = (parcelId: string, enteredOTP: string, photoUrl: string) => {
    const parcel = parcels.find(p => p.id === parcelId);
    if (!parcel) {
      return { success: false, message: 'পার্সেলটি খুঁজে পাওয়া যায়নি।' };
    }

    // Check OTP or QR match
    const cleanEntered = enteredOTP.trim();
    if (cleanEntered !== parcel.dropoffOTP && !cleanEntered.includes(parcel.id)) {
      return { success: false, message: `ভুল ডেলিভারি OTP! প্রাপকের কাছ থেকে সঠিক ৬-সংখ্যার ওটিপি সংগ্রহ করুন (প্রাপকের ওটিপি: ${parcel.dropoffOTP})` };
    }

    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setParcels(prev =>
      prev.map(p => {
        if (p.id === parcelId) {
          return {
            ...p,
            status: 'delivered',
            deliveryProofPhotoUrl: photoUrl || p.deliveryProofPhotoUrl,
            timeline: [
              ...p.timeline,
              {
                step: 'Delivered & Completed',
                timestamp: nowTime,
                description: 'প্রাপকের ওটিপি ও হ্যান্ডওভার ছবি যাচাই সম্পন্ন। এসক্রো থেকে পেমেন্ট ওয়ালেটে রিলিজ করা হয়েছে।'
              }
            ]
          };
        }
        return p;
      })
    );

    // Release payout to commuter wallet
    setUser(prev => ({
      ...prev,
      walletBalance: prev.walletBalance + parcel.payoutBDT,
      totalTrips: prev.totalTrips + 1,
      escrowLockedBalance: Math.max(0, prev.escrowLockedBalance - parcel.payoutBDT)
    }));

    return { success: true, message: `অভিনন্দন! ডেলিভারি সফলভাবে সম্পন্ন হয়েছে এবং ৳${parcel.payoutBDT} আপনার ওয়ালেটে যোগ হয়েছে!` };
  };

  const reportParcel = (parcelId: string, reason: string) => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setParcels(prev =>
      prev.map(p => {
        if (p.id === parcelId) {
          return {
            ...p,
            status: 'reported',
            timeline: [
              ...p.timeline,
              {
                step: 'Reported / Flagged',
                timestamp: nowTime,
                description: `সন্দেহজনক কার্যকলাপ বা নিরাপত্তা লঙ্ঘনের কারণে পার্সেল রিপোর্ট করা হয়েছে (${reason})। সেফটি ডেস্ক ও ৯৯৯ সরাসরি অ্যালার্টেড।`
              }
            ]
          };
        }
        return p;
      })
    );

    return { success: true, message: 'পার্সেলটি সফলভাবে রিপোর্ট করা হয়েছে। সেফটি টিম ও হেল্পলাইন ৯৯৯-এ তাৎক্ষণিক অ্যালার্ট পাঠানো হয়েছে।' };
  };

  const cancelParcel = (parcelId: string): boolean => {
    let cancelled = false;
    setParcels(prev =>
      prev.map(p => {
        if (p.id === parcelId && (p.status === 'pending' || p.status === 'accepted')) {
          cancelled = true;
          return { ...p, status: 'cancelled' };
        }
        return p;
      })
    );
    return cancelled;
  };

  const loginManual = ({
    identifier,
    password,
    role = 'sender',
    name
  }: {
    identifier: string;
    password?: string;
    role?: 'sender' | 'commuter';
    name?: string;
  }): { success: boolean; message?: string } => {
    const trimmed = identifier.trim().toLowerCase();
    const isEmail = trimmed.includes('@');
    const displayName = name || (isEmail ? deriveDisplayNameFromEmail(trimmed) : trimmed);

    setUser(prev => ({
      ...prev,
      id: 'usr_' + Date.now().toString().slice(-6),
      name: displayName,
      email: isEmail ? trimmed : `${trimmed}@usholmama.com`,
      phone: isEmail ? (prev.phone || '') : trimmed,
      role: role || prev.role || 'sender',
      isLoggedIn: true,
      isNidVerified: true,
      authProvider: 'manual'
    }));

    return { success: true, message: 'Login successful' };
  };

  const loginWithGoogle = (googleData?: {
    name?: string;
    email?: string;
    avatar?: string;
    role?: 'sender' | 'commuter';
  }): { success: boolean; message?: string } => {
    const rawEmail = googleData?.email || 'user@gmail.com';
    const gEmail = normalizeGoogleEmail(rawEmail);
    const gName = googleData?.name || deriveDisplayNameFromEmail(gEmail);
    const gAvatar = googleData?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';

    setUser(prev => ({
      ...prev,
      id: 'usr_g_' + Date.now().toString().slice(-6),
      name: gName,
      email: gEmail,
      avatar: gAvatar,
      role: googleData?.role || prev.role || 'sender',
      isLoggedIn: true,
      isNidVerified: true,
      authProvider: 'google'
    }));

    return { success: true, message: 'Google Sign-in successful' };
  };

  const registerManual = (data: {
    name?: string;
    emailOrPhone: string;
    password?: string;
    role?: 'sender' | 'commuter';
    nidNumber?: string;
  }): { success: boolean; message?: string } => {
    const isEmail = data.emailOrPhone.includes('@');
    const email = isEmail ? data.emailOrPhone : `${data.emailOrPhone}@usholmama.com`;
    const formattedName = data.name?.trim() || (isEmail ? deriveDisplayNameFromEmail(data.emailOrPhone) : data.emailOrPhone);

    setUser({
      id: 'usr_' + Date.now().toString().slice(-6),
      name: formattedName,
      email: email,
      phone: isEmail ? '' : data.emailOrPhone,
      role: data.role || 'sender',
      isNidVerified: !!data.nidNumber,
      nidNumber: data.nidNumber || '',
      walletBalance: 200, // Sign up bonus ৳200
      escrowLockedBalance: 0,
      rating: 5.0,
      totalTrips: 0,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      isLoggedIn: true,
      authProvider: 'manual'
    });

    return { success: true, message: 'Account created successfully' };
  };

  const logout = () => {
    setUser(prev => ({
      ...prev,
      isLoggedIn: false
    }));
  };

  const getParcelById = (id: string) => parcels.find(p => p.id === id);

  const resetDemoData = () => {
    setUser(DEFAULT_USER);
    setParcels(INITIAL_PARCELS);
    localStorage.removeItem('ushol_user');
    localStorage.removeItem('ushol_parcels');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        user,
        switchRole,
        updateUser,
        topupWallet,
        withdrawWallet,
        parcels,
        createParcel,
        acceptParcel,
        confirmPickup,
        arriveAtDestination,
        completeDelivery,
        reportParcel,
        cancelParcel,
        getParcelById,
        resetDemoData,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        loginManual,
        loginWithGoogle,
        registerManual,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
