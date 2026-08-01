export const opacity = {
  subtle: '0.05',
  glass: '0.15',
  medium: '0.4',
  high: '0.75',
  opaque: '0.95',
  full: '1',
} as const;

export type OpacityToken = typeof opacity;
