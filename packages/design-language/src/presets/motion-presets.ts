import { PDL_MOTION } from '../tokens/motion';

export const PDL_MOTION_PRESETS = {
  modalEnter: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { ease: PDL_MOTION.curves.luxuryEase, duration: 0.25 },
  },
  drawerSlideIn: {
    initial: { opacity: 0, x: '100%' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '100%' },
    transition: { ease: PDL_MOTION.curves.luxuryEase, duration: 0.3 },
  },
  heroReveal: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { ease: PDL_MOTION.curves.luxuryEase, duration: 0.6 },
  },
  buttonTap: {
    whileTap: { scale: 0.98 },
    transition: { duration: 0.05 },
  },
} as const;
