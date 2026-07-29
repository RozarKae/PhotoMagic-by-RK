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
      glass: 'bg-surface-glass backdrop-blur-xl border border-border-subtle shadow-card',
      elevated: 'bg-surface-elevated border border-border-subtle shadow-card',
      outline: 'bg-transparent border border-border-subtle',
    };

    return (
      <div
        ref={ref}
        className={cn('rounded-lg p-6 transition-all duration-200', variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';
