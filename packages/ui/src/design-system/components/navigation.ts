export const navigationStyles = {
  navbar:
    'fixed top-0 left-0 right-0 z-50 bg-canvas/80 backdrop-blur-2xl border-b border-gold-500/20 transition-all duration-300',
  sidebar:
    'relative h-screen bg-canvas border-r border-gold-500/20 flex flex-col justify-between transition-all duration-300 z-40',
  navItemActive: 'bg-gold-500/15 text-gold-400 border border-gold-500/40 shadow-watch',
  navItemInactive: 'text-silver hover:text-ivory hover:bg-surface-elevated/60',
} as const;
