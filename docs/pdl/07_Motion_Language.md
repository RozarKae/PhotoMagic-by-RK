# PhotoMagic Design Language (PDL) — 07. Motion Language

## Motion Philosophy

Motion in PhotoMagic communicates **Luxury, Fluidity, Confidence, and Precision**. Motion is never flashy or distracting. It provides physical weight and spatial continuity across screen transitions.

---

## The 4 Laws of PhotoMagic Motion

1. **Never Delay the User**: UI state changes respond within `100ms`. Page transitions complete within `300ms`.
2. **Exponential Ease-Out Curves**: Motion starts smoothly and settles with zero harsh bouncing. We use custom cubic-bezier curves (`cubic-bezier(0.16, 1, 0.3, 1)`).
3. **Respect Reduced Motion Settings**: If `prefers-reduced-motion: reduce` is enabled, all structural transitions fall back to instant fade-in (`opacity` transition only, zero spatial displacement).
4. **Cinematic Image Reveals**: Photos reveal using a subtle zoom-out effect (from `scale(1.05)` to `scale(1.00)` over `400ms` with `opacity` fade).

---

## Motion Curve Presets

```typescript
export const MOTION_CURVES = {
  // Primary luxury transition curve for modals, drawers, and page reveals
  luxuryEase: [0.16, 1, 0.3, 1],

  // Micro-interaction curve for buttons, hovers, and toggles
  snapEase: [0.25, 1, 0.5, 1],

  // Smooth exit curve for dismissals
  exitEase: [0.7, 0, 0.84, 0],
};
```

---

## Motion Duration Tokens

| Token                 | Duration | Usage                                                      |
| --------------------- | -------- | ---------------------------------------------------------- |
| `duration-instant`    | `50ms`   | Immediate state toggle (Checkbox, Switch)                  |
| `duration-fast`       | `150ms`  | Button hover, tooltip reveal, dropdown menu                |
| `duration-normal`     | `250ms`  | Modal dialog enter, tab content swap, card expand          |
| `duration-slow`       | `400ms`  | Page route transition, fullscreen image lightbox reveal    |
| `duration-deliberate` | `600ms`  | Hero section ambient parallax, AI progress completion wave |

---

## Category-Specific Motion Guidelines

### Marketing & Portfolio (Studio)

- Ambient parallax scroll effects on large hero imagery.
- Staggered text block reveals (`50ms` delay per line).
- Image lightbox expands smoothly from the clicked thumbnail bounding box.

### Workspace & Operating System (OS Platform)

- Zero page refresh feel—instant tab switching using React transition state.
- Tool panels slide in cleanly from screen edges with `duration-normal`.
- Progress spinners for background AI tasks use continuous, smooth rotation (`1200ms` linear).
