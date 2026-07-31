import * as React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'gold';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'gold', className = '' }) => {
  const variants = {
    gold: 'bg-gold-500/10 text-gold-400 border-gold-500/30',
    success: 'bg-status-success/10 text-status-success border-status-success/30',
    warning: 'bg-status-warning/10 text-status-warning border-status-warning/30',
    error: 'bg-status-error/10 text-status-error border-status-error/30',
    info: 'bg-status-info/10 text-status-info border-status-info/30',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-nav uppercase tracking-widest border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
