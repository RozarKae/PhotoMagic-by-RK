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
      {label && <label className="text-xs font-medium text-text-secondary">{label}</label>}
      <div className="relative w-full">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`h-10 w-full appearance-none rounded-md bg-surface-base px-3 pr-8 text-sm text-text-primary border border-border-subtle focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all cursor-pointer ${
            error ? 'border-status-error focus:ring-status-error' : ''
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-surface-elevated text-text-primary"
            >
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-text-tertiary">
          <ChevronDown size={16} />
        </div>
      </div>
      {error && <span className="text-xs text-status-error font-medium">{error}</span>}
    </div>
  );
};
