# Phase C3 – Client UI Design System
**Studio / Product:** PhotoMagic by RK – Photography Client Portal  
**Document Version:** 1.0.0  
**Status:** Single Source of Truth Design Tokens & Component Specification  

---

## 1. Brand Aesthetic Principles

The PhotoMagic by RK Client Portal is engineered to evoke **luxury, elegance, and effortless sophistication**. Inspired by high-end luxury fashion and fine-art editorial photography, the design system utilizes a dark-mode first canvas, champagne gold accents, rich typography, and glassmorphic subtle surfaces.

### Core Aesthetic Pillars:
1. **Dark Gold Palette:** Deep rich obsidian black base (`#0B0B0C`) paired with metallic champagne gold (`#D4AF37` / `#F3E5AB`) for premium brand framing.
2. **Visual Supremacy:** Minimalist chrome. Controls fade back to let photography remain the undisputed centerpiece.
3. **Tactile Elegance:** Micro-interactions feature fluid spring physics, subtle ambient glows, and clean 1px gold borders.
4. **Mobile Perfection:** High touch target precision, thumb-zone optimized navigation, and 60fps animations.

---

## 2. Color Palette & Tokens

### 2.1 CSS Custom Properties (`:root`)

```css
:root {
  /* Color Palette - Neutrals & Dark Surfaces */
  --color-bg-base:          hsl(240, 6%, 5%);     /* #0B0B0C - Obsidian Black */
  --color-bg-surface:       hsl(240, 5%, 9%);     /* #161618 - Deep Surface */
  --color-bg-elevated:      hsl(240, 5%, 13%);    /* #202023 - Elevated Card */
  --color-bg-overlay:       hsla(240, 6%, 5%, 0.8);/* Backdrop overlay */
  
  /* Color Palette - Champagne & Metallic Golds */
  --color-gold-primary:     hsl(45, 65%, 52%);    /* #D4AF37 - Classic Gold */
  --color-gold-light:       hsl(46, 75%, 72%);    /* #F3E5AB - Champagne Light */
  --color-gold-dark:        hsl(40, 60%, 35%);    /* #8C6D1F - Deep Bronze Gold */
  --color-gold-glow:        hsla(45, 65%, 52%, 0.25);
  
  /* Text & Foreground */
  --color-text-primary:     hsl(0, 0%, 98%);      /* #FAFAFA - Pure Off-White */
  --color-text-secondary:   hsl(240, 4%, 70%);    /* #B0B0B5 - Muted Silver */
  --color-text-tertiary:    hsl(240, 4%, 48%);    /* #7A7A80 - Dim Charcoal */
  --color-text-gold:        hsl(45, 65%, 56%);    /* Gold Text Header */
  
  /* Semantic Status Colors */
  --color-success:          hsl(142, 60%, 45%);   /* Emerald Green */
  --color-success-bg:       hsla(142, 60%, 45%, 0.12);
  --color-warning:          hsl(38, 92%, 50%);    /* Amber Warm */
  --color-warning-bg:       hsla(38, 92%, 50%, 0.12);
  --color-error:            hsl(354, 70%, 54%);   /* Crimson Red */
  --color-error-bg:         hsla(354, 70%, 54%, 0.12);
  --color-info:             hsl(210, 80%, 56%);   /* Sapphire Blue */
  --color-info-bg:          hsla(210, 80%, 56%, 0.12);

  /* Borders & Dividers */
  --color-border-subtle:    hsla(0, 0%, 100%, 0.08);
  --color-border-medium:    hsla(0, 0%, 100%, 0.16);
  --color-border-gold:      hsla(45, 65%, 52%, 0.4);
}
```

---

## 3. Typography Hierarchy

### 3.1 Font Families
* **Primary Sans (UI & Body):** `Plus Jakarta Sans`, `Inter`, -apple-system, sans-serif.
* **Display Serif (Headings & Luxury Accents):** `Cormorant Garamond`, `Playfair Display`, serif.
* **Monospace (File Codes & EXIF Data):** `JetBrains Mono`, `Fira Code`, monospace.

### 3.2 Typography Tokens Scale

| Role | Font Family | Size | Line Height | Weight | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Heading 1** | Serif | 48px (3rem) | 1.15 | 600 SemiBold | -0.02em |
| **Heading 2** | Serif | 36px (2.25rem) | 1.2 | 600 SemiBold | -0.01em |
| **Heading 3** | Sans | 24px (1.5rem) | 1.3 | 600 SemiBold | 0.00em |
| **Heading 4** | Sans | 20px (1.25rem) | 1.35 | 600 SemiBold | 0.00em |
| **Body Large** | Sans | 18px (1.125rem) | 1.5 | 400 Regular | 0.00em |
| **Body Regular** | Sans | 15px (0.9375rem)| 1.5 | 400 Regular | 0.01em |
| **Body Small** | Sans | 13px (0.8125rem)| 1.4 | 400 Regular | 0.01em |
| **Caption / Label** | Sans | 11px (0.6875rem)| 1.3 | 600 SemiBold | +0.05em (UPPERCASE) |

