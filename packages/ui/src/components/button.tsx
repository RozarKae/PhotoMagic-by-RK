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
      'inline-flex items-center justify-center font-nav uppercase tracking-[0.18em] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98] cursor-pointer select-none';

    const variants = {
      primary:
        'bg-[#141414] text-ivory font-semibold border border-gold-500/60 shadow-watch hover:border-gold-500 hover:shadow-kodakGlow hover:text-gold-300 rounded-lg',
      secondary:
        'bg-[#1D1D1D] text-ivory border border-border-subtle hover:border-silver/40 hover:bg-[#242424] hover:text-silver rounded-lg',
      outline:
        'bg-transparent text-gold-400 border border-gold-500/50 hover:bg-gold-500/10 hover:border-gold-500 hover:shadow-kodakGlow rounded-lg',
      ghost:
        'bg-transparent text-silver/80 border border-transparent hover:text-ivory hover:bg-[#1D1D1D] rounded-lg',
      danger:
        'bg-burgundy/30 text-red-300 border border-burgundy hover:bg-burgundy hover:text-white rounded-lg',
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
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
