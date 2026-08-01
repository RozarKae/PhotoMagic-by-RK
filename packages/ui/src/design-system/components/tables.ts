export const tableStyles = {
  container:
    'w-full overflow-hidden border border-border-subtle rounded-2xl bg-surface-glass backdrop-blur-xl shadow-museum',
  headerRow:
    'border-b border-border-subtle bg-surface-elevated/80 text-[10px] font-mono text-gold-500 uppercase tracking-widest',
  headerCell: 'px-6 py-4 font-semibold',
  bodyRow:
    'hover:bg-surface-elevated/60 transition-colors duration-150 text-ivory border-b border-border-subtle/30 last:border-b-0',
  bodyCell: 'px-6 py-4 text-xs font-normal',
} as const;