---

## 4. 8px Spacing System

All layouts, margins, paddings, and component sizes follow a strict 8px grid (with 4px micro-increments).

```css
:root {
  --space-1:   4px;   /* Micro gap */
  --space-2:   8px;   /* Extra Small */
  --space-3:  12px;   /* Compact */
  --space-4:  16px;   /* Small */
  --space-6:  24px;   /* Medium */
  --space-8:  32px;   /* Large */
  --space-12: 48px;   /* Extra Large */
  --space-16: 64px;   /* 2X Large Layout Section */
  
  --container-max-width: 1440px;
}
```

---

## 5. Border Radius & Shadows

```css
:root {
  /* Radii */
  --radius-xs:    4px;   /* Buttons, badges */
  --radius-sm:    8px;   /* Inputs, thumbnails */
  --radius-md:   12px;   /* Cards, dropdowns */
  --radius-lg:   16px;   /* Modals, banners */
  --radius-full: 9999px; /* Pill buttons, avatars */

  /* Elevation Shadows */
  --shadow-sm:   0 2px 4px rgba(0, 0, 0, 0.4);
  --shadow-md:   0 4px 16px rgba(0, 0, 0, 0.6);
  --shadow-lg:   0 12px 32px rgba(0, 0, 0, 0.8);
  --shadow-gold: 0 0 20px hsla(45, 65%, 52%, 0.25);
  
  /* Glassmorphism */
  --glass-bg:     rgba(22, 22, 24, 0.75);
  --glass-blur:   blur(16px);
  --glass-border: 1px solid rgba(255, 255, 255, 0.08);
}
```

---

## 6. Buttons Component Specification

Buttons support four primary variants, three size scales (Small, Medium, Large), and four interactive states (Default, Hover, Active, Disabled).

```
PRIMARY GOLD:      [ Send Access Link  -> ]  (Gold Gradient, Dark Text)
SECONDARY GLASS:   [ Review Album Proof   ]  (Dark Surface, White Text, Gold Border)
GHOST MINIMAL:     [ Cancel ]                (Transparent, Muted Text)
DANGER:            [ Delete Selection ]      (Crimson Red Surface, White Text)
```

```css
/* Button Variant Classes */
.btn-primary {
  background: linear-gradient(135deg, var(--color-gold-light), var(--color-gold-primary));
  color: #0B0B0C;
  font-weight: 600;
  border: none;
  box-shadow: var(--shadow-gold);
}

.btn-secondary {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-gold);
}

.btn-ghost {
  background: transparent;
  color: var(--color-text-secondary);
  border: none;
}

.btn-danger {
  background: var(--color-error);
  color: #FFFFFF;
  border: none;
}
```

---

## 7. Input Fields Component Specification

Form inputs incorporate floating labels, focus-visible gold rings, error helper text, and clear button triggers.

```
DEFAULT INPUT:
+-------------------------------------------------------+
|  Email Address or Mobile                              |
|  [ name@example.com                                 ] |
+-------------------------------------------------------+

FOCUS STATE:
+-------------------------------------------------------+
|  Email Address or Mobile                              |
|  [ name@example.com                                 ] | (Gold Border + Glow Ring)
+-------------------------------------------------------+

ERROR STATE:
+-------------------------------------------------------+
|  Email Address or Mobile                              |
|  [ invalid-email-format                             ] | (Red Border)
|  ⚠️ Please enter a valid email address.              |
+-------------------------------------------------------+
```

---

## 8. Cards Component Specification

Cards provide structural grouping across three distinct visual styles:

1. **Standard Surface Card:** Flat dark background (`--color-bg-surface`), 1px subtle border, 12px radius.
2. **Glassmorphic Interactive Card:** Translucent glass surface (`backdrop-filter: blur(16px)`), subtle gold border hover lift (`transform: translateY(-2px)`).
3. **Action Callout Card:** Accent card with left 4px vertical gold highlight indicator bar and primary CTA.

---

## 9. Badges & Tags

Status indicators feature high-contrast background tints with matching foreground text:

```
[ Published ]  --> Green (Success)   bg: hsla(142, 60%, 45%, 0.15)
[ Pending ]    --> Amber (Warning)   bg: hsla(38, 92%, 50%, 0.15)
[ Locked ]     --> Gold (Primary)    bg: hsla(45, 65%, 52%, 0.15)
[ Unpaid ]     --> Red (Danger)      bg: hsla(354, 70%, 54%, 0.15)
[ Draft ]      --> Silver (Neutral)  bg: hsla(0, 0%, 100%, 0.10)
```

