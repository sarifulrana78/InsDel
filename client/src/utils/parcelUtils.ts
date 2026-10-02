import { ParcelItem } from '@/context/AppContext';

export interface LocalizedParcelInfo {
  title: string;
  description: string;
  senderName: string;
  senderInitial: string;
  recipientName: string;
  commuterName?: string;
  weight: string;
  category: string;
}

export const CATEGORY_NAMES: Record<string, { BN: string; EN: string }> = {
  electronics: { BN: 'ইলেকট্রনিক্স', EN: 'Electronics' },
  documents: { BN: 'ডকুমেন্টস', EN: 'Documents' },
  clothing: { BN: 'পোশাক', EN: 'Clothing' },
  food: { BN: 'খাবার', EN: 'Food' },
  other: { BN: 'অন্যান্য', EN: 'Other' },
};

export const PARCEL_TRANSLATIONS: Record<string, {
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  senderNameEn: string;
  senderNameBn: string;
  recipientNameEn: string;
  recipientNameBn: string;
  commuterNameEn?: string;
  commuterNameBn?: string;
  weightEn: string;
  weightBn: string;
}> = {
  'PRC-1001': {
    titleEn: 'Urgent Legal Documents (Court Papers)',
    titleBn: 'জরুরি আইনি ডকুমেন্টস (Court Papers)',
    descriptionEn: 'High Court case documents file. Must not be bent or folded under any circumstances.',
    descriptionBn: 'হাইকোর্টের মামলার মূল কাগজপত্রের ফাইল। কোনো অবস্থাতেই বাঁকানো যাবে না।',
    senderNameEn: 'Tanvir Ahmed',
    senderNameBn: 'তানভীর আহমেদ',
    recipientNameEn: 'Barrister Zaman',
    recipientNameBn: 'ব্যারিস্টার জামান',
    commuterNameEn: 'Kamrul Hasan (Metro Commuter)',
    commuterNameBn: 'কামরুল হাসান (মেট্রো যাত্রী)',
    weightEn: 'Weight: < 1.0 kg',
    weightBn: 'ওজন: < ১.০ কেজি'
  },
  'PRC-1002': {
    titleEn: 'Used iPhone 12 (Original Boxed)',
    titleBn: 'ব্যবহৃত আইফোন ১২ (Original Boxed)',
    descriptionEn: 'iPhone 12 with original cable. Open box, ready for physical inspection.',
    descriptionBn: 'আইফোন ১২ ও অরিজিনাল ক্যাবল। খোলা প্যাকেট, ইনস্পেকশন সম্পন্ন যোগ্য।',
    senderNameEn: 'Nadim Chowdhury',
    senderNameBn: 'নাদিম চৌধুরী',
    recipientNameEn: 'Asif Raihan',
    recipientNameBn: 'আসিফ রায়হান',
    weightEn: 'Weight: < 1.0 kg',
    weightBn: 'ওজন: < ১.০ কেজি'
  },
  'PRC-1003': {
    titleEn: 'Winter Shawl & Cardigan Gift Pack',
    titleBn: 'শীতের শাল ও কার্ডিগান গিফট প্যাক',
    descriptionEn: 'Handcrafted Kashmiri shawl and elegant gift items. Weight 1 kg.',
    descriptionBn: 'হাতে বোনা কাশ্মীরি শাল ও শালীন উপহার সামগ্রী। ওজন ১ কেজি।',
    senderNameEn: 'Farhana Islam',
    senderNameBn: 'ফারহানা ইসলাম',
    recipientNameEn: 'Tanjila Haque (Rokeya Hall)',
    recipientNameBn: 'তানজিলা হক (রোকেয়া হল)',
    weightEn: 'Weight: < 2.0 kg',
    weightBn: 'ওজন: < ২.০ কেজি'
  },
  'PRC-1004': {
    titleEn: 'Homemade Special Lunch Tiffin Box',
    titleBn: 'হোমমেড স্পেশাল লাঞ্চ টিফিন বক্স',
    descriptionEn: 'Clean tiffin carrier. Requires prompt delivery before office lunch hour.',
    descriptionBn: 'পরিষ্কার টিফিন ক্যারিয়ার। অফিস টাইমে দুপুরের আগে ডেলিভারি প্রয়োজন।',
    senderNameEn: 'Sultana Jahan',
    senderNameBn: 'সুলতানা জাহান',
    recipientNameEn: 'Iqbal Mahmud',
    recipientNameBn: 'ইকবাল মাহমুদ',
    weightEn: 'Weight: < 2.0 kg',
    weightBn: 'ওজন: < ২.০ কেজি'
  },
  'PRC-1005': {
    titleEn: 'Prescription Medicine File (Insulin & Emergency Meds)',
    titleBn: 'প্রেসক্রিপশন মেডিসিন ফাইল (ইনসুলিন ও জরুরি ওষুধ)',
    descriptionEn: 'Insulin purchased from pharmacy with cool pack. Urgent handover required.',
    descriptionBn: 'ফার্মেসি থেকে ক্রয়কৃত ইনসুলিন কুলপ্যাকসহ। আর্জেন্ট হ্যান্ডওভার আবশ্যক।',
    senderNameEn: 'Dr. Rafiquzzaman',
    senderNameBn: 'ডা. রফিকুজ্জামান',
    recipientNameEn: 'Abul Kalam Azad',
    recipientNameBn: 'আবুল কালাম আজাদ',
    weightEn: 'Weight: < 2.0 kg',
    weightBn: 'ওজন: < ২.০ কেজি'
  }
};

export function getLocalizedParcelText(
  parcel: ParcelItem, 
  language: 'BN' | 'EN'
): LocalizedParcelInfo {
  const trans = PARCEL_TRANSLATIONS[parcel.id];
  const isEn = language === 'EN';

  const title = isEn 
    ? (parcel.titleEn || trans?.titleEn || parcel.title) 
    : (parcel.title || trans?.titleBn || parcel.titleEn || '');

  const description = isEn
    ? (parcel.descriptionEn || trans?.descriptionEn || parcel.description)
    : (parcel.description || trans?.descriptionBn || parcel.descriptionEn || '');

  const senderName = isEn
    ? (parcel.senderNameEn || trans?.senderNameEn || parcel.senderName)
    : (parcel.senderName || trans?.senderNameBn || parcel.senderNameEn || '');

  const recipientName = isEn
    ? (parcel.recipientNameEn || trans?.recipientNameEn || parcel.recipientName)
    : (parcel.recipientName || trans?.recipientNameBn || parcel.recipientNameEn || '');

  const commuterName = isEn
    ? (parcel.commuterNameEn || trans?.commuterNameEn || parcel.commuterName)
    : (parcel.commuterName || trans?.commuterNameBn || parcel.commuterNameEn || '');

  const weight = isEn
    ? (parcel.weightEn || trans?.weightEn || 'Weight: < 2.0 kg')
    : (parcel.weight || trans?.weightBn || 'ওজন: < ২.০ কেজি');

  const category = CATEGORY_NAMES[parcel.category?.toLowerCase()]?.[language] || parcel.category;

  const senderInitial = (senderName || 'U').trim().charAt(0).toUpperCase();

  return {
    title,
    description,
    senderName,
    senderInitial,
    recipientName,
    commuterName,
    weight,
    category
  };
}
