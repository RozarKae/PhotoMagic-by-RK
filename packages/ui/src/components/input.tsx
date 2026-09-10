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
          <label className="text-xs font-nav uppercase tracking-wider text-slate-800 dark:text-purple-200 font-bold">
            {label}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            'h-11 w-full rounded-xl bg-white dark:bg-[#170C22] px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-purple-400/50 border border-slate-300 dark:border-purple-800/60 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600 transition-all duration-200 shadow-sm',
            error && 'border-rose-500 focus:ring-rose-500/30 focus:border-rose-500',
            className,
          )}
          {...props}
        />
        {error && (
          <span className="text-xs text-rose-600 dark:text-rose-400 font-semibold">{error}</span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
