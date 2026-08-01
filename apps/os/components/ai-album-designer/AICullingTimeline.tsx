'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Sparkles, Calendar, CheckCircle2, ChevronRight, BookOpen, Layers } from 'lucide-react';

export const AICullingTimeline: React.FC = () => {
  const chapters = [
    { name: 'Pre-Wedding Shoot', count: 24, status: 'Culled & Ranked' },
    { name: 'Haldi & Mehendi', count: 42, status: 'Culled & Ranked' },
    { name: 'Sangeet Night', count: 68, status: 'Culled & Ranked' },
    { name: 'Wedding Ceremony (Mandap)', count: 110, status: 'Culled & Ranked' },
    { name: 'Royal Reception & Valima', count: 85, status: 'Culled & Ranked' },
  ];

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            AI Photo Culling & 15-Chapter Story Timeline
          </h3>
        </div>
        <Badge variant="gold">329 Selected Photos</Badge>
      </div>

      <div className="flex flex-col gap-2.5">
        {chapters.map((ch, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-surface-base border border-border-subtle flex justify-between items-center text-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20 flex items-center justify-center font-mono font-bold text-[10px]">
                {idx + 1}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-text-primary">{ch.name}</span>
                <span className="text-text-tertiary">{ch.count} Ranked Highlights</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="success" className="text-[10px]">
                {ch.status}
              </Badge>
              <ChevronRight size={16} className="text-text-tertiary" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
