export const buttonStyles = {
  base: 'inline-flex items-center justify-center font-nav uppercase tracking-widest transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer select-none',
  variants: {
    primary:
      'bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-canvas font-bold border border-gold-400 shadow-watch hover:shadow-lg hover:brightness-110 hover:-translate-y-0.5 rounded-full',
    secondary:
      'bg-surface-glass text-ivory border border-border-subtle hover:border-gold-500/50 hover:bg-surface-elevated hover:text-gold-400 hover:-translate-y-0.5 backdrop-blur-md rounded-xl',
    outline:
      'bg-transparent text-gold-400 border border-gold-500/40 hover:bg-gold-500/10 hover:border-gold-500 hover:text-gold-400 hover:-translate-y-0.5 rounded-full',
    ghost:
      'bg-transparent text-ivory border border-transparent hover:text-gold-400 hover:bg-surface-elevated/50 rounded-xl',
    danger:
      'bg-status-error/10 text-status-error border border-status-error/30 hover:bg-status-error hover:text-white rounded-xl',
  },
  sizes: {
    sm: 'h-8 px-4 text-[10px] font-semibold tracking-widest',
    md: 'h-10 px-6 text-xs font-semibold tracking-widest',
    lg: 'h-12 px-8 text-xs font-bold tracking-widest',
  },
} as const;
