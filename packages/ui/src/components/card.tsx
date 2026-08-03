import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'elevated' | 'outline';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'glass', children, ...props }, ref) => {
    const variants = {
      glass:
        'bg-[#1D1D1D]/90 backdrop-blur-xl border border-white/10 shadow-museum hover:border-gold-500/50 hover:shadow-kodakGlow',
      elevated:
        'bg-[#1D1D1D] border border-white/10 shadow-museum hover:border-gold-500/40 hover:bg-[#242424]',
      outline:
        'bg-transparent border border-white/15 hover:border-gold-500/50 hover:bg-[#1D1D1D]/40',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl p-6 transition-all duration-500 ease-out relative overflow-hidden film-case film-case-hover',
          variants[variant],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';
