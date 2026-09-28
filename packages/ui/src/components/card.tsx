import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'elevated' | 'outline';
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'glass', interactive = false, children, ...props }, ref) => {
    const variants = {
      glass:
        'bg-white/95 dark:bg-[#170C22]/95 backdrop-blur-xl border border-purple-200/80 dark:border-purple-800/40 text-slate-900 dark:text-white shadow-museum hover:border-rose-400 dark:hover:border-purple-400/50 hover:shadow-kodakGlow',
      elevated:
        'bg-white dark:bg-[#170C22] border border-slate-200/90 dark:border-purple-800/50 text-slate-900 dark:text-white shadow-card hover:border-purple-300 dark:hover:border-purple-600 hover:bg-purple-50/50 dark:hover:bg-[#211333]',
      outline:
        'bg-transparent border border-slate-300 dark:border-purple-800/60 text-slate-900 dark:text-white hover:border-purple-500 hover:bg-purple-50/40 dark:hover:bg-purple-950/40',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl p-6 transition-all duration-300 ease-out relative overflow-hidden film-case film-case-hover',
          interactive &&
            'hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer active:scale-[0.99] will-change-transform',
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
