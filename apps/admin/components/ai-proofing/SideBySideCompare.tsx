'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Columns, ZoomIn, ZoomOut, CheckCircle2 } from 'lucide-react';

export const SideBySideCompare: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState(100);

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Columns size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Side-by-Side Synchronized Comparison Stage
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="gold">Synchronized Pan & Zoom</Badge>
          <div className="flex items-center gap-1 bg-surface-base px-2 py-1 rounded-lg border border-border-subtle text-xs">
            <span className="font-mono font-bold text-text-primary">{zoomLevel}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-surface-base border border-border-subtle relative group">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
            alt="Option A"
            className="w-full h-full object-cover transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel / 100})` }}
          />
          <span className="absolute top-3 left-3 bg-black/70 text-gold-500 px-2 py-1 rounded font-mono text-[10px] font-bold">
            Option A (F/1.4 Soft)
          </span>
        </div>

        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-surface-base border border-border-subtle relative group">
          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80"
            alt="Option B"
            className="w-full h-full object-cover transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel / 100})` }}
          />
          <span className="absolute top-3 left-3 bg-black/70 text-gold-500 px-2 py-1 rounded font-mono text-[10px] font-bold">
            Option B (F/2.8 Sharp)
          </span>
        </div>
      </div>
    </Card>
  );
};
