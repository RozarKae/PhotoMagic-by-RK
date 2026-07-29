'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { ChevronLeft, ChevronRight, MessageSquare, Pin } from 'lucide-react';
import { AlbumCommentItem } from '@photomagic/config';

interface SpreadData {
  spreadNumber: number;
  leftPhotoUrl: string;
  rightPhotoUrl: string;
}

interface AlbumSpreadViewerProps {
  spreads: SpreadData[];
  comments: AlbumCommentItem[];
  onAddCommentPin: (spreadNumber: number, pinX: number, pinY: number) => void;
}

export const AlbumSpreadViewer: React.FC<AlbumSpreadViewerProps> = ({
  spreads,
  comments,
  onAddCommentPin,
}) => {
  const [currentSpreadIdx, setCurrentSpreadIdx] = useState(0);
  const currentSpread = spreads[currentSpreadIdx];

  const currentComments = comments.filter((c) => c.spreadNumber === currentSpread.spreadNumber);

  const handleSpreadClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    onAddCommentPin(currentSpread.spreadNumber, Math.round(x), Math.round(y));
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Spread Navigation Bar */}
      <div className="flex justify-between items-center bg-surface-glass p-4 rounded-xl border border-border-subtle backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Badge variant="gold">
            Spread {currentSpread.spreadNumber} of {spreads.length}
          </Badge>
          <span className="text-xs text-text-secondary hidden sm:inline">
            Click anywhere on pages to drop a spatial revision note pin
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setCurrentSpreadIdx(Math.max(0, currentSpreadIdx - 1))}
            disabled={currentSpreadIdx === 0}
          >
            <ChevronLeft size={16} />
            Previous
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setCurrentSpreadIdx(Math.min(spreads.length - 1, currentSpreadIdx + 1))}
            disabled={currentSpreadIdx === spreads.length - 1}
          >
            Next
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      {/* 2-Page Spread Viewer Box */}
      <div
        onClick={handleSpreadClick}
        className="relative w-full aspect-[16/9] bg-surface-elevated rounded-2xl border border-border-subtle overflow-hidden shadow-modal flex cursor-crosshair group"
      >
        {/* Left Page */}
        <div className="w-1/2 h-full border-r border-border-subtle p-4 relative bg-canvas">
          <img
            src={currentSpread.leftPhotoUrl}
            alt="Left Spread Page"
            className="w-full h-full object-cover rounded-lg shadow-sm"
          />
        </div>

        {/* Right Page */}
        <div className="w-1/2 h-full p-4 relative bg-canvas">
          <img
            src={currentSpread.rightPhotoUrl}
            alt="Right Spread Page"
            className="w-full h-full object-cover rounded-lg shadow-sm"
          />
        </div>

        {/* Spatial Revision Pin Overlays */}
        {currentComments.map((cmt) => (
          <div
            key={cmt.id}
            style={{ left: `${cmt.pinX}%`, top: `${cmt.pinY}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <div className="w-6 h-6 rounded-full bg-gold-500 text-canvas font-bold text-xs flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
              <Pin size={12} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
