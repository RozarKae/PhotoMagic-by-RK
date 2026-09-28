'use client';

import * as React from 'react';
import { Button, ButtonProps } from './button';
import { useSoundFX, SoundType } from '../hooks/use-sound-fx';

export interface InteractiveButtonProps extends ButtonProps {
  sound?: SoundType | 'none';
  enableHoverSound?: boolean;
}

export const InteractiveButton = React.forwardRef<HTMLButtonElement, InteractiveButtonProps>(
  (
    { sound = 'microClick', enableHoverSound = true, onClick, onMouseEnter, children, ...props },
    ref,
  ) => {
    const { play, playHoverTick } = useSoundFX();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (sound !== 'none') {
        play(sound);
      }
      if (onClick) onClick(e);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (enableHoverSound) {
        playHoverTick();
      }
      if (onMouseEnter) onMouseEnter(e);
    };

    return (
      <Button ref={ref} onClick={handleClick} onMouseEnter={handleMouseEnter} {...props}>
        {children}
      </Button>
    );
  },
);

InteractiveButton.displayName = 'InteractiveButton';
