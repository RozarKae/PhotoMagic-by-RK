# PhotoMagic Design Language (PDL) — 08. Interaction Language

## Interaction Philosophy

Interaction in PhotoMagic feels tactile, direct, and responsive. Whether a user is clicking a button, dragging an album layout spread, scrolling through a 5,000-photo shoot gallery, or using keyboard shortcuts, every interaction produces instant, deterministic feedback.

---

## Modality Guidelines

### 1. Pointer (Mouse & Trackpad)

- **Hover Affordance**: Interactive elements subtly highlight (`color-bg-surface-hover` fill or `color-border-medium` stroke) within 150ms of hover.
- **Cursor Context**:
  - `cursor-pointer`: Buttons, links, selectable photos.
  - `cursor-grab` / `cursor-grabbing`: Canvas pan, album page arrangement.
  - `cursor-zoom-in`: Portfolio image inspect mode.

### 2. Keyboard Navigation & Focus State

- **Focus Ring System**: Keyboard navigation displays a high-visibility, 2px gold focus ring (`outline: 2px solid #D4AF37; outline-offset: 2px`).
- **Global Keyboard Shortcuts (OS Platform)**:
  - `Cmd / Ctrl + K`: Global Command Palette search.
  - `Spacebar`: Toggle photo quick preview in culling mode.
  - `1` - `5`: Star rating assigned to active photo asset.
  - `Esc`: Close open modal, panel, or inspect mode.

### 3. Touch & Mobile Gesture Support

- Touch targets have a minimum hit footprint of `44px x 44px`.
- Swipe gestures supported for client gallery lightbox (Swipe Left = Next Image, Swipe Right = Previous Image, Swipe Down = Close Lightbox).

---

## Feedback Loop Architecture

```
User Action (Click / Key / Drag)
    │
    ├─ Immediate Visual Feedback (< 50ms): Active scale transform (0.98x)
    │
    ├─ Immediate Haptic/Audio (Mobile/Tablet optional): Subtle tick feedback
    │
    └─ Async State Feedback (> 200ms): Inline micro-spinner or progress indicator
```
