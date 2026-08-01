import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label className="text-xs font-nav uppercase tracking-wider text-text-secondary font-medium">
            {label}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            'h-11 w-full rounded-xl bg-surface-base/90 px-4 text-sm text-ivory placeholder:text-silver/50 border border-border-subtle focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 transition-all duration-200 shadow-inner',
            error && 'border-status-error focus:ring-status-error',
            className,
          )}
          {...props}
        />
        {error && <span className="text-xs text-status-error font-medium">{error}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';
