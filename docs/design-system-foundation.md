# PhotoMagic Studio OS — Design System & UI Foundation (Phase 0.7)

---

> **Document Status**: Master Design System Specification (v1.0)  
> **Role**: Principal Product Designer & Design Systems Architect  
> **Target Applications**: Public Site, Client Portal, Admin Command, Staff Workspace  
> **Aesthetic Benchmarks**: Apple, Linear, Stripe, Airbnb, Leica, Notion  
> **Accessibility Standard**: WCAG 2.1 AA / AAA Compliant  

---

## 1. Brand Design Principles

The design system for PhotoMagic Studio OS is anchored around 5 core principles:

1. **Uncompromising Spatial Luxury**: Generous whitespace, refined typography, zero administrative clutter.
2. **Media-First Focus**: The photography is the hero. UI chrome recedes into the background (`backdrop-filter`, dark translucent acrylics) to let media shine.
3. **Frictionless Precision**: Every interaction feels immediate, crisp, and predictable—inspired by high-end camera mechanics (Leica, Hasselblad).
4. **Contextual Action Clarity**: Present the right tools at the right moment. Never overwhelm the user with dense legacy dashboard layouts.
5. **Mobile-Native Ergonomics**: Every client-facing experience feels native on iOS and Android with natural thumb zones and subtle haptics.

---

## 2. Visual Identity & Design Philosophy

The visual identity relies on **Minimalist Glassmorphism** and **Cinematic Dark/Light Contrast**. 

- **Dark Mode (Default)**: Deep obsidian backgrounds (`#0A0A0C`), translucent dark glass overlays, subtle warm champagne gold accents (`#D4AF37`), crisp typography.
- **Light Mode**: Pure alabaster canvas (`#FAFAFC`), soft elevated white surfaces, subtle neutral gray borders, rich charcoal text.

---

## 3. Design Tokens Architecture

Design tokens are structured into 3 tiers:
1. **Global Tokens**: Primitive values (e.g. `color-obsidian-900: #0A0A0C`).
2. **Semantic Tokens**: Contextual meanings (e.g. `bg-canvas: var(--color-obsidian-900)`).
3. **Component Tokens**: Element specific (e.g. `button-primary-bg: var(--color-gold-500)`).

---

## 4. Design Tokens Specification

### 4.1 Color System & Semantic Tokens

#### Neutral Base Palette (Dark Theme Default)
| Token Name | Hex Code | HSL Representation | Semantic Usage |
|:---|:---|:---|:---|
| `--color-canvas` | `#0A0A0C` | `hsl(240, 9%, 4%)` | Primary Application Background |
| `--color-surface-base` | `#121216` | `hsl(240, 10%, 8%)` | Cards, Drawers, Sidebar Base |
| `--color-surface-elevated` | `#1A1A20` | `hsl(240, 10%, 11%)` | Modals, Popovers, Floating Bars |
| `--color-surface-glass` | `rgba(26, 26, 32, 0.75)` | - | Glassmorphic cards (`backdrop-blur: 20px`) |
| `--color-border-subtle` | `rgba(255, 255, 255, 0.08)` | - | Divider lines, card outlines |
| `--color-text-primary` | `#F4F4F6` | `hsl(240, 10%, 96%)` | Headings, Primary Labels |
| `--color-text-secondary` | `#A1A1AA` | `hsl(240, 5%, 65%)` | Subtitles, Body Text, Meta tags |
| `--color-text-tertiary` | `#71717A` | `hsl(240, 5%, 46%)` | Captions, Disabled Labels |

#### Brand Accent & State Colors
| Token Name | Hex Code | HSL Representation | Semantic Usage |
|:---|:---|:---|:---|
| `--color-gold-500` | `#D4AF37` | `hsl(46, 65%, 52%)` | Primary Accent / CTAs / Highlights |
| `--color-gold-400` | `#E5C158` | `hsl(46, 73%, 62%)` | Button Hover State |
| `--color-status-success` | `#10B981` | `hsl(160, 84%, 39%)` | Deposit Paid, Approved, Active |
| `--color-status-warning` | `#F59E0B` | `hsl(38, 92%, 50%)` | Pending Review, Selection In Progress |
| `--color-status-error` | `#EF4444` | `hsl(0, 84%, 60%)` | Overdue, Declined, Error State |
| `--color-status-info` | `#3B82F6` | `hsl(217, 91%, 60%)` | Info Banners, Processing |

