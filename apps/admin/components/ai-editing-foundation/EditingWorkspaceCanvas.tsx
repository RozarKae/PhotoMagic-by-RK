'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Image as ImageIcon, Sliders, Upload, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

export const EditingWorkspaceCanvas: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const [zoomLevel, setZoomLevel] = useState(100);

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-5">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Sliders size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Interactive AI Editing Workspace Canvas
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="gold">Split Comparison Stage</Badge>
          <div className="flex items-center gap-1 bg-surface-base p-1 rounded-lg border border-border-subtle text-xs">
            <button
              onClick={() => setZoomLevel(Math.max(25, zoomLevel - 25))}
              className="p-1 hover:text-gold-500"
            >
              <ZoomOut size={14} />
            </button>
            <span className="font-mono text-[10px] text-text-primary w-10 text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel(Math.min(400, zoomLevel + 25))}
              className="p-1 hover:text-gold-500"
            >
              <ZoomIn size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Before / After Split Slider Stage */}
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-surface-base border border-border-subtle select-none">
        {/* After Image (Right Side / Background) */}
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
          alt="Edited Enhanced"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        />

        {/* Before Image (Left Side / Clipped) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-gold-500 shadow-2xl"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=40"
            alt="Original RAW"
            className="absolute inset-y-0 left-0 h-full max-w-none filter grayscale contrast-75"
            style={{ width: '100%', transform: `scale(${zoomLevel / 100})` }}
          />
          <Badge variant="gold" className="absolute top-4 left-4 text-[9px] z-20">
            ORIGINAL RAW
          </Badge>
        </div>

        <Badge variant="gold" className="absolute top-4 right-4 text-[9px] z-20">
          AI EDITED v1.2
        </Badge>

        {/* Interactive Split Slider Controller */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
        />
      </div>

      <div className="flex justify-between items-center pt-2 text-xs text-text-tertiary">
        <span>Drag cursor across image canvas to compare Before / After states.</span>
        <Button variant="secondary" size="sm" className="flex items-center gap-1">
          <Upload size={14} /> Upload New RAW Image
        </Button>
      </div>
    </Card>
  );
};
