'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Select, Input } from '@photomagic/ui';
import { Sparkles, Shield, Layers, Edit3 } from 'lucide-react';

export const AlbumCoverDesigner: React.FC = () => {
  const [coverType, setCoverType] = useState('leather');
  const [spineText, setSpineText] = useState('ELEANOR & ALEXANDER — ROYAL WEDDING');
  const [foilColor, setFoilColor] = useState('Gold');

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Cover & Foil Stamping Designer</h3>
        </div>
        <Badge variant="gold">Italian Nappa Leather</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-text-secondary">Cover Material</label>
          <Select
            value={coverType}
            onChange={(val: string) => setCoverType(val)}
            options={[
              { value: 'leather', label: 'Italian Genuine Nappa Leather' },
              { value: 'acrylic', label: 'Glass-Clear Acrylic Cover' },
              { value: 'hardcover', label: 'Matte Hardcover Wrap' },
              { value: 'canvas', label: 'Textured Fine-Art Canvas' },
            ]}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-text-secondary">Foil Stamping Color</label>
          <Select
            value={foilColor}
            onChange={(val: string) => setFoilColor(val)}
            options={[
              { value: 'Gold', label: '24K Metallic Gold Foil' },
              { value: 'Silver', label: 'Sterling Silver Foil' },
              { value: 'RoseGold', label: 'Rose Gold Metallic' },
              { value: 'Debossed', label: 'Blind Heat Debossing' },
            ]}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5 text-xs">
        <label className="font-semibold text-text-primary">Spine Text Title</label>
        <input
          type="text"
          value={spineText}
          onChange={(e) => setSpineText(e.target.value)}
          className="w-full h-9 px-3 rounded-lg bg-surface-base border border-border-subtle text-xs text-text-primary font-mono focus:outline-none focus:ring-1 focus:ring-gold-500"
        />
      </div>
    </Card>
  );
};
