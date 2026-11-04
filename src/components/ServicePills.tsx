import React from 'react';
import { Leaf, Zap, ShieldCheck } from 'lucide-react';

/**
 * ServicePills
 *
 * Tiga identitas layanan:
 * 1. Zero Emission
 * 2. Eco Friendly
 * 3. Safe & Comfort
 */
export const ServicePills: React.FC<{ className?: string }> = ({ className = '' }) => {
  const services = [
    {
      title: 'Zero Emission',
      icon: Leaf,
      iconColor: 'text-[#00A3A6]',
      bgGrad: 'from-emerald-50 to-teal-50/70',
      borderColor: 'border-teal-200/80',
    },
    {
      title: 'Eco Friendly',
      icon: Zap,
      iconColor: 'text-[#E69500]',
      bgGrad: 'from-amber-50 to-yellow-50/70',
      borderColor: 'border-amber-200/80',
    },
    {
      title: 'Safe & Comfort',
      icon: ShieldCheck,
      iconColor: 'text-[#008E91]',
      bgGrad: 'from-cyan-50 to-teal-50/70',
      borderColor: 'border-cyan-200/80',
    },
  ];

  return (
    <div className={`grid grid-cols-3 gap-2 w-full select-none ${className}`}>
      {services.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div
            key={index}
            className={`flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b ${item.bgGrad} border ${item.borderColor} shadow-xs transition-transform hover:-translate-y-0.5`}
          >
            <div className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center shadow-2xs mb-1">
              <IconComponent className={`w-3.5 h-3.5 ${item.iconColor}`} />
            </div>
            <span className="text-[10.5px] font-bold text-[#0A3D3E] text-center leading-tight whitespace-nowrap">
              {item.title}
            </span>
          </div>
        );
      })}
    </div>
  );
};
