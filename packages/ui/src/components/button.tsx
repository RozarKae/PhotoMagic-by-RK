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
      'inline-flex items-center justify-center font-nav uppercase tracking-widest transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer select-none';

    const variants = {
      primary:
        'bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-canvas font-bold border border-gold-300/50 shadow-watch hover:shadow-goldGlow hover:brightness-105 active:scale-[0.98] rounded-xl',
      secondary:
        'bg-surface-elevated/90 text-ivory border border-border-subtle hover:border-gold-500/40 hover:bg-surface-elevated hover:text-gold-300 backdrop-blur-md rounded-xl',
      outline:
        'bg-transparent text-gold-400 border border-gold-500/40 hover:bg-gold-500/10 hover:border-gold-500 hover:text-gold-300 rounded-xl',
      ghost:
        'bg-transparent text-silver border border-transparent hover:text-ivory hover:bg-surface-elevated/70 rounded-xl',
      danger:
        'bg-status-error/15 text-status-error border border-status-error/30 hover:bg-status-error hover:text-white rounded-xl',
    };

    const sizes = {
      sm: 'h-8 px-4 text-[10px] font-semibold tracking-widest',
      md: 'h-10 px-6 text-xs font-semibold tracking-widest',
      lg: 'h-12 px-8 text-xs font-bold tracking-widest',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
