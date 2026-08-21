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
        canvas: '#FAF8FC', // Crisp Soft Pastel Canvas
        charcoal: '#F5F0FA', // Soft Pastel Tint
        surface: {
          base: '#FFFFFF', // Pure Crisp White
          elevated: '#FAF5FF', // Soft Lavender Elevated Surface
          glass: 'rgba(255, 255, 255, 0.94)',
          dark: '#0F091A', // Deep Midnight Aubergine
        },
        pastel: {
          lavender: '#FAF5FF',
          lavenderBorder: '#E9D5FF',
          lavenderText: '#6B21A8',
          rose: '#FFF1F2',
          roseBorder: '#FECDD3',
          roseText: '#9F1239',
          mint: '#F0FDF4',
          mintBorder: '#BBF7D0',
          mintText: '#166534',
          amber: '#FFFBEB',
          amberBorder: '#FDE68A',
          amberText: '#92400E',
          sky: '#F0F9FF',
          skyBorder: '#BAE6FD',
          skyText: '#075985',
          peach: '#FFF7ED',
          peachBorder: '#FED7AA',
          peachText: '#9A3412',
        },
        border: {
          subtle: 'rgba(0, 0, 0, 0.08)',
          muted: 'rgba(0, 0, 0, 0.05)',
          purple: 'rgba(124, 58, 237, 0.20)',
          rose: 'rgba(225, 29, 72, 0.20)',
          gold: 'rgba(217, 119, 6, 0.20)',
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
          300: '#FDE68A',
          400: '#FCD34D',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        emerald: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        sky: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        silver: '#64748B', // Crisp Slate 500
        burgundy: '#BE123C', // Deep Rose Crimson
        ivory: '#111827', // Crisp Primary Dark Ink
        mutedText: '#4B5563', // Crisp Slate 600
        text: {
          primary: '#111827', // Deep Slate 900 Charcoal (Ultra-crisp & visible)
          secondary: '#374151', // Slate 700
          tertiary: '#6B7280', // Slate 500
          dark: '#111827',
          light: '#FFFFFF',
        },
        status: {
          success: '#059669',
          warning: '#D97706',
          error: '#E11D48',
          info: '#0284C7',
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
