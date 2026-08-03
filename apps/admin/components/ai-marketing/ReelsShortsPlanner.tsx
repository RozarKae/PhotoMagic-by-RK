'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Video, Music, Clock, Sparkles } from 'lucide-react';

export const ReelsShortsPlanner: React.FC = () => {
  const storyboard = [
    {
      scene: 'Scene 1: The Hook (0-3s)',
      detail:
        'Fast cuts of bride opening eyes in lehenga with slow-motion gold embroidery sparkle.',
      audio: 'Trending Instrumental Violins',
    },
    {
      scene: 'Scene 2: The Reveal (3-7s)',
      detail: 'Groom turning around in palace courtyard as sun strikes Mandap background.',
      audio: 'Dramatic Beat Drop',
    },
    {
      scene: 'Scene 3: The Emotion (7-12s)',
      detail: 'Cinematic Varmala exchange under flower shower at 60fps.',
      audio: 'Soft Vocal Transition',
    },
  ];

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Video size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            AI Instagram Reels & Shorts Storyboarder
          </h3>
        </div>
        <Badge variant="gold">Viral Hook Generator</Badge>
      </div>

      <div className="flex flex-col gap-3 text-xs">
        {storyboard.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex justify-between items-start"
          >
            <div className="flex flex-col gap-1">
              <span className="font-bold text-gold-500 text-xs">{item.scene}</span>
              <p className="text-text-primary">{item.detail}</p>
              <span className="text-[10px] text-text-tertiary flex items-center gap-1 mt-1">
                <Music size={12} className="text-gold-500" /> {item.audio}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
