export const PDL_MOTION = {
  curves: {
    luxuryEase: [0.16, 1, 0.3, 1],
    snapEase: [0.25, 1, 0.5, 1],
    exitEase: [0.7, 0, 0.84, 0],
  },
  duration: {
    instant: '50ms',
    fast: '150ms',
    normal: '250ms',
    slow: '400ms',
    deliberate: '600ms',
  },
} as const;
