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
        canvas: '#090909', // Obsidian Black
        charcoal: '#141414', // Charcoal
        surface: {
          base: '#1D1D1D', // Graphite Surface
          elevated: '#242424', // Elevated Graphite
          glass: 'rgba(29, 29, 29, 0.85)',
        },
        border: {
          subtle: 'rgba(200, 200, 200, 0.10)',
          muted: 'rgba(255, 255, 255, 0.08)',
          gold: 'rgba(216, 177, 90, 0.35)',
        },
        gold: {
          300: '#F5E3BD',
          400: '#E6C678',
          500: '#D8B15A', // Kodak Gold Accent
          600: '#B8923F',
          700: '#967836',
        },
        silver: '#C8C8C8', // Film Silver Highlight
        burgundy: '#531A1A', // Deep Burgundy Accent
        emerald: '#0E6B56', // Occasional Emerald Accent
        ivory: '#F5F3EF', // Warm White Text
        mutedText: '#A7A7A7', // Muted Text
        text: {
          primary: '#F5F3EF',
          secondary: '#A7A7A7',
          tertiary: '#7D7D7D',
        },
        status: {
          success: '#0E6B56',
          warning: '#D8B15A',
          error: '#531A1A',
          info: '#C8C8C8',
        },
      },
      fontFamily: {
        hero: ['Cinzel', 'serif'],
        heading: ['Cormorant Garamond', 'serif'],
        body: ['Inter', 'sans-serif'],
        nav: ['Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      aspectRatio: {
        '2.39/1': '2.39 / 1', // Anamorphic Letterbox
        cinematic: '2.39 / 1',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        full: '9999px',
      },
      boxShadow: {
        museum: '0 20px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(216, 177, 90, 0.06)',
        watch: '0 4px 20px rgba(216, 177, 90, 0.15)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.65)',
        kodakGlow: '0 0 25px rgba(216, 177, 90, 0.20)',
        burgundyGlow: '0 0 25px rgba(83, 26, 26, 0.40)',
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
