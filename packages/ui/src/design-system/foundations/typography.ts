export const typography = {
  fontFamilies: {
    hero: ['Cinzel', 'serif'],
    heading: ['Cormorant Garamond', 'serif'],
    body: ['Inter', 'sans-serif'],
    nav: ['Poppins', 'sans-serif'],
    mono: ['IBM Plex Mono', 'monospace'],
  },
  scale: {
    displayXXL: {
      fontSize: '4.5rem', // 72px
      lineHeight: '1.08',
      letterSpacing: '0.04em',
      fontFamily: 'Cinzel',
      fontWeight: '700',
    },
    displayXL: {
      fontSize: '3.75rem', // 60px
      lineHeight: '1.1',
      letterSpacing: '0.04em',
      fontFamily: 'Cinzel',
      fontWeight: '700',
    },
    displayL: {
      fontSize: '3rem', // 48px
      lineHeight: '1.15',
      letterSpacing: '0.03em',
      fontFamily: 'Cinzel',
      fontWeight: '700',
    },
    headingXL: {
      fontSize: '2.5rem', // 40px
      lineHeight: '1.2',
      fontFamily: 'Cormorant Garamond',
      fontWeight: '700',
    },
    headingL: {
      fontSize: '2rem', // 32px
      lineHeight: '1.25',
      fontFamily: 'Cormorant Garamond',
      fontWeight: '600',
    },
    headingM: {
      fontSize: '1.5rem', // 24px
      lineHeight: '1.3',
      fontFamily: 'Cormorant Garamond',
      fontWeight: '600',
    },
    headingS: {
      fontSize: '1.25rem', // 20px
      lineHeight: '1.35',
      fontFamily: 'Cormorant Garamond',
      fontWeight: '600',
    },
    bodyXL: {
      fontSize: '1.125rem', // 18px
      lineHeight: '1.6',
      fontFamily: 'Inter',
      fontWeight: '400',
    },
    body: {
      fontSize: '1rem', // 16px
      lineHeight: '1.5',
      fontFamily: 'Inter',
      fontWeight: '400',
    },
    small: {
      fontSize: '0.875rem', // 14px
      lineHeight: '1.5',
      fontFamily: 'Inter',
      fontWeight: '400',
    },
    caption: {
      fontSize: '0.75rem', // 12px
      lineHeight: '1.4',
      fontFamily: 'Inter',
      fontWeight: '400',
    },
    label: {
      fontSize: '0.625rem', // 10px
      lineHeight: '1.3',
      fontFamily: 'Poppins',
      fontWeight: '600',
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
    },
    button: {
      fontSize: '0.75rem', // 12px
      lineHeight: '1',
      fontFamily: 'Poppins',
      fontWeight: '600',
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
    },
    statistic: {
      fontSize: '2rem', // 32px
      lineHeight: '1.1',
      fontFamily: 'IBM Plex Mono',
      fontWeight: '700',
    },
  },
} as const;

export type TypographyToken = typeof typography;
