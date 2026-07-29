import type { Config } from 'tailwindcss';

const config: Omit<Config, 'content'> = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        canvas: '#0A0A0C',
        surface: {
          base: '#121216',
          elevated: '#1A1A20',
          glass: 'rgba(26, 26, 32, 0.75)',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
        },
        gold: {
          400: '#E5C158',
          500: '#D4AF37',
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
        },
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '24px',
      },
    },
  },
  plugins: [],
};

export default config;
