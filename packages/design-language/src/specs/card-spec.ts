export const PDL_CARD_SPEC = {
  component: 'Card',
  purpose: 'Structural container for grouping content, projects, and data.',
  variants: ['standard', 'interactive', 'glass'] as const,
  accessibility: {
    role: 'region',
  },
} as const;
