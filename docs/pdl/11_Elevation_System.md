# PhotoMagic Design Language (PDL) — 11. Elevation System

## Elevation Philosophy

Elevation creates depth and visual hierarchy without heavy shadow clutter. In dark mode UI, elevation is expressed primarily through **surface color lightness steps**, **1px border opacity**, and **glassmorphic backdrop blurs**, supplemented by dark ambient shadows.

---

## The 5 Layer Elevation Architecture

```
Elevation Level 4: Modal / Lightbox (z-50)
  └─ Background: rgba(0,0,0,0.85) + backdrop-blur-xl
  └─ Border: rgba(255,255,255,0.15)
  └─ Shadow: 0 25px 50px -12px rgba(0,0,0,0.9)

Elevation Level 3: Popover / Floating Menu (z-30)
  └─ Background: #141414
  └─ Border: rgba(255,255,255,0.12)
  └─ Shadow: 0 10px 25px -5px rgba(0,0,0,0.7)

Elevation Level 2: Interactive Card Hover (z-20)
  └─ Background: #121212
  └─ Border: rgba(212,175,55,0.3)
  └─ Shadow: 0 8px 20px -4px rgba(0,0,0,0.5)

Elevation Level 1: Surface Panel / Base Card (z-10)
  └─ Background: #0D0D0D
  └─ Border: rgba(255,255,255,0.08)

Elevation Level 0: Root Canvas (z-0)
  └─ Background: #050505
```

---

## Border Radius Tokens

| Radius Token  | Value    | Applied Elements                                       |
| ------------- | -------- | ------------------------------------------------------ |
| `radius-none` | `0px`    | Fullscreen lightboxes, flush table borders             |
| `radius-sm`   | `4px`    | Badges, status tags, inline code blocks, EXIF pills    |
| `radius-md`   | `6px`    | Form inputs, buttons, dropdown menu containers         |
| `radius-lg`   | `8px`    | Standard cards, modal dialogs, widget containers       |
| `radius-xl`   | `12px`   | Large hero feature cards, client portal gallery frames |
| `radius-full` | `9999px` | User avatar circles, pill action toggles               |
