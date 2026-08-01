# PhotoMagic Design Language (PDL) — 03. Color Language

## Color Philosophy

Color in PhotoMagic is purposeful, functional, and deeply restrained. Color is never used for mere decoration. Every hue communicates state, brand identity, or AI intelligence.

---

## Palette Architecture

### 1. Canvas & Obsidian Surfaces (Dark Mode Base)

- `color-bg-base`: `#050505` (Root canvas, deepest background)
- `color-bg-surface`: `#0D0D0D` (Default card, panel, and widget container)
- `color-bg-surface-hover`: `#141414` (Hover state for interactive cards)
- `color-bg-surface-active`: `#1A1A1A` (Active/selected state)
- `color-bg-overlay`: `rgba(0, 0, 0, 0.85)` (Modal backdrop mask)

### 2. Luxury Gold & Brand Accents

- `color-brand-gold-raw`: `#D4AF37` (Base metallic gold)
- `color-brand-gold-light`: `#F3E5AB` (Subtle gold highlight)
- `color-brand-gold-glow`: `rgba(212, 175, 55, 0.15)` (Ambient focus glow)
- `color-brand-gold-muted`: `#8C7323` (De-emphasized metallic badge border)

### 3. Neutral Typography Tokens

- `color-text-primary`: `#F5F5F7` (95% white, primary headings & titles)
- `color-text-secondary`: `#A1A1AA` (Muted body text, metadata, secondary labels)
- `color-text-tertiary`: `#71717A` (Disabled labels, placeholder text)
- `color-text-inverse`: `#050505` (Text on bright gold or white buttons)

### 4. Semantic & Functional Indicators

- `color-semantic-success`: `#10B981` (Completed shoot, invoice paid, AI task done)
- `color-semantic-warning`: `#F59E0B` (Pending proofing approval, storage low)
- `color-semantic-danger`: `#EF4444` (Delete confirmation, payment overdue, error)
- `color-semantic-info`: `#3B82F6` (System notifications, active upload)

### 5. AI Intelligence Accent Spectrum

- `color-ai-violet`: `#8B5CF6` (AI Face Enhancement, Smart Culling)
- `color-ai-cyan`: `#06B6D4` (AI Upscaling, Auto Color Grading)
- `color-ai-gradient`: `linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)`

### 6. Borders & Glass Strokes

- `color-border-subtle`: `rgba(255, 255, 255, 0.08)` (Standard structural dividers)
- `color-border-medium`: `rgba(255, 255, 255, 0.16)` (Hover container outline)
- `color-border-gold`: `rgba(212, 175, 55, 0.40)` (Selected active card outline)