---

### 4.2 Typography System

- **Primary Font Family**: `Inter` / System Sans (`-apple-system`, `BlinkMacSystemFont`).
- **Display Font Family**: `Outfit` or `Playfair Display` (for luxury portfolio headings).
- **Monospace Font Family**: `JetBrains Mono` (for metadata, EXIF, invoice IDs).

| Type Scale Token | Font Size | Line Height | Weight | Letter Spacing | Target Use |
|:---|:---|:---|:---|:---|:---|
| `--text-display-xl` | 56px (3.5rem) | 1.1 | 700 (Bold) | -0.02em | Hero Landing Headlines |
| `--text-display-lg` | 40px (2.5rem) | 1.15 | 600 (SemiBold) | -0.02em | Page Titles |
| `--text-heading-md` | 28px (1.75rem) | 1.2 | 600 (SemiBold) | -0.01em | Section Headers |
| `--text-title-sm` | 20px (1.25rem) | 1.3 | 500 (Medium) | 0.00em | Card Titles, Modal Headers |
| `--text-body-lg` | 18px (1.125rem) | 1.5 | 400 (Regular) | 0.00em | Lead Paragraphs |
| `--text-body-md` | 15px (0.9375rem)| 1.5 | 400 (Regular) | 0.00em | Standard Interface Text |
| `--text-caption` | 13px (0.8125rem)| 1.4 | 400 (Regular) | 0.01em | EXIF metadata, Badges |
| `--text-micro` | 11px (0.6875rem)| 1.3 | 600 (SemiBold) | 0.05em (UPPER) | Status Badges, Chips |

---

### 4.3 Spacing & Layout Tokens

Built on an **8px Baseline Grid** (with 4px sub-grid for fine optical alignment).

| Token | Value | Rem Equivalent | Target Application |
|:---|:---|:---|:---|
| `--space-1` | 4px | 0.25rem | Icon gaps, inline padding |
| `--space-2` | 8px | 0.5rem | Small button padding, chip gaps |
| `--space-3` | 12px | 0.75rem | Form input padding, card gaps |
| `--space-4` | 16px | 1.0rem | Standard container padding |
| `--space-6` | 24px | 1.5rem | Card internal padding |
| `--space-8` | 32px | 2.0rem | Grid gap spacing |
| `--space-12` | 48px | 3.0rem | Section gaps |
| `--space-16` | 64px | 4.0rem | Page section margins |

---

### 4.4 Corner Radius Tokens

| Token | Value | Target UI Elements |
|:---|:---|:---|
| `--radius-sm` | 6px | Tooltips, Small Badges |
| `--radius-md` | 10px | Form Inputs, Buttons, Small Cards |
| `--radius-lg` | 16px | Main Cards, Gallery Thumbnails, Drawers |
| `--radius-xl` | 24px | Floating Action Bars, Modals |
| `--radius-full` | 9999px | Avatars, Pill Buttons, Notification Badges |

---

### 4.5 Elevation & Shadow Tokens

| Token | Box Shadow Spec | Elevation Context |
|:---|:---|:---|
| `--shadow-flat` | `0 1px 2px 0 rgba(0, 0, 0, 0.05)` | Flat elements |
| `--shadow-card` | `0 4px 20px -2px rgba(0, 0, 0, 0.35)` | Gallery cards, hover states |
| `--shadow-modal` | `0 20px 40px -8px rgba(0, 0, 0, 0.60)` | Floating modals, Lightbox chrome |
| `--shadow-glow` | `0 0 24px -4px rgba(212, 175, 55, 0.35)` | Active selection badges, primary CTAs |

---

### 4.6 Motion & Easing Tokens

