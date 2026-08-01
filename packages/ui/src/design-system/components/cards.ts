export const cardStyles = {
  base: 'rounded-2xl p-6 transition-all duration-300 ease-out relative overflow-hidden',
  variants: {
    glass:
      'bg-surface-glass backdrop-blur-2xl border border-border-subtle shadow-museum hover:border-gold-500/40',
    elevated:
      'bg-surface-elevated border border-border-subtle shadow-museum hover:border-gold-500/40',
    outline: 'bg-transparent border border-border-subtle hover:border-gold-500/40',
  },
} as const;
