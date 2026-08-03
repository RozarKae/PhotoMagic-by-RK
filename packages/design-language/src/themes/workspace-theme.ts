import { PDL_COLORS } from '../tokens/colors';

export const PDL_WORKSPACE_THEME = {
  name: 'PhotoMagic OS Workspace Theme',
  mode: 'high-density-productivity-dark',
  density: 'compact',
  colors: {
    bg: '#0A0A0A',
    panelBg: '#121212',
    accent: PDL_COLORS.brand.kodakGold,
    aiAccent: PDL_COLORS.ai.gold,
    textPrimary: PDL_COLORS.text.primary,
    textSecondary: PDL_COLORS.text.secondary,
    border: PDL_COLORS.border.subtle,
  },
} as const;
