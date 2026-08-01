import * as React from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'onChange'
> {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label className="text-xs font-nav uppercase tracking-wider text-text-secondary font-medium">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`h-11 w-full appearance-none rounded-xl bg-surface-base/90 px-4 pr-10 text-sm text-ivory border border-border-subtle focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 transition-all duration-200 cursor-pointer ${
            error ? 'border-status-error focus:ring-status-error' : ''
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-surface-elevated text-ivory py-2"
            >
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gold-500">
          <ChevronDown size={16} />
        </div>
      </div>
      {error && <span className="text-xs text-status-error font-medium">{error}</span>}
    </div>
  );
};
