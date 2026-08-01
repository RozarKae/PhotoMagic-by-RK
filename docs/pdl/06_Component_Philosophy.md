# PhotoMagic Design Language (PDL) — 06. Component Philosophy

## Overview

Every UI component in PhotoMagic is built around 4 principles:

1. **Single Responsibility**: Components do one thing exceptionally well.
2. **Preset-Driven Styling**: Styling is derived exclusively from PDL tokens. No arbitrary utility classes (`px-[17px]`, `bg-[#123456]`).
3. **Built-in Accessibility**: Keyboard focus rings, ARIA roles, and screen reader announcements are embedded into component specs.
4. **State-Driven Motion**: Hover, active, disabled, loading, and error states trigger predictable micro-interactions.

---

## Core Component Specifications

### 1. Buttons (`<Button />`)

- **Purpose**: Primary trigger for user actions and page transitions.
- **Variants**:
  - `primary`: Metallic Gold background (`#D4AF37`), dark text (`#050505`), subtle gold shadow on hover. Used for primary CTAs ("Book Shoot", "Confirm Export").
  - `secondary`: Dark surface (`#1A1A1A`), subtle 1px border (`rgba(255,255,255,0.12)`), white text (`#F5F5F7`). Used for secondary actions ("Cancel", "Save Draft").
  - `ghost`: Transparent background, white text, subtle background fill on hover (`rgba(255,255,255,0.06)`).
  - `ai`: AI gradient border (`linear-gradient(#8B5CF6, #06B6D4)`), violet glow on hover. Used for AI actions ("Run Face Enhancement", "Smart Cull").
- **Behavior**: Scaled down to `0.98` on click active state. 150ms ease-out transition.

### 2. Cards (`<Card />`)

- **Purpose**: Containers for grouped content, projects, gallery assets, and dashboard analytics widgets.
- **Variants**:
  - `standard`: Background `#0D0D0D`, 1px border `rgba(255,255,255,0.08)`, 8px border radius (`rounded-lg`).
  - `interactive`: Same as standard, but transforms `-2px` Y-axis on hover with `color-border-medium` stroke.
  - `glass`: Background `rgba(18, 18, 18, 0.75)` with `backdrop-blur-md`.

### 3. Modals & Dialogs (`<Modal />`)

- **Purpose**: Focused task execution (e.g., Shoot Project Setup, Image Inspection, Payment Confirmation).
- **Behavior**:
  - Backdrop: `#000000` with 85% opacity + `backdrop-blur-xl`.
  - Enter Animation: Scale from `0.95` to `1.0` with `250ms` cubic-bezier ease (`[0.16, 1, 0.3, 1]`).
  - Dismissible via `Escape` key, click outside, or close button.

### 4. Data Tables (`<DataTable />`)

- **Purpose**: Displaying high-density operational data (Bookings, Client Lists, Financial Invoices).
- **Specifications**:
  - Row height: `48px` (Compact) or `60px` (Default).
  - Alternate row background fill optional; hover state row highlight `rgba(255,255,255,0.03)`.
  - Fixed sticky header with `backdrop-blur-md` background.

### 5. Form Elements (`<Input />`, `<Select />`, `<Switch />`)

- **Specifications**:
  - Background: `#121212` with 1px border `rgba(255,255,255,0.12)`.
  - Focus state: Border transitions to `color-brand-gold-raw` (`#D4AF37`) with a 2px outer glow (`rgba(212,175,55,0.20)`). Zero default browser outline.
