'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Sliders, RotateCw, ZoomIn, ZoomOut, Move, Scissors, Trash2, Plus, Copy, Undo, Redo, ShieldAlert, CheckCircle2, Lock } from 'lucide-react';

export const ManualAlbumCanvasEditor: React.FC = () => {
  const [currentSpread, setCurrentSpread] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [undoStack, setUndoStack] = useState<number[]>([1]);
  const [showBleedGuides, setShowBleedGuides] = useState(true);

  const imagesOnSpread = [
    { id: 'img-1', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80', label: 'Mandap Vows (Hero)' },
    { id: 'img-2', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80', label: 'Ring Exchange' },
  ];

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-3 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-gold-500 text-sm">Spread #{currentSpread} of 15</span>
            <Badge variant="gold">12x18 Inches • 300 DPI Master</Badge>
          </div>
        </div>

        {/* Canvas Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Button variant="ghost" size="sm" onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}>
            <ZoomOut size={14} />
          </Button>
          <span className="font-mono text-[10px] text-text-tertiary">{zoomLevel}%</span>
          <Button variant="ghost" size="sm" onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}>
            <ZoomIn size={14} />
          </Button>
          <span className="h-4 w-px bg-border-subtle mx-1" />
          <Button variant="ghost" size="sm" onClick={() => setShowBleedGuides(!showBleedGuides)}>
            <ShieldAlert size={14} className={showBleedGuides ? 'text-gold-500' : 'text-text-tertiary'} />
            {showBleedGuides ? 'Bleed Guides On' : 'Guides Off'}
          </Button>
          <span className="h-4 w-px bg-border-subtle mx-1" />
          <Button variant="secondary" size="sm" className="flex items-center gap-1 text-[11px]">
            <Undo size={12} /> Undo
          </Button>
          <Button variant="secondary" size="sm" className="flex items-center gap-1 text-[11px]">
            <Redo size={12} /> Redo
          </Button>
        </div>
      </div>

      {/* 12x18 Spread Canvas Area */}
      <div className="relative w-full overflow-x-auto p-8 rounded-2xl bg-canvas border border-border-subtle flex justify-center items-center">
        <div
          className="relative bg-surface-base rounded-lg border border-gold-500/40 shadow-2xl flex transition-transform duration-300"
          style={{ width: `${800 * (zoomLevel / 100)}px`, height: `${400 * (zoomLevel / 100)}px` }}
        >
          {/* Bleed Margin & Safe Zone Indicators */}
          {showBleedGuides && (
            <div className="absolute inset-2 border border-dashed border-status-warning/60 pointer-events-none z-20 flex justify-between items-end p-2 text-[9px] font-mono text-status-warning">
              <span>3mm Print Bleed Line</span>
              <span>Safe Zone (300 DPI)</span>
            </div>
          )}

          {/* Left Page (Page A) */}
          <div className="flex-1 border-r border-border-subtle p-4 relative group cursor-move flex flex-col justify-center items-center overflow-hidden">
            <img src={imagesOnSpread[0].url} alt="Left" className="w-full h-full object-cover rounded-md" />
            <div className="absolute bottom-3 left-3 bg-canvas/90 backdrop-blur-md px-2 py-1 rounded text-[9px] text-gold-500 font-mono">
              Left Page (300 DPI)
            </div>
          </div>

          {/* Spine Fold Center Line */}
          <div className="w-px bg-gold-500/40 h-full z-10 flex items-center justify-center">
            <div className="bg-canvas px-1 py-4 text-[8px] font-mono text-gold-500 uppercase tracking-widest rotate-90">
              Spine Crease
            </div>
          </div>

          {/* Right Page (Page B) */}
          <div className="flex-1 p-4 relative group cursor-move flex flex-col justify-center items-center overflow-hidden">
            <img src={imagesOnSpread[1].url} alt="Right" className="w-full h-full object-cover rounded-md" />
            <div className="absolute bottom-3 right-3 bg-canvas/90 backdrop-blur-md px-2 py-1 rounded text-[9px] text-gold-500 font-mono">
              Right Page (300 DPI)
            </div>
          </div>
        </div>
      </div>

      {/* Spread Action Controls */}
      <div className="flex justify-between items-center text-xs pt-2">
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="flex items-center gap-1 text-[11px]">
            <Plus size={12} /> Insert Blank Page
          </Button>
          <Button variant="secondary" size="sm" className="flex items-center gap-1 text-[11px]">
            <Scissors size={12} /> Split Spread
          </Button>
          <Button variant="secondary" size="sm" className="flex items-center gap-1 text-[11px]">
            <Copy size={12} /> Duplicate Spread
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] text-text-tertiary font-mono">Autosaved 2s ago</span>
          <Button variant="primary" size="sm">
            Save Spread Layout
          </Button>
        </div>
      </div>
    </Card>
  );
};
