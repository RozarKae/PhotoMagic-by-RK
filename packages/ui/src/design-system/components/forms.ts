export const formStyles = {
  label: 'text-xs font-nav uppercase tracking-wider text-text-secondary font-medium',
  input:
    'h-11 w-full rounded-xl bg-surface-base/90 px-4 text-sm text-ivory placeholder:text-silver/50 border border-border-subtle focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 transition-all duration-200 shadow-inner',
  select:
    'h-11 w-full appearance-none rounded-xl bg-surface-base/90 px-4 pr-10 text-sm text-ivory border border-border-subtle focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 transition-all duration-200 cursor-pointer',
  textarea:
    'w-full rounded-xl bg-surface-base/90 p-4 text-xs text-ivory placeholder:text-silver/50 border border-border-subtle focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 transition-all font-mono shadow-inner',
  errorText: 'text-xs text-status-error font-medium',
} as const;
