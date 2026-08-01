# PhotoMagic Design Language (PDL) — 02. Visual Philosophy

## Visual DNA

The visual DNA of PhotoMagic is grounded in **Photography-First Design**. The user interface is not the hero—the photograph is the hero. The UI provides a pristine, glassmorphic stage upon which high-resolution imagery takes center stage.

---

## The 5 Laws of PhotoMagic Visual Design

### Law 1: The Image Precedes the Interface

- Interface containers must never obscure subject material unless triggered by intentional user hover or modal inspection.
- Content overlays use dark frosted glass (`rgba(10, 10, 10, 0.75)` with `backdrop-blur-md`) to maintain legibility without disconnecting from the background media.

### Law 2: Dark Mode Dominance with Luminous Accents

- Deep charcoal & obsidian backgrounds (`#050505` to `#121212`) serve as the foundation.
- Pure dark backgrounds prevent eye fatigue during multi-hour photo culling and album editing sessions while enhancing color contrast for photographs.
- Luminous champagne gold (`#D4AF37` / `#E5C158`) and ambient metallic accents are reserved strictly for primary interactive focus.

### Law 3: Spatial Rhythm over Decorative Divider Lines

- Separation is achieved through spatial scale, subtle background contrast steps (e.g., `#0A0A0A` vs `#141414`), and 1px border outlines with `rgba(255, 255, 255, 0.08)` opacity.
- Heavy solid dividers are strictly forbidden.

### Law 4: Depth & Layering (Glassmorphism Matrix)

- The environment consists of 4 elevation planes:
  1. **Canvas Plane** (`z-0`): Deep background (`#050505`).
  2. **Surface Plane** (`z-10`): Cards, sidebars, tool panels (`#0D0D0D` with 1px border `rgba(255,255,255,0.06)`).
  3. **Floating Plane** (`z-30`): Popovers, dropdown menus, context tooltips (`rgba(18, 18, 18, 0.85)` + `backdrop-blur-lg`).
  4. **Modal Plane** (`z-50`): Fullscreen lightboxes, critical dialogs (`rgba(0,0,0,0.9)` + `backdrop-blur-xl`).

### Law 5: Mathematical Grid Alignment

- Every component adheres to an absolute 4px/8px baseline grid system. All padding, margins, gaps, and line heights are exact multiples of 4px.
