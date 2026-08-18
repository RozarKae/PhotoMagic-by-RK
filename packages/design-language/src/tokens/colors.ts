export const PDL_COLORS = {
  base: {
    bg: '#120724', // Deep Royal Violet Aubergine
    charcoal: '#1C0D36', // Deep Plum Surface
    surface: '#28124D', // Royal Purple Card Surface
    surfaceHover: '#351866', // Elevated Royal Purple
    surfaceActive: '#441E80', // Active Purple
    overlay: 'rgba(18, 7, 36, 0.92)',
    lightBg: '#FFF5F7', // Light Rose Canvas Background
    lightSurface: '#FFE4E9', // Light Rose Surface
  },
  brand: {
    purple: '#7C3AED', // Royal Purple Primary
    purpleLight: '#A855F7', // Bright Violet
    purpleDark: '#4C1D95', // Deep Royal Purple
    rose: '#FB7185', // Rose Quartz / Blush Pink
    roseLight: '#FDA4AF', // Soft Rose Tint
    roseDark: '#E11D48', // Deep Rose Crimson
    glow: 'rgba(124, 58, 237, 0.22)',
    roseGlow: 'rgba(251, 113, 133, 0.25)',
    muted: '#8B5CF6',
  },
  text: {
    primary: '#FFF5F7', // Soft Rose Ivory
    secondary: '#E9D5FF', // Soft Lavender
    tertiary: '#C4B5FD', // Muted Violet
    inverse: '#120724', // Deep Aubergine
    darkPrimary: '#1E0A3C', // Deep Aubergine for light mode
    darkSecondary: '#4C1D95', // Purple for light mode
  },
  semantic: {
    success: '#10B981', // Emerald Mint
    warning: '#F59E0B', // Amber Coral
    danger: '#F43F5E', // Rose Crimson
    info: '#8B5CF6', // Purple Violet
  },
  ai: {
    purple: '#8B5CF6',
    rose: '#FB7185',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #C084FC 50%, #FB7185 100%)',
  },
  border: {
    subtle: 'rgba(124, 58, 237, 0.18)',
    medium: 'rgba(124, 58, 237, 0.35)',
    rose: 'rgba(251, 113, 133, 0.35)',
  },
} as const;
