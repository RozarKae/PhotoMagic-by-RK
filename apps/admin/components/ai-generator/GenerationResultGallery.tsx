'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Image as ImageIcon, Heart, Download, Copy, RefreshCw, Eye, Sparkles, Sliders } from 'lucide-react';

export interface GeneratedPhotoResult {
  id: string;
  url: string;
  prompt: string;
  negativePrompt: string;
  provider: string;
  aspectRatio: string;
  seed: number;
  camera: string;
  lens: string;
  cost: string;
  isFavorite: boolean;
}

interface GenerationResultGalleryProps {
  results: GeneratedPhotoResult[];
  onRegenerate?: (result: GeneratedPhotoResult) => void;
}

export const GenerationResultGallery: React.FC<GenerationResultGalleryProps> = ({
  results,
  onRegenerate,
}) => {
  const [activeItem, setActiveItem] = useState<GeneratedPhotoResult | null>(results[0] || null);

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <ImageIcon size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Generation Result Canvas & Inspector</h3>
        </div>
        <Badge variant="gold">{results.length} Outputs Rendered</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Display Stage */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {activeItem ? (
            <div className="relative rounded-2xl overflow-hidden bg-surface-base border border-border-subtle group aspect-[16/9] flex items-center justify-center">
              <img
                src={activeItem.url}
                alt={activeItem.prompt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-base/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end gap-2 text-xs">
                <span className="font-bold text-text-primary font-mono text-sm">{activeItem.prompt}</span>
                <span className="text-text-tertiary">{activeItem.camera} • {activeItem.lens} • Seed: {activeItem.seed}</span>
              </div>
            </div>
          ) : (
            <div className="aspect-[16/9] rounded-2xl border-2 border-dashed border-border-subtle flex flex-col items-center justify-center text-text-tertiary gap-2">
              <Sparkles size={24} className="text-gold-500" />
              <span className="text-xs">No image generated yet. Click "Generate" to synthesize.</span>
            </div>
          )}
        </div>

        {/* Thumbnail Selector Grid & Details */}
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-text-secondary text-xs">Batch Outputs</span>
          <div className="grid grid-cols-2 gap-3">
            {results.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`aspect-square rounded-xl overflow-hidden border cursor-pointer transition-all ${
                  activeItem?.id === item.id ? 'border-gold-500 ring-2 ring-gold-500/20' : 'border-border-subtle hover:border-gold-500/50'
                }`}
              >
                <img src={item.url} alt={item.prompt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {activeItem && (
            <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gold-500 uppercase tracking-widest text-[10px]">Photo Metadata</span>
                <Badge variant="gold">{activeItem.provider}</Badge>
              </div>

              <div className="flex flex-col gap-1 text-[11px] text-text-secondary font-mono">
                <span>Camera: {activeItem.camera} ({activeItem.lens})</span>
                <span>Seed: {activeItem.seed}</span>
                <span>Est Cost: {activeItem.cost}</span>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-border-subtle">
                <Button variant="secondary" size="sm" onClick={() => onRegenerate?.(activeItem)} className="flex-1">
                  <RefreshCw size={12} /> Regenerate
                </Button>
                <Button variant="secondary" size="sm" className="flex-1">
                  <Download size={12} /> Download
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