| Motion Token | Duration | Easing Curve | Application |
|:---|:---|:---|:---|
| `--ease-fast` | 150ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Button hovers, checkbox toggles |
| `--ease-spring` | 300ms | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Heart favorite bump, selection counter glow |
| `--ease-drawer` | 400ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Slide-over drawers, mobile glass dock entrance |
| `--ease-cinema` | 600ms | `cubic-bezier(0.22, 1, 0.36, 1)` | Lightbox open, full-screen image transitions |

---

## 5. Theme Strategy (Light vs Dark vs White-Label)

- **Default Theme**: Obsidian Dark Theme (Optimized for viewing high-contrast photographs).
- **White-Label Studio Customization Token Map**:
  - `--studio-brand-primary`: Studio owner accent color (Defaults to `#D4AF37`).
  - `--studio-brand-logo`: Custom studio SVG logo URL.
  - `--studio-font-family`: Custom font stack override option.

---

## 6. Layout & Grid System

- **Breakpoints**:
  - **Mobile (`sm`)**: `375px - 639px` (Single column, bottom glass dock navigation).
  - **Tablet (`md`)**: `640px - 1023px` (2-column split-pane layout).
  - **Desktop (`lg`)**: `1024px - 1439px` (12-column grid, 260px collapsible sidebar).
  - **Ultra-Wide (`xl`)**: `1440px+` (Max content container `1400px` centered).

---

## 7. Component Catalog & Inventory

### 7.1 Buttons & Interactive Controls
- **Primary Luxury Button**: Gold fill (`--color-gold-500`), dark text, subtle hover glow, 150ms spring physics.
- **Secondary Glass Button**: Translucent dark acrylic background, 1px white border (`0.08` opacity), text primary.
- **Ghost Icon Button**: Borderless 40x40px touch target with subtle background tint on hover.

### 7.2 Media & Gallery Card Primitives
- **Photo Thumbnail Card**:
  - Aspect ratio switcher (Masonry natural vs 1:1 Square vs 16:9 Cinema).
  - Favorite Heart Pill (Top-Right): Translucent dark pill with heart icon that fills gold on active selection.
  - Selection Index Badge (Top-Left): Displays numerical order (`#1`, `#2`) when selected for album proofing.

### 7.3 Navigation Controls
- **Desktop Sidebar**: Collapsible left rail with active item indicator gold left border line (`3px`).
- **Mobile Bottom Dock**: Floating 64px glass bar (`backdrop-blur: 24px`, rounded `32px`) containing 4 anchor navigation icons.

---

## 8. State Feedback Systems

| State | Visual Behavior | Accessibility Treatment |
|:---|:---|:---|
| **Hover** | Surface elevation shift + `scale(1.02)` + subtle border brightness boost. | `cursor: pointer` |
| **Active / Pressed** | `scale(0.98)` spring press down. | Haptic feedback trigger on touch |
| **Focus** | Glowing 2px gold focus ring (`--color-gold-500`). | `:focus-visible` ring outline |
| **Disabled** | 40% opacity, greyed text, no hover state. | `aria-disabled="true"`, `pointer-events: none` |
| **Loading** | Inline shimmering skeleton loader or subtle rotating spinner ring. | `aria-busy="true"` |

---

## 9. Accessibility Standards (WCAG 2.1 AA / AAA Target)

- **Color Contrast Guarantee**: Text colors maintain minimum **4.5:1** contrast ratio against dark backgrounds (`#0A0A0C`) and light canvas backgrounds.
- **Keyboard Navigation Hotkeys**:
  - `Space` / `F`: Toggle Favorite on focused photo card.
  - `Left` / `Right Arrow`: Traverse photo lightbox images.
  - `Esc`: Close drawers, modals, and lightboxes.
- **Screen Reader Compliance**: All interactive buttons feature explicit `aria-label` descriptions (e.g. `aria-label="Select photo 084 for album proofing"`).

---

## 10. Summary & Next Steps

This **Design System & UI Foundation** serves as the single source of truth for all user interface development across PhotoMagic Studio OS. All frontend components built in Next.js, Tailwind CSS, or Framer Motion must adhere strictly to these token values, component specifications, and accessibility rules.
