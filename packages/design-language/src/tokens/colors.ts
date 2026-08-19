export const PDL_COLORS = {
  base: {
    bg: '#FFF5F7', // Light Rose Quartz Canvas
    charcoal: '#FDF2F4', // Soft Blush Surface
    surface: '#FFFFFF', // Pure White Elevated Card
    surfaceHover: '#FAF5FF', // Soft Lavender Hover
    surfaceActive: '#F3E8FF', // Active Lavender Tint
    overlay: 'rgba(255, 245, 247, 0.95)',
    darkCanvas: '#1E0A3C', // Deep Aubergine for contrast
  },
  brand: {
    purple: '#7C3AED', // Royal Purple Primary
    purpleLight: '#9333EA', // Bright Violet
    purpleDark: '#581C87', // Deep Velvet Violet
    rose: '#E11D48', // Deep Rose / Rose Quartz
    roseLight: '#FB7185', // Soft Rose Tint
    roseDark: '#BE123C', // Deep Rose Crimson
    glow: 'rgba(124, 58, 237, 0.12)',
    roseGlow: 'rgba(225, 29, 72, 0.14)',
    muted: '#A855F7',
  },
  text: {
    primary: '#1E0A3C', // Deep Velvet Aubergine (Ultra-clear on light background)
    secondary: '#4C1D95', // Rich Purple Subtext
    tertiary: '#6B5B7B', // Soft Plum Slate
    inverse: '#FFFFFF', // Pure White
    lightPrimary: '#FFF5F7',
  },
  semantic: {
    success: '#059669', // Emerald Mint
    warning: '#D97706', // Amber Coral
    danger: '#E11D48', // Rose Crimson
    info: '#7C3AED', // Royal Purple
  },
  ai: {
    purple: '#7C3AED',
    rose: '#E11D48',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 50%, #E11D48 100%)',
  },
  border: {
    subtle: 'rgba(124, 58, 237, 0.12)',
    medium: 'rgba(124, 58, 237, 0.22)',
    rose: 'rgba(225, 29, 72, 0.25)',
  },
} as const;
