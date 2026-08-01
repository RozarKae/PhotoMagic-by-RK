/** @type {import('tailwindcss').Config} */
const config: any = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        canvas: '#060608', // Deep Obsidian Black
        surface: {
          base: '#0E0E12', // Matte Graphite / Charcoal
          elevated: '#14141A', // Elevated Charcoal
          glass: 'rgba(14, 14, 18, 0.85)',
        },
        border: {
          subtle: 'rgba(212, 175, 55, 0.14)', // Hairline gold tint
          muted: 'rgba(255, 255, 255, 0.08)',
        },
        gold: {
          300: '#F3E5AB',
          400: '#E5C158',
          500: '#D4AF37', // Royal Warm Gold
          600: '#B59226',
          700: '#8C7323',
        },
        emerald: {
          400: '#34D399',
          500: '#10B981', // Emerald Accent
          600: '#059669',
        },
        ivory: '#F6F3EE', // Warm Off-White / Ivory
        silver: '#A0A0AA', // Muted Gray / Silver
        bronze: '#C5A059', // Metallic Muted Bronze
        text: {
          primary: '#F6F3EE',
          secondary: '#A0A0AA',
          tertiary: '#70707B',
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B', // Luxury Amber
          error: '#EF4444', // Soft Crimson
          info: '#64748B', // Muted Slate
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
        md: '10px',
        lg: '14px',
        xl: '18px',
        '2xl': '24px',
        full: '9999px',
      },
      boxShadow: {
        museum: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.05)',
        watch: '0 4px 20px rgba(212, 175, 55, 0.15)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        goldGlow: '0 0 25px rgba(212, 175, 55, 0.20)',
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
