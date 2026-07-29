'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { ShieldCheck, Eye, Sparkles, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

export const WatermarkPreviewEngine: React.FC = () => {
  const [watermarkStyle, setWatermarkStyle] = useState<'logo' | 'text' | 'qr' | 'dynamic'>('dynamic');
  const [opacity, setOpacity] = useState(45);

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-5">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Phase 8.3 Dynamic Watermark Protection Engine</h3>
        </div>
        <Badge variant="gold">Auto-Remove on Full Invoice Payment</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Style Controls */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-text-primary">Watermark Type</label>
            <div className="grid grid-cols-2 gap-2">
              {(['logo', 'text', 'qr', 'dynamic'] as const).map((st) => (
                <Button
                  key={st}
                  variant={watermarkStyle === st ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setWatermarkStyle(st)}
                  className="capitalize text-xs font-semibold"
                >
                  {st} Watermark
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-border-subtle">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-text-secondary">Watermark Opacity ({opacity}%)</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="accent-gold-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Live Watermark Preview Stage */}
        <div className="relative h-48 rounded-xl overflow-hidden border border-gold-500/30 shadow-2xl flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
            alt="Watermark Preview"
            className="w-full h-full object-cover"
          />

          {/* Dynamic Watermark Overlay */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-canvas/20 backdrop-blur-[1px]"
            style={{ opacity: opacity / 100 }}
          >
            <span className="text-xl font-extrabold font-mono tracking-widest text-gold-500 uppercase rotate-[-15deg] border-2 border-gold-500 px-4 py-2 rounded-xl shadow-2xl">
              PHOTOMAGIC PROOF • DO NOT COPY
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
