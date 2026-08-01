import { colors } from '../foundations/colors';

export const luxuryLightTheme = {
  name: 'luxury-light',
  colors: {
    background: '#FAFAFA',
    surfaceBase: '#FFFFFF',
    surfaceElevated: '#F4F4F5',
    surfaceGlass: 'rgba(255, 255, 255, 0.85)',
    border: 'rgba(212, 175, 55, 0.25)',
    borderHover: 'rgba(212, 175, 55, 0.5)',
    primary: colors.gold600,
    primaryHover: colors.gold500,
    secondary: colors.emerald600,
    textPrimary: '#09090B',
    textSecondary: '#52525B',
    textTertiary: '#A1A1AA',
  },
  shadows: {
    card: '0 4px 20px rgba(0, 0, 0, 0.06)',
    glass: '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
    modal: '0 25px 60px rgba(0, 0, 0, 0.15)',
  },
} as const;
