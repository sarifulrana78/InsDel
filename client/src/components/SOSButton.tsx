import React from 'react';
import { PhoneCall } from 'lucide-react';

interface SOSButtonProps {
  language: 'BN' | 'EN';
  onEmergencyTriggered?: () => void;
}

export default function SOSButton({ language, onEmergencyTriggered }: SOSButtonProps) {
  const handleSOSClick = () => {
    // In a real app, this would log GPS coordinates and alert the safety desk
    if (onEmergencyTriggered) {
      onEmergencyTriggered();
    }
  };

  return (
    <a 
      href="tel:999"
      onClick={handleSOSClick}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-rose-600 text-white rounded-full shadow-[0_10px_25px_-5px_rgba(225,29,72,0.5)] hover:bg-rose-700 hover:scale-105 active:scale-95 transition-all animate-pulse"
      title={language === 'BN' ? 'জরুরি কল 999' : 'Emergency 999'}
    >
      <PhoneCall className="w-7 h-7" />
    </a>
  );
}
