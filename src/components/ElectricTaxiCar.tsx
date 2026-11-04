import React from 'react';

/**
 * ElectricTaxiCar
 *
 * Gambar mobil listrik Green SM di bagian bawah yang MENYATU secara proporsional
 * dan menyatu langsung dengan background kartu tanpa kotak/border terpisah.
 * Menggunakan aset mobil listrik Green SM resmi (/assets/aistudio/green_sm_car_seamless.png).
 */
export const ElectricTaxiCar: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full overflow-hidden select-none ${className}`}>
      {/* Gambar mobil listrik Green SM full-width menyatu dengan tepi kartu */}
      <div className="relative w-full overflow-hidden">
        <img
          src="/assets/aistudio/green_sm_car_seamless.png"
          alt="Green SM Electric Taxi"
          className="w-full h-auto object-cover object-bottom block"
        />

        {/* Gradasi lembut bagian atas agar menyatu sempurna dengan background kartu */}
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#E9FAF7] via-[#E9FAF7]/40 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};
