import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { ScanLine, CheckCircle2 } from 'lucide-react';

interface ScanRecipientQRProps {
  language: 'BN' | 'EN';
  onScanSuccess: (decodedText: string) => void;
}

export default function ScanRecipientQR({ language, onScanSuccess }: ScanRecipientQRProps) {
  const [scanResult, setScanResult] = useState<string | null>(null);

  useEffect(() => {
    // Initialize Scanner
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scanner.render(
      (decodedText) => {
        setScanResult(decodedText);
        scanner.clear();
        onScanSuccess(decodedText);
      },
      (error) => {
        // Handle scan errors silently
      }
    );

    return () => {
      scanner.clear().catch(error => console.error("Failed to clear scanner", error));
    };
  }, [onScanSuccess]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <ScanLine className="w-6 h-6 text-emerald-600" />
        <h3 className="text-xl font-bold text-slate-900">
          {language === 'BN' ? 'ডেলিভারি QR স্ক্যান করুন' : 'Scan Delivery QR'}
        </h3>
      </div>
      
      {!scanResult ? (
        <div id="reader" className="w-full overflow-hidden rounded-2xl border-2 border-slate-100"></div>
      ) : (
        <div className="bg-emerald-50 rounded-2xl p-8 flex flex-col items-center justify-center text-center border border-emerald-100">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-4" />
          <h4 className="font-bold text-emerald-900 text-lg mb-2">
            {language === 'BN' ? 'স্ক্যান সফল হয়েছে!' : 'Scan Successful!'}
          </h4>
          <p className="text-sm text-emerald-700">
            {language === 'BN' ? 'এবার OTP ও লাইভ ছবি দিয়ে হ্যান্ডওভার সম্পন্ন করুন।' : 'Now complete handover with OTP and Live Photo.'}
          </p>
        </div>
      )}
    </div>
  );
}
