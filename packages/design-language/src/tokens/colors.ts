export const PDL_COLORS = {
  base: {
    bg: '#FAF8FC', // Crisp Soft Pastel Canvas
    charcoal: '#F5F0FA', // Soft Pastel Tint
    surface: '#FFFFFF', // Pure White Elevated Card
    surfaceHover: '#FBF8FD', // Soft Lavender Hover
    surfaceActive: '#F3EBF9', // Active Lavender Tint
    overlay: 'rgba(250, 248, 252, 0.95)',
    darkCanvas: '#0F091A', // Deep Midnight Aubergine for dark mode
  },
  pastel: {
    // 1. Pastel Lilac & Lavender
    lavenderBg: '#FAF5FF',
    lavenderBorder: '#E9D5FF',
    lavenderText: '#6B21A8',
    // 2. Pastel Rose & Blush
    roseBg: '#FFF1F2',
    roseBorder: '#FECDD3',
    roseText: '#9F1239',
    // 3. Pastel Mint & Sage
    mintBg: '#F0FDF4',
    mintBorder: '#BBF7D0',
    mintText: '#166534',
    // 4. Pastel Amber & Buttercream
    amberBg: '#FFFBEB',
    amberBorder: '#FDE68A',
    amberText: '#92400E',
    // 5. Pastel Sky & Periwinkle
    skyBg: '#F0F9FF',
    skyBorder: '#BAE6FD',
    skyText: '#075985',
    // 6. Pastel Peach & Coral
    peachBg: '#FFF7ED',
    peachBorder: '#FED7AA',
    peachText: '#9A3412',
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
    muted: '#8B5CF6',
  },
  text: {
    primary: '#111827', // Crisp Deep Charcoal Ink (WCAG AAA contrast on all pastels)
    secondary: '#374151', // Crisp Medium Slate
    tertiary: '#6B7280', // Soft Muted Slate
    inverse: '#FFFFFF', // Pure White
    lightPrimary: '#F9FAFB',
  },
  semantic: {
    success: '#059669', // Emerald Mint
    warning: '#D97706', // Amber Coral
    danger: '#E11D48', // Rose Crimson
    info: '#0284C7', // Sky Blue
  },
  ai: {
    purple: '#7C3AED',
    rose: '#E11D48',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 50%, #E11D48 100%)',
  },
  border: {
    subtle: 'rgba(0, 0, 0, 0.08)',
    medium: 'rgba(124, 58, 237, 0.18)',
    rose: 'rgba(225, 29, 72, 0.20)',
  },
} as const;
