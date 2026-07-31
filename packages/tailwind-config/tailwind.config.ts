import type { Config } from 'tailwindcss';

const config: Omit<Config, 'content'> = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        canvas: '#060606', // Absolute Black
        surface: {
          base: '#111111',
          elevated: '#171717',
          glass: 'rgba(17, 17, 17, 0.75)',
        },
        border: {
          subtle: 'rgba(212, 175, 55, 0.15)', // Hairline gold tint
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
        ivory: '#F6F3EE', // Luxury Cream/Ivory
        bronze: '#7B6B4F', // Muted Bronze
        silver: '#AEB4BA', // Silver Accent
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
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
        lg: '18px',
        xl: '28px',
        full: '9999px',
      },
      boxShadow: {
        museum: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.05)',
        watch: '0 4px 20px rgba(212, 175, 55, 0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
