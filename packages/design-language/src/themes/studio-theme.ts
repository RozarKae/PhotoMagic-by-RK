import { PDL_COLORS } from '../tokens/colors';

export const PDL_STUDIO_THEME = {
  name: 'PhotoMagic Studio Theme',
  mode: 'editorial-luxury-dark',
  density: 'spacious',
  colors: {
    bg: PDL_COLORS.base.bg,
    cardBg: PDL_COLORS.base.surface,
    accent: PDL_COLORS.brand.raw,
    textPrimary: PDL_COLORS.text.primary,
    textSecondary: PDL_COLORS.text.secondary,
    border: PDL_COLORS.border.subtle,
  },
} as const;
