/**
 * Utilities for generating and downloading vCard (.vcf) contact files
 * for Wahyu Eka B.T. - Green SM Electric Taxi
 */

export function downloadDriverVCard() {
  const vcard = [
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

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Wahyu_Eka_BT_Green_SM.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
