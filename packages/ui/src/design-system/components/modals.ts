export const modalStyles = {
  backdrop: 'fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4',
  container:
    'relative w-full max-w-lg rounded-2xl bg-surface-glass backdrop-blur-2xl border border-border-subtle p-8 shadow-museum animate-in fade-in zoom-in-95 duration-200',
  header: 'flex items-center justify-between pb-4 border-b border-border-subtle mb-6',
  title: 'font-heading text-2xl font-bold text-ivory',
} as const;
