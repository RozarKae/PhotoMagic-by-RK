'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useSoundFX } from '../hooks/use-sound-fx';

export interface InteractiveTiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltMaxAngle?: number;
  glareEffect?: boolean;
  scaleOnHover?: number;
  cursorType?: 'pointer' | 'zoom-in' | 'grab';
  onClick?: () => void;
}

export const InteractiveTiltCard: React.FC<InteractiveTiltCardProps> = ({
  children,
  className = '',
  tiltMaxAngle = 8,
  glareEffect = true,
  scaleOnHover = 1.025,
  cursorType = 'pointer',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { playHoverTick, playMicroClick } = useSoundFX();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 280, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [0, 1], [tiltMaxAngle, -tiltMaxAngle]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-tiltMaxAngle, tiltMaxAngle]);

  const glareX = useTransform(smoothMouseX, [0, 1], ['0%', '100%']);
  const glareY = useTransform(smoothMouseY, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playHoverTick();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const handleClick = () => {
    playMicroClick();
    if (onClick) onClick();
  };

  const cursorClasses = {
    pointer: 'cursor-pointer',
    'zoom-in': 'cursor-zoom-in',
    grab: 'cursor-grab active:cursor-grabbing',
  };

  return (
    <div style={{ perspective: 1000 }} className={`relative inline-block ${className}`}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          scale: scaleOnHover,
          transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
        }}
        whileTap={{
          scale: 0.98,
          transition: { duration: 0.1 },
        }}
        className={`relative overflow-hidden rounded-2xl will-change-transform ${cursorClasses[cursorType]}`}
      >
        {children}

        {/* Dynamic Sheen Glare Reflection */}
        {glareEffect && isHovered && (
          <motion.div
            style={{
              left: glareX,
              top: glareY,
              transform: 'translate(-50%, -50%)',
            }}
            className="pointer-events-none absolute w-[200%] h-[200%] rounded-full bg-gradient-to-r from-transparent via-white/10 dark:via-purple-300/10 to-transparent blur-xl transition-opacity duration-300"
          />
        )}
      </motion.div>
    </div>
  );
};
