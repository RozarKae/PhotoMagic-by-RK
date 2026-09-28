'use client';

import React, { useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { useSoundFX } from '../hooks/use-sound-fx';

export interface DraggableItemProps {
  children: React.ReactNode;
  className?: string;
  axis?: 'x' | 'y' | 'both';
  dragSnapToOrigin?: boolean;
  onDragStart?: () => void;
  onDragEnd?: (info: PanInfo) => void;
  soundEnabled?: boolean;
}

export const DraggableItem: React.FC<DraggableItemProps> = ({
  children,
  className = '',
  axis = 'both',
  dragSnapToOrigin = true,
  onDragStart,
  onDragEnd,
  soundEnabled = true,
}) => {
  const { playDragGrab, playDragDrop, playHoverTick } = useSoundFX();
  const isDraggingRef = useRef(false);

  const handleDragStart = () => {
    isDraggingRef.current = true;
    if (soundEnabled) {
      playDragGrab();
    }
    if (onDragStart) onDragStart();
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    isDraggingRef.current = false;
    if (soundEnabled) {
      playDragDrop();
    }
    if (onDragEnd) onDragEnd(info);
  };

  const handleMouseEnter = () => {
    if (!isDraggingRef.current && soundEnabled) {
      playHoverTick();
    }
  };

  return (
    <motion.div
      drag={axis === 'both' ? true : axis}
      dragSnapToOrigin={dragSnapToOrigin}
      dragElastic={0.16}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
      whileHover={{
        scale: 1.015,
        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
      }}
      whileTap={{ scale: 0.985 }}
      whileDrag={{
        scale: 1.045,
        rotate: 1.8,
        zIndex: 50,
        boxShadow: '0 24px 48px -12px rgba(124, 58, 237, 0.35)',
        cursor: 'grabbing',
        transition: { duration: 0.12 },
      }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onMouseEnter={handleMouseEnter}
      className={`cursor-grab select-none touch-none ${className}`}
    >
      {children}
    </motion.div>
  );
};
