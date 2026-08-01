# PhotoMagic Design Language (PDL) — 04. Typography System

## Typography Philosophy

Typography in PhotoMagic bridges editorial luxury with software clarity. We use a dual typeface strategy:

1. **Display & Editorial**: Serif elegance for luxury headlines, editorial showcases, and client portal intros.
2. **Interface & Data**: Modern sans-serif with tight geometric kerning for high-density workspace UI, data tables, and AI status readouts.

---

## Typeface Selection

- **Primary Sans (UI / Workspace)**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`
- **Editorial Serif (Display / Marketing)**: `Playfair Display`, `Cormorant Garamond`, `serif`
- **Data & Monospace (Metadata / Exif)**: `JetBrains Mono`, `Fira Code`, `monospace`

---

## Type Scale & Hierarchy Matrix

| Token               | Size             | Line Height | Weight       | Letter Spacing | Primary Usage                            |
| ------------------- | ---------------- | ----------- | ------------ | -------------- | ---------------------------------------- |
| `font-display-hero` | 64px (4rem)      | 1.05        | 400 Light    | `-0.03em`      | Main marketing hero statement            |
| `font-display-1`    | 48px (3rem)      | 1.10        | 500 Medium   | `-0.02em`      | Major section headers, portfolio titles  |
| `font-display-2`    | 36px (2.25rem)   | 1.15        | 500 Medium   | `-0.02em`      | Page titles, client portal album header  |
| `font-heading-1`    | 28px (1.75rem)   | 1.20        | 600 SemiBold | `-0.01em`      | OS Dashboard section title               |
| `font-heading-2`    | 22px (1.375rem)  | 1.25        | 600 SemiBold | `0em`          | Card titles, modal dialog headers        |
| `font-heading-3`    | 18px (1.125rem)  | 1.30        | 600 SemiBold | `0em`          | Widget headers, sidebar group titles     |
| `font-body-lg`      | 16px (1rem)      | 1.50        | 400 Regular  | `0em`          | Editorial intros, client messages        |
| `font-body-md`      | 14px (0.875rem)  | 1.45        | 400 Regular  | `0em`          | Default UI text, table rows, form inputs |
| `font-body-sm`      | 12px (0.75rem)   | 1.40        | 400 Regular  | `0.01em`       | Secondary metadata, timestamps, tooltips |
| `font-caption`      | 11px (0.6875rem) | 1.35        | 500 Medium   | `0.03em`       | EXIF metadata tags, status pills, labels |
| `font-mono-data`    | 12px (0.75rem)   | 1.40        | 400 Regular  | `0em`          | ISO, Shutter, Aperture, File sizes       |

---

## Typography Rules

1. **Never use All-Caps indiscriminately**: Uppercase is reserved strictly for `font-caption` status pills, EXIF tags, and micro badge metadata with tracked-out letter spacing (`letter-spacing: 0.08em`).
2. **Contrast Enforcement**: Headings must use `#F5F5F7` (High Contrast). Secondary body text uses `#A1A1AA`.
3. **No Unscaled Fonts**: Custom inline font sizes are prohibited. All text elements must reference a PDL typography token.
