'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import {
  SlidersHorizontal,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Crop,
  SplitSquareVertical,
  BarChart2,
} from 'lucide-react';

interface EditingCanvasStageProps {
  originalUrl: string;
  editedUrl: string;
}

export const EditingCanvasStage: React.FC<EditingCanvasStageProps> = ({
  originalUrl,
  editedUrl,
}) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [splitPos, setSplitPos] = useState(50);
  const [isSplitView, setIsSplitView] = useState(true);

  return (
    <Card variant="glass" className="p-4 flex flex-col gap-4 relative overflow-hidden">
      {/* Top Toolbar Bar */}
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle text-xs">
        <div className="flex items-center gap-3">
          <Button
            variant={isSplitView ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setIsSplitView(!isSplitView)}
            className="flex items-center gap-1.5"
          >
            <SplitSquareVertical size={14} />
            Before / After Split
          </Button>

          <div className="flex items-center gap-1 bg-surface-base px-2 py-1 rounded-lg border border-border-subtle">
            <button
              onClick={() => setZoomLevel(Math.max(10, zoomLevel - 25))}
              className="p-1 text-text-tertiary hover:text-text-primary"
            >
              <ZoomOut size={14} />
            </button>
            <span className="font-mono text-[11px] font-bold text-text-primary w-12 text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel(Math.min(800, zoomLevel + 25))}
              className="p-1 text-text-tertiary hover:text-text-primary"
            >
              <ZoomIn size={14} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="gold">RGB Histogram Active</Badge>
          <BarChart2 size={16} className="text-gold-500" />
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-surface-base border border-border-subtle flex items-center justify-center select-none group">
        <div
          className="relative w-full h-full flex items-center justify-center transition-transform duration-200"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          {isSplitView ? (
            <div className="relative w-full h-full">
              {/* Original Layer */}
              <img
                src={originalUrl}
                alt="Original"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Edited Layer Clip */}
              <div
                className="absolute inset-0 overflow-hidden border-r-2 border-gold-500 shadow-2xl"
                style={{ width: `${splitPos}%` }}
              >
                <img
                  src={editedUrl}
                  alt="Edited"
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                />
              </div>

              {/* Split Slider Handle */}
              <input
                type="range"
                min="0"
                max="100"
                value={splitPos}
                onChange={(e) => setSplitPos(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              />
            </div>
          ) : (
            <img src={editedUrl} alt="Edited Output" className="w-full h-full object-cover" />
          )}
        </div>
      </div>
    </Card>
  );
};
