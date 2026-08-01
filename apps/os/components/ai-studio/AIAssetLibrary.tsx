'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Image as ImageIcon, Video, FileCode, Search, Download, Info } from 'lucide-react';

export interface AIAssetItem {
  id: string;
  fileName: string;
  assetType: 'image' | 'video' | 'psd' | 'png' | 'jpeg';
  thumbUrl: string;
  promptSnapshot: string;
  dimensions: string;
  createdAt: string;
}

export const AIAssetLibrary: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<AIAssetItem | null>(null);
  const [assets] = useState<AIAssetItem[]>([
    {
      id: 'ast-1',
      fileName: 'Royal_Palace_Golden_Hour_01.webp',
      assetType: 'image',
      thumbUrl:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      promptSnapshot:
        'Ultra-cinematic 8k resolution, royal palace architectural background, golden hour soft bokeh lighting...',
      dimensions: '1024 x 1024',
      createdAt: '2026-07-29',
    },
    {
      id: 'ast-2',
      fileName: 'Vogue_Haute_Couture_02.webp',
      assetType: 'image',
      thumbUrl:
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
      promptSnapshot:
        'Editorial fashion portraiture, sharp focal planes, Leica 50mm f/0.95 lens aesthetics...',
      dimensions: '1024 x 1024',
      createdAt: '2026-07-29',
    },
  ]);

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <ImageIcon size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            AI Asset Vault & Metadata Inspector
          </h3>
        </div>
        <Badge variant="gold">{assets.length} Generated Assets</Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {assets.map((asset) => (
          <div
            key={asset.id}
            onClick={() => setSelectedAsset(asset)}
            className="rounded-xl overflow-hidden bg-surface-base border border-border-subtle hover:border-gold-500/50 transition-all cursor-pointer group relative"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={asset.thumbUrl}
                alt={asset.fileName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-2.5 flex justify-between items-center text-xs">
              <span className="truncate font-semibold text-text-primary text-[11px]">
                {asset.fileName}
              </span>
              <Badge variant="gold" className="uppercase text-[9px]">
                {asset.assetType}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Asset Metadata Drawer */}
      {selectedAsset && (
        <div className="p-4 rounded-xl bg-surface-base border border-gold-500/40 flex flex-col gap-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="font-bold text-text-primary">{selectedAsset.fileName}</span>
            <Button variant="ghost" size="sm" onClick={() => setSelectedAsset(null)}>
              Close Metadata
            </Button>
          </div>
          <span className="text-text-tertiary">
            Dimensions: {selectedAsset.dimensions} • Created: {selectedAsset.createdAt}
          </span>
          <p className="text-text-secondary bg-surface-elevated p-3 rounded-lg border border-border-subtle font-mono text-[11px]">
            Prompt Metadata: {selectedAsset.promptSnapshot}
          </p>
        </div>
      )}
    </Card>
  );
};
