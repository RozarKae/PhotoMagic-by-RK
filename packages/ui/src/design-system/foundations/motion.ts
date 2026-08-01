export const motion = {
  easings: {
    smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  durations: {
    fast: '150ms',
    normal: '250ms',
    slow: '400ms',
    deliberate: '700ms',
  },
} as const;

export type MotionToken = typeof motion;