---

## 10. Progress Indicators

### 10.1 Milestone Stepper
Linear multi-step node component showing completed steps with a gold checkmark icon, current active step with a gold pulsing ring, and incomplete future steps in muted charcoal.

### 10.2 Progress Bar
```css
.progress-bar-fill {
  background: linear-gradient(90deg, var(--color-gold-dark), var(--color-gold-primary), var(--color-gold-light));
  height: 8px;
  border-radius: var(--radius-full);
  transition: width 300ms ease-out;
}
```

---

## 11. Navigation Bars

### 11.1 Sticky Header Navigation (Desktop >= 1024px)
* **Height:** 64px.
* **Background:** Glassmorphic dark overlay (`rgba(11, 11, 12, 0.85)` + `backdrop-filter: blur(12px)`).
* **Border:** 1px bottom border (`var(--color-border-subtle)`).
* **Elements:** Brand logo left; primary route pills center; notification bell + user dropdown right.

### 11.2 Fixed Bottom Navigation Bar (Mobile < 768px)
* **Height:** 60px fixed bottom.
* **Background:** Dark glass overlay with top 1px border.
* **Items:** 4 primary touch targets (`Dashboard`, `Gallery`, `Proof`, `Invoices`) with 20px icons and 10px labels.

---

## 12. Gallery Cards

Thumbnail cards feature a locked 3:2 or 1:1 image container ratio with lazy-loaded background placeholders.

```
GALLERY THUMBNAIL CARD:
+-------------------------------------------------------+
|  [ HIGH-RES PHOTOGRAPH CANVAS ]                       |
|                                                       |
|  Hover Overlay (Fades in 150ms):                      |
|  [♥ Favorite]  [✓ Select for Album]  [💬 Comment]     |
|                                                       |
|  Active Selected State:                               |
|  2px solid #D4AF37 border + Top-Right Gold Star Badge |
+-------------------------------------------------------+
```

---

## 13. Modals & Drawers

* **Center Modal:** Centered dialog container, max-width 560px, 16px radius, dark gold border, backdrop overlay dark blur.
* **Right Slide-Over Sheet:** Full-height drawer sliding in from right viewport edge (380px wide on desktop).
* **Mobile Bottom Sheet:** Draggable bottom drawer sliding up from viewport bottom edge with drag handle bar.

---

## 14. Toast Notifications

Toasts appear at top-right on desktop and bottom-center on mobile. Auto-dismiss after 4 seconds.

```
+-------------------------------------------------------+
|  ✓ Success                                        (X) |
|  Selection list locked and submitted to studio team!  |
+-------------------------------------------------------+
```

---

## 15. Skeleton Loaders & Shimmer Animation

Skeleton loaders mimic exact component geometry using an ambient dark pulse shimmer:

```css
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton-box {
  background: linear-gradient(90deg, #161618 25%, #202023 50%, #161618 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite ease-in-out;
  border-radius: var(--radius-sm);
}
```

---

## 16. Empty States & Loading States

* **Empty States:** Centered column container featuring a translucent circular icon badge (48x48px), 20px serif header, 14px muted body description, and a primary gold action button.
* **Loading States:** Centered gold dual-ring spinner + high-resolution blur-up image rendering.

---

## 17. Animation Guidelines

All animations utilize fluid cubic-bezier curves:

* **Micro Interactions (Buttons, Hover, Toggles):** `150ms cubic-bezier(0.4, 0, 0.2, 1)`
* **Layout Transitions (Tab Switches, Filters):** `300ms cubic-bezier(0.16, 1, 0.3, 1)`
* **Modal / Drawer Slide Animations:** `400ms cubic-bezier(0.16, 1, 0.3, 1)`

---

## 18. Icon Style

* **Library Standard:** `Lucide React` / clean 24px viewBox vector SVGs.
* **Stroke Weight:** 1.75px uniform stroke weight.
* **Color Rules:** Muted silver (`#B0B0B5`) in default state; Gold (`#D4AF37`) in active/selected state.

---

## 19. Light / Dark Theme Rules

* **Default Mode:** Dark mode is the **default and mandatory branding theme** for the PhotoMagic by RK Client Portal.
* **Contrast Compliance:** All text tokens meet or exceed **WCAG AA 4.5:1** contrast ratio against dark background surfaces (`#0B0B0C`).

---

## Conclusion & Implementation Handoff

This document completes **PHASE C3 – CLIENT UI DESIGN SYSTEM**. All future frontend CSS implementations, component primitives, and page builds will strictly consume the design tokens and component standards defined in this specification.
