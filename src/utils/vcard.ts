/**
 * Utilities for generating and directly saving vCard (.vcf) contact files
 * to native smartphone address books (iPhone Contacts / Android Google Contacts).
 */

export function generateVCardString(): string {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:B.T.;Wahyu;Eka;;',
    'FN:Wahyu Eka B.T.',
    'NICKNAME:Wahyu',
    'ORG:Green SM Electric Taxi',
    'TITLE:Driver Green SM',
    'TEL;TYPE=CELL,VOICE,PREF:+6282233697979',
    'TEL;TYPE=WHATSAPP:+6282233697979',
    'URL;TYPE=WORK:https://smartjourney.id',
    'ADR;TYPE=WORK:;;Surabaya;Jawa Timur;;Indonesia',
    'NOTE:Driver Resmi Green SM Electric Taxi Surabaya\\nZero Emission • Eco Friendly • Safe & Comfort',
    'X-WA-NUMBER:+6282233697979',
    'END:VCARD',
  ].join('\r\n');
}

export interface SaveContactResult {
  deviceType: 'ios' | 'android' | 'desktop';
  message: string;
}

/**
 * Triggers native contact saving on the user's specific smartphone device.
 * - On iPhone (iOS): Opens Apple Contacts directly with prefilled card to tap "Save".
 * - On Android: Opens Google/Samsung Contacts app directly to save into phonebook.
 * - On Desktop: Launches Contacts/People/Outlook app.
 */
export async function saveDriverContact(): Promise<SaveContactResult> {
  const vcard = generateVCardString();
  const ua = navigator.userAgent || '';
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(ua);

  // Strategy 1: Modern Web Share API with vCard file (Supported by modern iOS & Android to directly import into Contacts)
  if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare) {
    try {
      const file = new File([vcard], 'Wahyu_Eka_BT.vcf', { type: 'text/vcard' });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Wahyu Eka B.T.',
          text: 'Simpan kontak Wahyu Eka B.T. (Driver Green SM Electric Taxi)',
        });
        return {
          deviceType: isIOS ? 'ios' : isAndroid ? 'android' : 'desktop',
          message: 'Kontak berhasil dibuka. Tekan "Simpan" di HP Anda.',
        };
      }
    } catch (err: unknown) {
      // User cancelled share or fallback needed
      if (err instanceof Error && err.name === 'AbortError') {
        return {
          deviceType: isIOS ? 'ios' : isAndroid ? 'android' : 'desktop',
          message: 'Penyimpanan kontak dibatalkan.',
        };
      }
    }
  }

  // Strategy 2: iOS Safari direct Data URI navigation (Native Apple Contacts Trigger)
  if (isIOS) {
    const uri = 'data:text/vcard;charset=utf-8,' + encodeURIComponent(vcard);
    window.location.href = uri;
    return {
      deviceType: 'ios',
      message: 'Membuka kontak iPhone... Tekan "Simpan" di pojok kanan atas.',
    };
  }

  // Strategy 3: Android & Desktop native Contact trigger
  const blob = new Blob([vcard], { type: isAndroid ? 'text/x-vcard;charset=utf-8;' : 'text/vcard;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Wahyu_Eka_BT.vcf');
  link.setAttribute('target', '_self');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => {
    window.URL.revokeObjectURL(url);
  }, 2500);

  return {
    deviceType: isAndroid ? 'android' : 'desktop',
    message: isAndroid
      ? 'Membuka kontak HP Android Anda... Tekan "Simpan" untuk menyimpan.'
      : 'Kontak Wahyu Eka B.T. siap disimpan ke buku telepon Anda.',
  };
}

// Backward compatibility alias
export const downloadDriverVCard = saveDriverContact;
