import React, { useState } from 'react';
import { X, Check, Copy, Share2, Smartphone } from 'lucide-react';
import { GreenSMLogo } from './GreenSMLogo';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QrModal: React.FC<QrModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://smartjourney.id';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Wahyu Eka B.T. - Driver Green SM Electric Taxi',
          text: 'Digital Business Card resmi Wahyu Eka B.T., Driver Green SM Electric Taxi Surabaya.',
          url: currentUrl,
        });
      } catch {
        // User cancelled share
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-teal-100 flex flex-col items-center text-center animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Tutup Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Branding */}
        <GreenSMLogo size="sm" className="mb-2" />

        <h3 className="text-lg font-extrabold text-[#093537] mt-1">
          Scan QR & NFC Card
        </h3>
        <p className="text-xs text-slate-500 mt-0.5 max-w-[240px]">
          Dekatkan smartphone atau scan QR code untuk membuka profil digital Wahyu Eka B.T.
        </p>

        {/* QR Code Container */}
        <div className="my-5 p-3.5 bg-white rounded-2xl border-2 border-[#00B5B8] shadow-inner relative group">
          {/* SVG QR Code pattern */}
          <svg
            viewBox="0 0 160 160"
            className="w-48 h-48 sm:w-52 sm:h-52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* White background */}
            <rect width="160" height="160" fill="#FFFFFF" rx="8" />

            {/* Corner Finder 1 (Top-Left) */}
            <rect x="12" y="12" width="40" height="40" rx="6" fill="#007F82" />
            <rect x="18" y="18" width="28" height="28" rx="3" fill="#FFFFFF" />
            <rect x="24" y="24" width="16" height="16" rx="2" fill="#007F82" />

            {/* Corner Finder 2 (Top-Right) */}
            <rect x="108" y="12" width="40" height="40" rx="6" fill="#007F82" />
            <rect x="114" y="18" width="28" height="28" rx="3" fill="#FFFFFF" />
            <rect x="120" y="24" width="16" height="16" rx="2" fill="#007F82" />

            {/* Corner Finder 3 (Bottom-Left) */}
            <rect x="12" y="108" width="40" height="40" rx="6" fill="#007F82" />
            <rect x="18" y="114" width="28" height="28" rx="3" fill="#FFFFFF" />
            <rect x="24" y="120" width="16" height="16" rx="2" fill="#007F82" />

            {/* Decorative Data Matrix Blocks (Styled with Green SM Teal & Golden Yellow Dots) */}
            <g fill="#008E91">
              {/* Timing strips */}
              <rect x="58" y="26" width="6" height="6" rx="1" />
              <rect x="70" y="26" width="6" height="6" rx="1" />
              <rect x="82" y="26" width="6" height="6" rx="1" />
              <rect x="94" y="26" width="6" height="6" rx="1" />

              <rect x="26" y="58" width="6" height="6" rx="1" />
              <rect x="26" y="70" width="6" height="6" rx="1" />
              <rect x="26" y="82" width="6" height="6" rx="1" />
              <rect x="26" y="94" width="6" height="6" rx="1" />

              {/* Data payload cells */}
              <rect x="58" y="40" width="6" height="6" rx="1" />
              <rect x="70" y="40" width="6" height="6" rx="1" />
              <rect x="88" y="40" width="6" height="6" rx="1" />

              <rect x="64" y="52" width="6" height="6" rx="1" />
              <rect x="76" y="52" width="6" height="6" rx="1" />
              <rect x="100" y="52" width="6" height="6" rx="1" />

              <rect x="114" y="64" width="6" height="6" rx="1" />
              <rect x="126" y="64" width="6" height="6" rx="1" />
              <rect x="138" y="64" width="6" height="6" rx="1" />

              <rect x="58" y="100" width="6" height="6" rx="1" />
              <rect x="70" y="100" width="6" height="6" rx="1" />
              <rect x="88" y="100" width="6" height="6" rx="1" />

              <rect x="64" y="112" width="6" height="6" rx="1" />
              <rect x="76" y="112" width="6" height="6" rx="1" />
              <rect x="94" y="112" width="6" height="6" rx="1" />

              <rect x="108" y="108" width="6" height="6" rx="1" />
              <rect x="120" y="108" width="6" height="6" rx="1" />
              <rect x="132" y="108" width="6" height="6" rx="1" />

              <rect x="114" y="126" width="6" height="6" rx="1" />
              <rect x="138" y="126" width="6" height="6" rx="1" />
              <rect x="126" y="138" width="6" height="6" rx="1" />

              <rect x="58" y="132" width="6" height="6" rx="1" />
              <rect x="70" y="132" width="6" height="6" rx="1" />
              <rect x="88" y="132" width="6" height="6" rx="1" />
            </g>

            {/* Accent Yellow Data Blocks */}
            <g fill="#FFB300">
              <rect x="64" y="64" width="6" height="6" rx="1" />
              <rect x="88" y="64" width="6" height="6" rx="1" />
              <rect x="102" y="76" width="6" height="6" rx="1" />
              <rect x="64" y="88" width="6" height="6" rx="1" />
              <rect x="120" y="88" width="6" height="6" rx="1" />
              <rect x="76" y="120" width="6" height="6" rx="1" />
            </g>

            {/* Center Logo Badge */}
            <circle cx="80" cy="80" r="17" fill="#FFFFFF" stroke="#00B5B8" strokeWidth="2.5" />
            <circle cx="80" cy="80" r="14" fill="#E6FAF8" />
            {/* Small EV Leaf / GSM Icon */}
            <path
              d="M 74 85 C 76 77, 82 73, 89 74 C 85 78, 84 84, 78 86 Z"
              fill="#00B5B8"
            />
            <path
              d="M 82 72 L 78 79 L 83 79 L 80 86 L 86 78 L 82 78 Z"
              fill="#FFB300"
            />
          </svg>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 w-full mt-1">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-teal-200 bg-teal-50/60 text-[#007F82] font-semibold text-xs hover:bg-teal-100 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Salin Tautan</span>
              </>
            )}
          </button>

          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#00A3A6] to-[#00C2A8] text-white font-semibold text-xs shadow-sm hover:from-[#008F92] hover:to-[#00B098] transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Bagikan</span>
          </button>
        </div>

        {/* NFC hint */}
        <div className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-400">
          <Smartphone className="w-3.5 h-3.5 text-[#00B5B8]" />
          <span>Mendukung NFC Smart Card & QR Scanner</span>
        </div>
      </div>
    </div>
  );
};
