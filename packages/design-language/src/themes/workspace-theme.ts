import { PDL_COLORS } from '../tokens/colors';

export const PDL_WORKSPACE_THEME = {
  name: 'PhotoMagic OS Workspace Light Theme',
  mode: 'high-density-light-purple-rose',
  density: 'compact',
  colors: {
    bg: '#FAF5FF',
    panelBg: '#FFFFFF',
    accent: PDL_COLORS.brand.purple,
    aiAccent: PDL_COLORS.ai.purple,
    roseAccent: PDL_COLORS.brand.rose,
    textPrimary: PDL_COLORS.text.primary,
    textSecondary: PDL_COLORS.text.secondary,
    border: PDL_COLORS.border.subtle,
  },
} as const;
