# PhotoMagic Design Language (PDL) — 09. Iconography

## Iconography Philosophy

Icons in PhotoMagic are functional signs, not visual decorations. They clarify navigation, communicate tool state, and reduce cognitive load.

---

## Icon Library Standard

PhotoMagic uses **Lucide Icons** exclusively (`lucide-react`). Custom SVG icons must conform to Lucide structural standards.

---

## Size & Stroke Specifications

| Size Token | Pixel Size | Stroke Width | Primary Usage                                             |
| ---------- | ---------- | ------------ | --------------------------------------------------------- |
| `icon-xs`  | `14px`     | `1.5px`      | Inline table metadata, status pill icons                  |
| `icon-sm`  | `16px`     | `1.75px`     | Form input prefix icons, compact button icons             |
| `icon-md`  | `20px`     | `2.0px`      | Standard navigation links, action buttons, table controls |
| `icon-lg`  | `24px`     | `2.0px`      | Header actions, modal headers, major feature highlights   |
| `icon-xl`  | `32px`     | `1.75px`     | Empty state illustrations, feature category badges        |

---

## Color Mapping for Icons

- **Default Neutral**: `color-text-secondary` (`#A1A1AA`).
- **Active / Selected**: `color-text-primary` (`#F5F5F7`) or `color-brand-gold-raw` (`#D4AF37`).
- **AI Tooling**: `color-ai-violet` (`#8B5CF6`).
- **Disabled**: `color-text-tertiary` (`#71717A`).
