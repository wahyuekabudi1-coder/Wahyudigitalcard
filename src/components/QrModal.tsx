import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { X, Check, Copy, Share2, Download, Smartphone, QrCode } from 'lucide-react';
import { GreenSMLogo } from './GreenSMLogo';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PRODUCTION_DOMAIN = 'https://smartjourney.id';

/**
 * Returns the true production URL for QR code and NFC sharing,
 * preventing localhost or AI Studio preview URLs from being encoded.
 */
export function getProductionShareUrl(): string {
  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    if (
      !origin.includes('localhost') &&
      !origin.includes('127.0.0.1') &&
      !origin.includes('run.app') &&
      !origin.includes('aistudio')
    ) {
      return origin;
    }
  }
  return PRODUCTION_DOMAIN;
}

export const QrModal: React.FC<QrModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const shareUrl = getProductionShareUrl();

  useEffect(() => {
    if (!isOpen) return;

    // Generate real, standards-compliant, camera-scannable QR Code
    QRCode.toDataURL(shareUrl, {
      width: 400,
      margin: 2,
      errorCorrectionLevel: 'H', // High error correction (30%)
      color: {
        dark: '#033B3D',
        light: '#FFFFFF',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Failed to generate QR code:', err));
  }, [isOpen, shareUrl]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Wahyu Eka B.T. - Driver Green SM Electric Taxi',
          text: 'Digital Business Card resmi Wahyu Eka B.T., Driver Green SM Electric Taxi Surabaya.',
          url: shareUrl,
        });
      } catch {
        // User cancelled
      }
    } else {
      handleCopy();
    }
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = 'QR_GreenSM_Wahyu_Eka_BT.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Tutup Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Branding */}
        <GreenSMLogo size="sm" className="mb-1.5" />

        <h3 className="text-lg font-extrabold text-[#093537] mt-1">
          Scan QR & NFC Card
        </h3>
        <p className="text-xs text-slate-500 mt-0.5 max-w-[260px] leading-relaxed">
          Pindai menggunakan kamera HP apa saja untuk membuka profil digital resmi Wahyu Eka B.T.
        </p>

        {/* Real Scannable QR Code Container */}
        <div className="my-4 p-3.5 bg-white rounded-2xl border-2 border-[#00B5B8] shadow-inner relative flex items-center justify-center">
          {qrDataUrl ? (
            <div className="relative">
              <img
                src={qrDataUrl}
                alt={`QR Code menuju ${shareUrl}`}
                className="w-52 h-52 sm:w-56 sm:h-56 object-contain rounded-lg"
              />
              {/* Center Logo Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-white p-1 border-2 border-[#00B5B8] shadow-md flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#00A3A6] to-[#00D0B5] flex items-center justify-center text-white font-black text-[10px]">
                    SM
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-52 h-52 flex items-center justify-center text-slate-400">
              <QrCode className="w-10 h-10 animate-spin text-[#00B5B8]" />
            </div>
          )}
        </div>

        {/* URL Target Preview */}
        <div className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 mb-4 flex items-center justify-between text-left">
          <div className="truncate mr-2">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Tautan Resmi (Production)
            </span>
            <span className="text-xs font-mono font-bold text-[#007F82] truncate">
              {shareUrl}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg hover:bg-white text-slate-500 hover:text-[#008E91] border border-transparent hover:border-slate-200 transition-colors shrink-0 cursor-pointer"
            title="Salin Link"
            aria-label="Salin tautan ke clipboard"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="w-full grid grid-cols-2 gap-2">
          <button
            onClick={handleDownloadQr}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#007F82] font-bold text-xs border border-teal-200/80 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#00A3A6]" />
            <span>Unduh QR</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#00A3A6] hover:bg-[#008E91] text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Bagikan</span>
          </button>
        </div>

        {/* NFC Hint */}
        <div className="mt-3.5 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
          <Smartphone className="w-3.5 h-3.5 text-[#00B5B8]" />
          <span>Siap untuk NFC Smart Card &amp; Dashboard Mobil</span>
        </div>
      </div>
    </div>
  );
};
