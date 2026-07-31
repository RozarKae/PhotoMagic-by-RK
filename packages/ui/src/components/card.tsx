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
        'bg-surface-glass/90 backdrop-blur-2xl border border-gold-500/20 shadow-museum hover:border-gold-500/40',
      elevated:
        'bg-surface-elevated/90 border border-gold-500/20 shadow-museum hover:border-gold-500/40',
      outline: 'bg-transparent border border-gold-500/20 hover:border-gold-500/50',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl p-6 transition-all duration-300 ease-out relative overflow-hidden',
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
