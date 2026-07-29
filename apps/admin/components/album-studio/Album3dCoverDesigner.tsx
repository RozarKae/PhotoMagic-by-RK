'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { BookOpen, Sparkles, Layers, ShieldCheck, Eye, RefreshCw, CheckCircle2 } from 'lucide-react';

export const Album3dCoverDesigner: React.FC = () => {
  const [coverMaterial, setCoverMaterial] = useState('leather');
  const [foilColor, setFoilColor] = useState('24k_gold');
  const [coverTitle, setCoverTitle] = useState('Eleanor & Julian');
  const [spineText, setSpineText] = useState('ELEANOR & JULIAN • UDAIPUR 2026');
  const [eventDate, setEventDate] = useState('July 15, 2026');

  const materials = [
    { label: 'Italian Leather', value: 'leather' },
    { label: 'Royal Velvet', value: 'velvet' },
    { label: 'Acrylic Glass', value: 'acrylic' },
    { label: 'Fine Linen', value: 'fabric' },
    { label: 'Wood & Brass', value: 'wood' },
  ];

  const foilOptions = [
    { label: '24K Gold Foil', value: '24k_gold', color: 'text-gold-500' },
    { label: 'Rose Gold Foil', value: 'rose_gold', color: 'text-rose-400' },
    { label: 'Silver Foil', value: 'silver', color: 'text-gray-300' },
    { label: 'Copper Foil', value: 'copper', color: 'text-amber-600' },
  ];

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <BookOpen size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Phase 7.3 3D Album Cover Designer & Foil Embossing Studio</h3>
        </div>
        <Badge variant="gold">Italian Handcrafted Specs • 3D Real-Time Render</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cover Settings Panel */}
        <div className="flex flex-col gap-4 text-xs">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-text-primary">Cover Binding Material</label>
            <div className="grid grid-cols-3 gap-2">
              {materials.map((m) => (
                <Button
                  key={m.value}
                  variant={coverMaterial === m.value ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setCoverMaterial(m.value)}
                  className="text-[11px] font-medium"
                >
                  {m.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-border-subtle">
            <label className="font-bold text-text-primary">Foil Stamping Color</label>
            <div className="grid grid-cols-2 gap-2">
              {foilOptions.map((f) => (
                <Button
                  key={f.value}
                  variant={foilColor === f.value ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setFoilColor(f.value)}
                  className={`text-xs font-semibold ${f.color}`}
                >
                  {f.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2 border-t border-border-subtle">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-text-secondary">Front Cover Title Text</label>
              <input
                type="text"
                value={coverTitle}
                onChange={(e) => setCoverTitle(e.target.value)}
                className="h-9 px-3 rounded-lg bg-surface-base border border-border-subtle text-xs text-text-primary font-mono focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-text-secondary">Spine Engraving Text</label>
              <input
                type="text"
                value={spineText}
                onChange={(e) => setSpineText(e.target.value)}
                className="h-9 px-3 rounded-lg bg-surface-base border border-border-subtle text-xs text-text-primary font-mono focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 3D Mockup Live Render Preview */}
        <div className="relative min-h-[300px] rounded-2xl bg-canvas border border-border-subtle p-6 flex flex-col justify-center items-center overflow-hidden">
          <div className="relative w-full max-w-sm h-64 rounded-2xl bg-surface-base border-2 border-gold-500/50 shadow-2xl flex flex-col justify-between p-6 transition-all duration-500">
            <div className="flex justify-between items-start">
              <span className="text-[10px] uppercase font-mono tracking-widest text-gold-500 font-bold">PhotoMagic Atelier</span>
              <Badge variant="gold" className="text-[8px]">3D Preview</Badge>
            </div>

            <div className="flex flex-col items-center text-center gap-1.5 my-auto">
              <span className="text-2xl font-extrabold tracking-tight text-text-primary font-mono">{coverTitle}</span>
              <span className="text-xs text-gold-500 font-light tracking-widest uppercase">{eventDate}</span>
            </div>

            <div className="text-center pt-2 border-t border-border-subtle text-[9px] text-text-tertiary font-mono">
              Spine: {spineText}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 text-[10px] text-text-tertiary font-mono">
            <ShieldCheck size={12} className="text-gold-500" />
            <span>24K Gold Foil Debossing Precision • Italian Craftsmanship</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
