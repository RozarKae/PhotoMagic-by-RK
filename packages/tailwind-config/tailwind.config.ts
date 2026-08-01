import type { Config } from 'tailwindcss';

const config: Omit<Config, 'content'> = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        canvas: '#060606', // Deep Matte Black
        surface: {
          base: '#111111',
          elevated: '#171717',
          glass: 'rgba(17, 17, 17, 0.85)',
        },
        border: {
          subtle: 'rgba(212, 175, 55, 0.18)', // Hairline gold tint
        },
        gold: {
          400: '#E5C158',
          500: '#D4AF37', // Royal Gold
          600: '#B59226',
        },
        emerald: {
          400: '#149177',
          500: '#0B5D4C', // Deep Emerald
          600: '#074236',
        },
        ivory: '#F6F3EE', // Warm White / Ivory
        silver: '#AEB4BA', // Muted Gray / Silver
        bronze: '#7B6B4F', // Muted Bronze
        text: {
          primary: '#F6F3EE',
          secondary: '#AEB4BA',
          tertiary: '#7B6B4F',
        },
        status: {
          success: '#10B981',
          warning: '#D97706', // Luxury Amber
          error: '#EF4444', // Soft Crimson
          info: '#64748B', // Muted Slate (No Bright Blue)
        },
      },
      fontFamily: {
        hero: ['Cinzel', 'serif'],
        heading: ['Cormorant Garamond', 'serif'],
        body: ['Inter', 'sans-serif'],
        nav: ['Poppins', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        full: '9999px',
      },
      boxShadow: {
        museum: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.05)',
        watch: '0 4px 20px rgba(212, 175, 55, 0.15)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
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
