export const staggerAnimation = {
  container: {
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  },
  item: {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
} as const;
