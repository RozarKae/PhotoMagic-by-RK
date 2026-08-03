import * as React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'gold';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'gold', className = '' }) => {
  const variants = {
    gold: 'bg-gold-500/10 text-gold-400 border-gold-500/40 shadow-watch',
    success: 'bg-[#0E6B56]/20 text-emerald-300 border-[#0E6B56]/40',
    warning: 'bg-gold-500/15 text-gold-300 border-gold-500/30',
    error: 'bg-[#531A1A]/40 text-red-300 border-[#531A1A]',
    info: 'bg-[#1D1D1D] text-silver border-white/10',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-md text-[9px] font-mono uppercase tracking-[0.2em] font-semibold border backdrop-blur-md transition-all ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
