export const badgeStyles = {
  base: 'inline-flex items-center px-3 py-1 rounded-full text-[9px] font-nav uppercase tracking-[0.18em] font-semibold border backdrop-blur-md transition-all',
  variants: {
    gold: 'bg-gold-500/10 text-gold-400 border-gold-500/30 shadow-sm',
    success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 shadow-sm',
    warning: 'bg-status-warning/15 text-status-warning border-status-warning/30 shadow-sm',
    error: 'bg-status-error/15 text-status-error border-status-error/30 shadow-sm',
    info: 'bg-status-info/15 text-silver border-border-subtle shadow-sm',
  },
} as const;
