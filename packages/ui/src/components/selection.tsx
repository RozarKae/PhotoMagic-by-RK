import * as React from 'react';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled,
  className = '',
  ...props
}) => {
  return (
    <label
      className={`inline-flex items-center gap-2.5 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <div
        onClick={() => !disabled && onChange(!checked)}
        className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${
          checked
            ? 'bg-gold-500 border-gold-500 text-canvas'
            : 'bg-surface-base border-border-subtle hover:border-gold-500/50'
        }`}
      >
        {checked && <Check size={14} strokeWidth={3} />}
      </div>
      {label && <span className="text-sm font-medium text-text-primary">{label}</span>}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
        disabled={disabled}
        {...props}
      />
    </label>
  );
};

export interface SwitchProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({ label, checked, onChange, disabled }) => {
  return (
    <label
      className={`inline-flex items-center gap-3 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <div
        onClick={() => !disabled && onChange(!checked)}
        className={`w-11 h-6 rounded-full transition-colors p-0.5 ${
          checked ? 'bg-gold-500' : 'bg-surface-elevated border border-border-subtle'
        }`}
      >
        <div
          className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? 'translate-x-5 bg-canvas' : 'translate-x-0'
          }`}
        />
      </div>
      {label && <span className="text-sm font-medium text-text-primary">{label}</span>}
    </label>
  );
};
