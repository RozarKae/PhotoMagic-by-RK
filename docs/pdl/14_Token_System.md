# PhotoMagic Design Language (PDL) — 14. Token System Architecture

## Overview

Design Tokens are the atomic building blocks of the PhotoMagic Design Language. They decouple style definitions from specific framework implementations (React, CSS, Tailwind, Mobile).

---

## Token Taxonomy & Naming Convention

Tokens follow a 3-tier hierarchy:

1. **Global/Option Tokens**: Raw value definitions (`color-gold-500: #D4AF37`, `space-16: 1rem`).
2. **Alias/Semantic Tokens**: Purpose-bound definitions (`color-brand-primary: var(--color-gold-500)`, `spacing-card-padding: var(--space-16)`).
3. **Component Tokens**: Element-bound definitions (`button-primary-bg: var(--color-brand-primary)`).

---

## Token Export Surface Summary

```typescript
export interface PDLTokenSystem {
  colors: {
    base: { bg: string; surface: string; surfaceHover: string; active: string };
    brand: { raw: string; light: string; glow: string; muted: string };
    text: { primary: string; secondary: string; tertiary: string; inverse: string };
    semantic: { success: string; warning: string; danger: string; info: string };
    ai: { violet: string; cyan: string; gradient: string };
    border: { subtle: string; medium: string; gold: string };
  };
  spacing: Record<string, string>;
  radius: Record<string, string>;
  elevation: Record<string, string>;
  typography: Record<string, { fontSize: string; lineHeight: string; fontWeight: number }>;
  motion: { curves: Record<string, number[]>; duration: Record<string, string> };
  breakpoints: Record<string, string>;
  zIndex: Record<string, number>;
}
```
