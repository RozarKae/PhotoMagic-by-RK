/** @type {import('tailwindcss').Config} */
const config: any = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/design-language/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#FFF5F7', // Light Rose Quartz Canvas
        charcoal: '#FDF2F4', // Soft Rose Tint
        surface: {
          base: '#FFFFFF', // Pure Crisp White
          elevated: '#FAF5FF', // Soft Lavender Elevated Surface
          glass: 'rgba(255, 255, 255, 0.90)',
          dark: '#1E0A3C', // Deep Velvet Aubergine
        },
        border: {
          subtle: 'rgba(124, 58, 237, 0.12)',
          muted: 'rgba(0, 0, 0, 0.06)',
          purple: 'rgba(124, 58, 237, 0.25)',
          rose: 'rgba(225, 29, 72, 0.25)',
          gold: 'rgba(225, 29, 72, 0.20)',
        },
        purple: {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
          700: '#7E22CE',
          800: '#6B21A8',
          900: '#581C87',
          950: '#3B0764',
        },
        rose: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#F43F5E',
          600: '#E11D48',
          700: '#BE123C',
          800: '#9F1239',
          900: '#881337',
        },
        gold: {
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#9333EA',
          600: '#7E22CE',
          700: '#581C87',
        },
        silver: '#6B5B7B', // Refined Plum Slate
        burgundy: '#BE123C', // Deep Rose Crimson
        emerald: '#059669',
        ivory: '#1E0A3C', // Primary text mapped to deep aubergine for legibility
        mutedText: '#6B5B7B', // Soft Plum Slate
        text: {
          primary: '#1E0A3C', // Deep Aubergine
          secondary: '#4C1D95', // Royal Purple Subtext
          tertiary: '#6B5B7B', // Slate Violet
          dark: '#1E0A3C',
          light: '#FFFFFF',
        },
        status: {
          success: '#059669',
          warning: '#D97706',
          error: '#E11D48',
          info: '#7C3AED',
        },
      },
      fontFamily: {
        hero: [
          '"Glacial Indifference"',
          '"Illuma"',
          '"Now"',
          '"Plus Jakarta Sans"',
          'Inter',
          'sans-serif',
        ],
        heading: [
          '"Glacial Indifference"',
          '"Illuma"',
          '"Now"',
          '"Plus Jakarta Sans"',
          'Inter',
          'sans-serif',
        ],
        calligraphy: ['var(--font-calligraphy)', '"Great Vibes"', '"Alex Brush"', 'cursive'],
        body: [
          '"Now"',
          '"Glacial Indifference"',
          '"Illuma"',
          'Inter',
          '"Plus Jakarta Sans"',
          'sans-serif',
        ],
        nav: [
          '"Glacial Indifference"',
          '"Now"',
          '"Illuma"',
          '"Plus Jakarta Sans"',
          'Inter',
          'sans-serif',
        ],
        mono: ['"IBM Plex Mono"', 'monospace'],
        tamil: ['"Noto Sans Tamil"', '"Anek Tamil"', 'sans-serif'],
      },
      aspectRatio: {
        '2.39/1': '2.39 / 1',
        cinematic: '2.39 / 1',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '14px',
        xl: '18px',
        '2xl': '24px',
        full: '9999px',
      },
      boxShadow: {
        museum: '0 20px 50px rgba(124, 58, 237, 0.08), 0 0 30px rgba(225, 29, 72, 0.05)',
        watch: '0 4px 20px rgba(124, 58, 237, 0.12)',
        glass: '0 8px 32px 0 rgba(124, 58, 237, 0.06)',
        kodakGlow: '0 0 25px rgba(147, 51, 234, 0.18)',
        purpleGlow: '0 0 25px rgba(124, 58, 237, 0.18)',
        roseGlow: '0 0 25px rgba(225, 29, 72, 0.20)',
        burgundyGlow: '0 0 25px rgba(190, 18, 60, 0.25)',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
        '24': '96px',
      },
    },
  },
  plugins: [],
};

export default config;
