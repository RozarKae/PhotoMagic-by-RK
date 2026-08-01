export const colors = {
  // Brand Canvas & Backgrounds
  canvas: '#060606', // Deep Matte Black
  surfaceBase: '#111111', // Rich Charcoal
  surfaceElevated: '#171717', // Dark Graphite
  surfaceGlass: 'rgba(17, 17, 17, 0.85)', // Sotheby's Museum Glass

  // Hairline Borders
  borderSubtle: 'rgba(212, 175, 55, 0.18)', // Hairline gold tint
  borderElevated: 'rgba(212, 175, 55, 0.35)',

  // Accents - Royal Gold
  gold400: '#E5C158', // Soft Gold Accent
  gold500: '#D4AF37', // Royal Gold
  gold600: '#B59226', // Deep Gold

  // Accents - Deep Emerald
  emerald400: '#149177', // Bright Emerald Accent
  emerald500: '#0B5D4C', // Deep Emerald
  emerald600: '#074236', // Forest Emerald

  // Typography Palette
  ivory: '#F6F3EE', // Warm White / Primary Text
  silver: '#AEB4BA', // Muted Gray / Secondary Text
  bronze: '#7B6B4F', // Muted Bronze / Tertiary Text

  // Status Colors
  statusSuccess: '#10B981', // Emerald Success
  statusWarning: '#D97706', // Luxury Amber
  statusError: '#EF4444', // Soft Crimson
  statusInfo: '#64748B', // Muted Slate

  // Overlays
  overlayDark: 'rgba(0, 0, 0, 0.85)',
  overlayGlass: 'rgba(17, 17, 17, 0.75)',
} as const;

export type ColorsToken = typeof colors;
