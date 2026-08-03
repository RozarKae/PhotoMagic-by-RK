'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Sparkles, Scissors, Image as ImageIcon, Eraser, CloudSun } from 'lucide-react';

export const AIBackgroundObjectTools: React.FC = () => {
  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Scissors size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            AI Background Tools & Object Cleanup
          </h3>
        </div>
        <Badge variant="gold">Content-Aware Segmentation</Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center justify-start gap-2 p-3 h-auto"
        >
          <Scissors size={16} className="text-gold-500 flex-shrink-0" />
          <div className="flex flex-col text-left">
            <span className="font-bold">Remove Background</span>
            <span className="text-[10px] text-text-tertiary">Transparent PNG Export</span>
          </div>
        </Button>

        <Button
          variant="secondary"
          size="sm"
          className="flex items-center justify-start gap-2 p-3 h-auto"
        >
          <CloudSun size={16} className="text-gold-500 flex-shrink-0" />
          <div className="flex flex-col text-left">
            <span className="font-bold">AI Sky Replacement</span>
            <span className="text-[10px] text-text-tertiary">Golden Hour Sunset Sky</span>
          </div>
        </Button>

        <Button
          variant="secondary"
          size="sm"
          className="flex items-center justify-start gap-2 p-3 h-auto"
        >
          <Eraser size={16} className="text-gold-500 flex-shrink-0" />
          <div className="flex flex-col text-left">
            <span className="font-bold">Object Eraser Brush</span>
            <span className="text-[10px] text-text-tertiary">Remove Wires & People</span>
          </div>
        </Button>

        <Button
          variant="secondary"
          size="sm"
          className="flex items-center justify-start gap-2 p-3 h-auto"
        >
          <Sparkles size={16} className="text-gold-500 flex-shrink-0" />
          <div className="flex flex-col text-left">
            <span className="font-bold">Bokeh Lens Blur</span>
            <span className="text-[10px] text-text-tertiary">Simulate f/1.2 Blur</span>
          </div>
        </Button>
      </div>
    </Card>
  );
};
