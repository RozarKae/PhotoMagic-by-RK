# PhotoMagic Design Language (PDL) — 13. Accessibility Standards

## Accessibility Philosophy

PhotoMagic believes luxury and high technology must be accessible to everyone. Our products target full **WCAG 2.1 AA Compliance**.

---

## 4 Core Accessibility Pillars

### 1. Contrast Ratios

- **Normal Text (< 18pt)**: Minimum contrast ratio of **4.5:1** against background.
- **Large Text (>= 18pt / 14pt bold)**: Minimum contrast ratio of **3.0:1**.
- **Interactive Borders & Icons**: Minimum contrast ratio of **3.0:1**.
- Tested against obsidian canvas (`#050505`) with primary text (`#F5F5F7` = 18.5:1 ratio).

### 2. Screen Reader Navigation (ARIA & Semantics)

- All interactive controls use semantic HTML tags (`<button>`, `<a>`, `<input>`, `<dialog>`).
- Non-text elements (icons, gallery thumbnails) require explicit `alt` text or `aria-label`.
- Dynamic content updates (e.g., AI task progress, file upload completion) trigger `aria-live="polite"` status announcements.

### 3. Keyboard Navigability

- Every feature across Studio and OS is 100% operable via keyboard without a mouse.
- Tab order follows visual reading flow (top-to-bottom, left-to-right).
- Modals capture focus trap on mount and restore focus to trigger element on unmount.

### 4. Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
