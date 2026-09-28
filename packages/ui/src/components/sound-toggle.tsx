'use client';

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSoundFX } from '../hooks/use-sound-fx';

export interface SoundToggleProps {
  className?: string;
  variant?: 'minimal' | 'pill' | 'badge';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({
  className = '',
  variant = 'minimal',
  size = 'md',
  showLabel = false,
}) => {
  const { isMuted, toggleMute, playHoverTick } = useSoundFX();

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2.5 text-sm',
    lg: 'p-3 text-base',
  };

  const iconSizes = {
    sm: 13,
    md: 16,
    lg: 19,
  };

  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={toggleMute}
        onMouseEnter={playHoverTick}
        aria-label={isMuted ? 'Unmute Audio Haptics' : 'Mute Audio Haptics'}
        title={
          isMuted
            ? 'Sound Effects: Muted (Click to Enable)'
            : 'Sound Effects: Active (Click to Mute)'
        }
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 active:scale-95 ${
          !isMuted
            ? 'bg-purple-900/40 border-purple-500/50 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.25)]'
            : 'bg-black/30 border-white/10 text-slate-400 hover:text-slate-200'
        } ${className}`}
      >
        {!isMuted ? (
          <Volume2 size={iconSizes[size]} className="text-purple-300 animate-pulse" />
        ) : (
          <VolumeX size={iconSizes[size]} />
        )}
        <span className="font-mono text-[10px] tracking-wider uppercase font-semibold">
          {!isMuted ? 'Sound FX On' : 'Muted'}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleMute}
      onMouseEnter={playHoverTick}
      aria-label={isMuted ? 'Unmute Audio Haptics' : 'Mute Audio Haptics'}
      title={isMuted ? 'Acoustic Haptics: Muted' : 'Acoustic Haptics: Active'}
      className={`relative rounded-full transition-all duration-300 active:scale-90 flex items-center justify-center ${
        !isMuted
          ? 'bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-200 border border-purple-300/80 dark:border-purple-600/60 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
          : 'bg-purple-50 dark:bg-purple-900/40 text-purple-700/60 dark:text-purple-300/60 border border-purple-200/60 dark:border-purple-700/40 hover:text-purple-900 dark:hover:text-purple-100'
      } ${sizeClasses[size]} ${className}`}
    >
      {!isMuted ? (
        <Volume2 size={iconSizes[size]} className="transition-transform group-hover:scale-110" />
      ) : (
        <VolumeX size={iconSizes[size]} className="opacity-75" />
      )}
      {showLabel && (
        <span className="ml-1.5 font-mono text-[10px] uppercase font-bold">
          {!isMuted ? 'Audio' : 'Muted'}
        </span>
      )}
      {!isMuted && (
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-75" />
      )}
    </button>
  );
};
