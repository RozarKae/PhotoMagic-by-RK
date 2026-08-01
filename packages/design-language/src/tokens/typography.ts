export const PDL_TYPOGRAPHY = {
  fonts: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    serif: 'Playfair Display, Cormorant Garamond, serif',
    mono: 'JetBrains Mono, Fira Code, monospace',
  },
  styles: {
    displayHero: {
      fontSize: '4rem',
      lineHeight: '1.05',
      fontWeight: 400,
      letterSpacing: '-0.03em',
    },
    display1: { fontSize: '3rem', lineHeight: '1.10', fontWeight: 500, letterSpacing: '-0.02em' },
    display2: {
      fontSize: '2.25rem',
      lineHeight: '1.15',
      fontWeight: 500,
      letterSpacing: '-0.02em',
    },
    heading1: {
      fontSize: '1.75rem',
      lineHeight: '1.20',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    heading2: { fontSize: '1.375rem', lineHeight: '1.25', fontWeight: 600, letterSpacing: '0em' },
    heading3: { fontSize: '1.125rem', lineHeight: '1.30', fontWeight: 600, letterSpacing: '0em' },
    bodyLg: { fontSize: '1rem', lineHeight: '1.50', fontWeight: 400, letterSpacing: '0em' },
    bodyMd: { fontSize: '0.875rem', lineHeight: '1.45', fontWeight: 400, letterSpacing: '0em' },
    bodySm: { fontSize: '0.75rem', lineHeight: '1.40', fontWeight: 400, letterSpacing: '0.01em' },
    caption: {
      fontSize: '0.6875rem',
      lineHeight: '1.35',
      fontWeight: 500,
      letterSpacing: '0.03em',
    },
    monoData: { fontSize: '0.75rem', lineHeight: '1.40', fontWeight: 400, letterSpacing: '0em' },
  },
} as const;
