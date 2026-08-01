export const PDL_COLORS = {
  base: {
    bg: '#050505',
    surface: '#0D0D0D',
    surfaceHover: '#141414',
    surfaceActive: '#1A1A1A',
    overlay: 'rgba(0, 0, 0, 0.85)',
  },
  brand: {
    raw: '#D4AF37',
    light: '#F3E5AB',
    glow: 'rgba(212, 175, 55, 0.15)',
    muted: '#8C7323',
  },
  text: {
    primary: '#F5F5F7',
    secondary: '#A1A1AA',
    tertiary: '#71717A',
    inverse: '#050505',
  },
  semantic: {
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6',
  },
  ai: {
    violet: '#8B5CF6',
    cyan: '#06B6D4',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)',
  },
  border: {
    subtle: 'rgba(255, 255, 255, 0.08)',
    medium: 'rgba(255, 255, 255, 0.16)',
    gold: 'rgba(212, 175, 55, 0.40)',
  },
} as const;
