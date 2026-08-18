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
        canvas: '#0F051D', // Deep Royal Violet Canvas
        charcoal: '#1A0B2E', // Plum Surface
        surface: {
          base: '#1C0D36', // Deep Royal Purple Surface
          elevated: '#28124D', // Elevated Royal Purple
          glass: 'rgba(28, 13, 54, 0.85)',
          light: '#FFF5F7', // Light Rose Surface
        },
        border: {
          subtle: 'rgba(124, 58, 237, 0.15)',
          muted: 'rgba(255, 255, 255, 0.08)',
          purple: 'rgba(124, 58, 237, 0.40)',
          rose: 'rgba(251, 113, 133, 0.40)',
          gold: 'rgba(251, 113, 133, 0.35)', // mapped to rose for backward compatibility
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
        // Backward-compat aliases mapped to Purple & Rose
        gold: {
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#A855F7', // Mapped to vibrant violet
          600: '#9333EA',
          700: '#7E22CE',
        },
        silver: '#E9D5FF', // Lavender Silver
        burgundy: '#581C87', // Deep Royal Violet
        emerald: '#10B981',
        ivory: '#FFF5F7', // Soft Rose Ivory
        mutedText: '#C4B5FD', // Soft Violet Text
        text: {
          primary: '#FFF5F7',
          secondary: '#E9D5FF',
          tertiary: '#A78BFA',
          dark: '#1E0A3C',
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#F43F5E',
          info: '#8B5CF6',
        },
      },
      fontFamily: {
        hero: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        body: ['Inter', '"Plus Jakarta Sans"', 'sans-serif'],
        nav: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
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
        museum: '0 20px 50px rgba(15, 5, 29, 0.85), 0 0 30px rgba(124, 58, 237, 0.15)',
        watch: '0 4px 20px rgba(124, 58, 237, 0.20)',
        glass: '0 8px 32px 0 rgba(15, 5, 29, 0.65)',
        kodakGlow: '0 0 25px rgba(168, 85, 247, 0.30)',
        purpleGlow: '0 0 25px rgba(124, 58, 237, 0.30)',
        roseGlow: '0 0 25px rgba(251, 113, 133, 0.35)',
        burgundyGlow: '0 0 25px rgba(88, 28, 135, 0.40)',
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
