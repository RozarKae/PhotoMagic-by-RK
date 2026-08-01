export const PDL_BUTTON_SPEC = {
  component: 'Button',
  purpose: 'Primary user interaction trigger for forms, modals, and actions.',
  variants: ['primary', 'secondary', 'ghost', 'ai'] as const,
  sizes: ['sm', 'md', 'lg'] as const,
  accessibility: {
    role: 'button',
    tabIndex: 0,
    focusRing: '2px solid #D4AF37',
  },
} as const;
