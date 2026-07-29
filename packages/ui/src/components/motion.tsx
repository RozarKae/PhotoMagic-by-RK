import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const SpringBump: React.FC<{ children: React.ReactNode; isTriggered?: boolean }> = ({
  children,
  isTriggered,
}) => {
  return (
    <motion.div
      animate={isTriggered ? { scale: [1, 1.25, 1] } : { scale: 1 }}
      transition={{ duration: 0.3, ease: [0.175, 0.885, 0.32, 1.275] }}
    >
      {children}
    </motion.div>
  );
};

export { AnimatePresence };
