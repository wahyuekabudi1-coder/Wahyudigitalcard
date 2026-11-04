import React from 'react';
import { Zap, Leaf, ShieldCheck } from 'lucide-react';

/**
 * ServicePills
 *
 * Tiga identitas layanan resmi Green SM:
 * 1. Zero Emission
 * 2. Eco Friendly
 * 3. Safe & Comfort
 */
export const ServicePills: React.FC<{ className?: string }> = ({ className = '' }) => {
  const services = [
    {
      title: 'Zero Emission',
      icon: Zap,
      iconColor: 'text-[#00A3A6]',
      borderColor: 'border-teal-200/80',
    },
    {
      title: 'Eco Friendly',
      icon: Leaf,
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-200/80',
    },
    {
      title: 'Safe & Comfort',
      icon: ShieldCheck,
      iconColor: 'text-[#008A8D]',
      borderColor: 'border-teal-200/80',
    },
  ];

  return (
    <div className={`grid grid-cols-3 gap-2 w-full select-none ${className}`}>
      {services.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div
            key={index}
            className={`flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-xl bg-white/95 border ${item.borderColor} shadow-xs text-center transition-all duration-200`}
          >
            <IconComponent className={`w-3.5 h-3.5 ${item.iconColor} shrink-0`} />
            <span className="text-[11px] font-bold text-[#005254] leading-tight">
              {item.title}
            </span>
          </div>
        );
      })}
    </div>
  );
};
