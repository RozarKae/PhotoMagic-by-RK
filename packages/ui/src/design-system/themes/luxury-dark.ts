import { colors } from '../foundations/colors';
import { shadows } from '../foundations/shadows';

export const luxuryDarkTheme = {
  name: 'luxury-dark',
  colors: {
    background: colors.canvas,
    surfaceBase: colors.surfaceBase,
    surfaceElevated: colors.surfaceElevated,
    surfaceGlass: colors.surfaceGlass,
    border: colors.borderSubtle,
    borderHover: colors.borderElevated,
    primary: colors.gold500,
    primaryHover: colors.gold400,
    secondary: colors.emerald500,
    textPrimary: colors.ivory,
    textSecondary: colors.silver,
    textTertiary: colors.bronze,
  },
  shadows: {
    card: shadows.card,
    glass: shadows.glass,
    modal: shadows.modal,
  },
} as const;
