# PhotoMagic Design Language (PDL) — 05. Layout System

## Layout Philosophy

The PhotoMagic Layout System provides a structural scaffolding that scales fluidly from 320px mobile viewports to ultra-wide 4K studio monitor setups (3840px).

---

## The 12-Column Grid Architecture

- **Columns**: 12 equal-width flexible columns.
- **Gutter**:
  - Desktop (`>= 1280px`): `32px` (`space-8`)
  - Tablet (`768px - 1279px`): `24px` (`space-6`)
  - Mobile (`< 768px`): `16px` (`space-4`)
- **Outer Margins / Padding**:
  - Studio Marketing: `max-w-7xl` (1280px) centered with responsive padding (`px-4 sm:px-6 lg:px-8`).
  - OS Workspace: Full-width fluid container with `24px` edge padding.

---

## Workspace Layout Patterns

```
+--------------------------------------------------------------------------+
|  TOP NAVIGATION HEADER (Height: 64px, Sticky z-40)                        |
+--------------+-----------------------------------------------------------+
| SIDEBAR NAV  |  MAIN WORKSPACE CANVAS                                   |
| (Width: 260px|  - Header Title Area (Height: 80px)                         |
| Collapsible  |  - High-Density Content Grid (12 Columns)                |
| to 72px)     |    [ Widget 1 (8 cols) ] [ Widget 2 (4 cols) ]            |
|              |    [ Data Table / Gallery Grid (12 cols)     ]            |
+--------------+-----------------------------------------------------------+
```

---

## Responsive Breakpoints Token Specification

| Token            | Value    | Target Device Class               |
| ---------------- | -------- | --------------------------------- |
| `breakpoint-xs`  | `375px`  | Compact Mobile                    |
| `breakpoint-sm`  | `640px`  | Standard Mobile Landscape         |
| `breakpoint-md`  | `768px`  | Tablet Portrait                   |
| `breakpoint-lg`  | `1024px` | Tablet Landscape / Compact Laptop |
| `breakpoint-xl`  | `1280px` | Desktop Monitor                   |
| `breakpoint-2xl` | `1536px` | Large Desktop / Workstation       |
| `breakpoint-3xl` | `1920px` | Full HD / 4K Retinal Workstation  |

---

## Layout Density Modes

1. **Editorial Mode (Studio Marketing & Portfolio)**:
   - Expansive padding (`py-24 lg:py-32`), generous whitespace around images, single-column focus or asymmetric 2-column editorial split.
2. **Productivity Mode (OS Platform & AI Studio)**:
   - High-density information display (`py-6 px-6`), tight component spacing (`gap-4`), sticky toolbars, fixed sidebar + scrollable canvas.
