import * as React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'gold';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'gold', className = '' }) => {
  const variants = {
    gold: 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-700/60 shadow-sm',
    success:
      'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700/60',
    warning:
      'bg-amber-100 dark:bg-amber-950/60 text-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-700/60',
    error:
      'bg-rose-100 dark:bg-rose-950/60 text-rose-900 dark:text-rose-300 border-rose-300 dark:border-rose-700/60',
    info: 'bg-purple-100 dark:bg-purple-950/60 text-purple-950 dark:text-purple-300 border-purple-300 dark:border-purple-700/60',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-md text-[9px] font-mono uppercase tracking-[0.2em] font-semibold border backdrop-blur-md transition-all ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
