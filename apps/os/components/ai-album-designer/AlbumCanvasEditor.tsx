'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { BookOpen, ShieldCheck, Printer, Grid, Maximize2, Move } from 'lucide-react';

export const AlbumCanvasEditor: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(12);

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <BookOpen size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            12x18 Spread Canvas Editor (Pages {currentPage}–{currentPage + 1})
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="gold">CMYK 300 DPI Validated</Badge>
          <Badge variant="success">0.25" Print Bleed Active</Badge>
        </div>
      </div>

      {/* Main Spread Stage */}
      <div className="relative aspect-[2/1] w-full rounded-xl overflow-hidden bg-surface-base border-2 border-gold-500/40 flex items-center justify-center shadow-2xl p-4">
        {/* Left Page (Page 12) */}
        <div className="w-1/2 h-full border-r border-dashed border-gold-500/50 relative p-2 overflow-hidden bg-surface-elevated">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
            alt="Left Spread"
            className="w-full h-full object-cover rounded-lg"
          />
          <span className="absolute bottom-4 left-4 font-mono text-[10px] text-white/80 bg-black/60 px-2 py-1 rounded">
            Page 12
          </span>
        </div>

        {/* Right Page (Page 13) */}
        <div className="w-1/2 h-full relative p-2 overflow-hidden bg-surface-elevated">
          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80"
            alt="Right Spread"
            className="w-full h-full object-cover rounded-lg"
          />
          <span className="absolute bottom-4 right-4 font-mono text-[10px] text-white/80 bg-black/60 px-2 py-1 rounded">
            Page 13
          </span>
        </div>
      </div>
    </Card>
  );
};
