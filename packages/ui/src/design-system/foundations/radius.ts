// Strict Border Radius System: Only 8, 12, 16, 20, 24, 9999 (px)
export const radius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  xxl: '24px',
  full: '9999px',
} as const;

export type RadiusToken = typeof radius;
