import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-nav uppercase tracking-widest rounded-full border transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer';

    const variants = {
      primary:
        'bg-transparent text-gold-500 border-gold-500/50 hover:bg-gold-500 hover:text-canvas hover:border-gold-500 shadow-watch hover:-translate-y-0.5',
      secondary:
        'bg-surface-elevated text-ivory border-gold-500/20 hover:border-gold-500/60 hover:bg-surface-base hover:text-gold-400 hover:-translate-y-0.5',
      ghost:
        'bg-transparent text-ivory border-transparent hover:text-gold-400 hover:bg-surface-elevated/40',
      danger:
        'bg-status-error/10 text-status-error border-status-error/30 hover:bg-status-error hover:text-white',
    };

    const sizes = {
      sm: 'h-8 px-4 text-[11px] font-semibold',
      md: 'h-10 px-6 text-xs font-semibold',
      lg: 'h-12 px-8 text-xs font-bold',
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
