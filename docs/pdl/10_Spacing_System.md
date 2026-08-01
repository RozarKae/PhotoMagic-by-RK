# PhotoMagic Design Language (PDL) — 10. Spacing System

## Spacing Philosophy

Spacing in PhotoMagic is governed by a mathematical **4px Baseline Grid**. Arbitrary spacing values (`13px`, `27px`) are strictly forbidden. All margins, padding, gaps, and component sizes are multiples of 4px.

---

## Token Scale Matrix

| Token      | Rem Value | Pixel Equivalent | Primary Application                                  |
| ---------- | --------- | ---------------- | ---------------------------------------------------- |
| `space-1`  | `0.25rem` | `4px`            | Micro gaps between icon and text label               |
| `space-2`  | `0.5rem`  | `8px`            | Tight inline padding, badge internal padding         |
| `space-3`  | `0.75rem` | `12px`           | Compact button padding, input field vertical padding |
| `space-4`  | `1rem`    | `16px`           | Standard container inner padding, card gaps          |
| `space-6`  | `1.5rem`  | `24px`           | Large component padding, widget header margins       |
| `space-8`  | `2rem`    | `32px`           | Grid layout gaps, section sub-group margins          |
| `space-12` | `3rem`    | `48px`           | Major section breaks in workspace pages              |
| `space-16` | `4rem`    | `64px`           | Marketing hero padding, editorial splits             |
| `space-24` | `6rem`    | `96px`           | Studio homepage major section vertical padding       |
| `space-32` | `8rem`    | `128px`          | Maximum editorial whitespace separation              |

---

## Layout Density Specifications

```
PRODUCTIVITY DENSITY (OS Workspace):
+-------------------------------------------------------+
| Padding: 24px (space-6)                               |
| Component Gap: 16px (space-4)                         |
| Table Cell Padding: 12px (space-3)                    |
+-------------------------------------------------------+

EDITORIAL DENSITY (Studio Marketing):
+-------------------------------------------------------+
| Section Vertical Padding: 96px - 128px (space-24/32)  |
| Component Gap: 32px - 48px (space-8/12)               |
| Container Max-Width: 1280px                           |
+-------------------------------------------------------+
```
