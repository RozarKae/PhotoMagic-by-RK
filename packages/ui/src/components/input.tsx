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
        {label && <label className="text-xs font-medium text-text-secondary">{label}</label>}
        <input
          type={type}
          ref={ref}
          className={cn(
            'h-10 w-full rounded-md bg-surface-base px-3 text-sm text-text-primary placeholder:text-text-tertiary border border-border-subtle focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all',
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
