'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Palette, Shield, Type, Upload } from 'lucide-react';

export const BrandKitManager: React.FC = () => {
  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Palette size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Studio Brand Kit & Watermark Manager
          </h3>
        </div>
        <Badge variant="gold">Auto Branding Applied</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-2">
          <span className="font-semibold text-text-tertiary">Primary Brand Color</span>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gold-500 border border-gold-500/50" />
            <div className="flex flex-col">
              <span className="font-mono font-bold text-text-primary">#D4AF37</span>
              <span className="text-[10px] text-text-tertiary">Metallic Gold</span>
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-2">
          <span className="font-semibold text-text-tertiary">Studio Watermark PNG</span>
          <div className="flex items-center justify-between">
            <span className="font-mono text-gold-500 font-bold">PhotoMagic_Gold.png</span>
            <Button variant="ghost" size="sm">
              <Upload size={14} />
            </Button>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-2">
          <span className="font-semibold text-text-tertiary">Typography Preset</span>
          <span className="font-serif font-bold text-text-primary text-sm">
            Cinematic Serif Header
          </span>
        </div>
      </div>
    </Card>
  );
};
