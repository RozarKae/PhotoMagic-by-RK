import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles =
      'group relative inline-flex items-center justify-center font-nav uppercase tracking-[0.18em] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:opacity-40 disabled:pointer-events-none active:scale-[0.96] hover:scale-[1.015] cursor-pointer select-none overflow-hidden';

    const variants = {
      primary:
        'bg-gradient-to-r from-purple-700 via-purple-600 to-rose-600 text-white font-bold shadow-[0_4px_16px_rgba(124,58,237,0.3)] hover:opacity-95 hover:shadow-[0_8px_25px_rgba(225,29,72,0.4)] rounded-xl border border-white/20',
      secondary:
        'bg-purple-50 dark:bg-purple-950/60 text-purple-950 dark:text-purple-100 border border-purple-200 dark:border-purple-800/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 rounded-xl shadow-sm hover:shadow-md',
      outline:
        'bg-transparent text-purple-900 dark:text-purple-200 border border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/40 rounded-xl hover:border-purple-500',
      ghost:
        'bg-transparent text-slate-800 dark:text-purple-200 border border-transparent hover:text-purple-900 dark:hover:text-white hover:bg-purple-100/50 dark:hover:bg-purple-950/40 rounded-xl',
      danger:
        'bg-rose-600 text-white border border-rose-700 hover:bg-rose-700 shadow-sm rounded-xl hover:shadow-rose-600/30',
    };

    const sizes = {
      sm: 'h-8 px-4 text-[10px] font-medium tracking-[0.15em]',
      md: 'h-10 px-5 text-xs font-semibold tracking-[0.18em]',
      lg: 'h-11 px-7 text-xs font-bold tracking-[0.2em]',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {/* Subtle glass sheen highlight sweep on hover */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-in-out" />
        <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      </button>
    );
  },
);

Button.displayName = 'Button';
