# PhotoMagic Studio Design Bible 2.0

**Master Design System & Visual Architecture Specification**

---

## 1. Vision & Ethos

PhotoMagic Studio operates as a **Royal Editorial Photography Studio** across **Tamil Nadu and Kerala**.

The visual experience blends five benchmark influences into one cohesive master identity:

- **Apple**: Uncompromising minimalist precision, generous whitespace, smooth typography hierarchy.
- **Leica**: Optical purity, authentic color science, sharp contrast, mechanical elegance.
- **Vogue Weddings**: High-fashion editorial layouts, full-bleed imagery, refined serif headlines.
- **Sabyasachi Weddings**: Royal Indian heritage, antique gold detailing, deep emerald tones, warm silk textures.
- **Aman Resorts**: Tranquil luxury, spatial breathing room, subtle glassmorphism, soft ambient shadows.

---

## 2. Color System & Design Tokens (`@photomagic/design-language`)

```ts
export const PDL_COLORS = {
  base: {
    bg: '#090909', // Obsidian Black (Primary Canvas)
    charcoal: '#141414', // Deep Charcoal (Secondary Containers)
    surface: '#1D1D1D', // Graphite Surface (Cards & Elevators)
    surfaceHover: '#242424', // Subtle Surface Hover State
    surfaceActive: '#2A2A2A', // Active Surface State
    overlay: 'rgba(9, 9, 9, 0.92)',
  },
  brand: {
    kodakGold: '#D8B15A', // Antique Gold (Primary Accent)
    emerald: '#0E6B56', // Royal Emerald (Secondary Accent)
    burgundy: '#531A1A', // Deep Burgundy (Warm Ambient Accent)
    filmSilver: '#C8C8C8', // Refined Silver (Secondary Text / Border)
    glow: 'rgba(216, 177, 90, 0.18)',
  },
  text: {
    primary: '#F5F3EF', // Warm Ivory (Primary Body & Headlines)
    secondary: '#A7A7A7', // Muted Silver (Descriptions & Labels)
    tertiary: '#7D7D7D', // Subdued Metadata Text
    inverse: '#090909', // Deep Black for Inverted Badges
  },
  border: {
    subtle: 'rgba(255, 255, 255, 0.10)',
    gold: 'rgba(216, 177, 90, 0.35)',
    emerald: 'rgba(14, 107, 86, 0.35)',
  },
} as const;
```

---

## 3. Radii & Geometry Specification

All UI cards, modals, and container wrappers enforce luxury rounded corners (20px to 32px):

```ts
export const PDL_RADIUS = {
  none: '0px',
  sm: '8px',
  md: '16px',
  lg: '20px', // Standard Cards & Buttons
  xl: '24px', // Large Display Cards & Modals
  xxl: '32px', // Hero Containers & Outer Wrappers
  full: '9999px',
} as const;
```

---

## 4. Typography Hierarchy

- **Headlines & Section Titles**: Editorial Serif (`font-heading`, `font-serif`, tracking `0.04em`).
- **Body Copy & Descriptions**: Clean Sans-Serif (`font-body`, `font-sans`, leading `relaxed`).
- **Metadata & Technical Specs**: Crisp Monospace (`font-mono`, uppercase tracking `0.2em`).

---

## 5. Canonical Homepage Experience Architecture

1. **Fullscreen Cinematic Hero**: Full-bleed AI portrait background (`hero_wedding_couple.png`), location HUD badges (_Madurai, Chennai, Kochi, Trivandrum_), and gold foil booking CTAs.
2. **Featured Weddings**: Spotlight gallery of 4 flagship weddings (Chettinad, Alleppey, Nikkah, Cathedral).
3. **Photography Categories**: 6 visual cards representing Weddings, Pre-Wedding, Family, School, Corporate, and Product photography.
4. **Portfolio Showcase**: Interactive Pinterest-style masonry grid with category filters.
5. **Our Experience**: 4-step photography workflow timeline (_Consultation_, _Live Coverage_, _Color Science_, _Album Release_).
6. **Luxury Packages**: Investment cards (_Silver ₹35k+_, _Gold ₹65k+_, _Platinum ₹1.2L+_) plus corporate & school rates.
7. **Client Stories**: Realistic client reviews from Tamil Nadu and Kerala.
8. **Photography Journey**: Immersive studio concierge booking form CTA.
9. **FAQ Section**: Photography coverage & album delivery questions.
10. **Contact Terminal**: Direct studio concierge inquiry form.
11. **Footer**: Clean editorial footer with regional locations and client portal access.

---

## 6. Execution Rules

- **No Improvisation**: Implement this design specification exactingly across `apps/studio` and `apps/os`.
- **Zero Functionality Alterations**: Do not change any backend code, Server Actions, Supabase client setup, Cloudinary storage modules, authentication, or routing.
