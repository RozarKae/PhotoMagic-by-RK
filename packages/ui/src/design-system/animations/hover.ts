export const hoverAnimation = {
  lift: {
    whileHover: { y: -3, scale: 1.01 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
  zoom: {
    whileHover: { scale: 1.05 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
} as const;
