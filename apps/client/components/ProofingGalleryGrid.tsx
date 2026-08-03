'use client';

import React from 'react';
import { Card, SpringBump } from '@photomagic/ui';
import { Heart, CheckCircle2 } from 'lucide-react';
import { PhotoItem } from '@photomagic/config';

interface ProofingGalleryGridProps {
  photos: PhotoItem[];
  selectionLimit: number;
  onToggleSelect: (photoId: string) => void;
}

export const ProofingGalleryGrid: React.FC<ProofingGalleryGridProps> = ({
  photos,
  selectionLimit,
  onToggleSelect,
}) => {
  const selectedCount = photos.filter((p) => p.isSelected).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Selection Counter Bar */}
      <div className="flex justify-between items-center bg-surface-glass p-4 rounded-xl border border-border-subtle backdrop-blur-xl sticky top-20 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <Heart size={20} className="text-gold-500 fill-gold-500" />
          <span className="text-sm font-bold text-text-primary">
            Favorites Selected: <span className="text-gold-500">{selectedCount}</span> /{' '}
            {selectionLimit} Limit
          </span>
        </div>

        <div className="w-48 h-2 bg-surface-elevated rounded-full overflow-hidden">
          <div
            className="h-full bg-gold-500 transition-all duration-300"
            style={{ width: `${Math.min((selectedCount / selectionLimit) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => onToggleSelect(photo.id)}
            className={`relative rounded-xl overflow-hidden group cursor-pointer border-2 transition-all ${
              photo.isSelected
                ? 'border-gold-500 shadow-gold'
                : 'border-transparent hover:border-border-subtle'
            }`}
          >
            <div className="aspect-[4/3] bg-surface-base overflow-hidden">
              <img
                src={photo.r2ThumbUrl}
                alt={photo.fileName}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Heart Toggle Overlay */}
            <div className="absolute top-3 right-3 z-10">
              <SpringBump isTriggered={photo.isSelected}>
                <div
                  className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                    photo.isSelected
                      ? 'bg-gold-500 text-canvas'
                      : 'bg-black/40 text-white hover:bg-black/60'
                  }`}
                >
                  <Heart size={16} fill={photo.isSelected ? 'currentColor' : 'none'} />
                </div>
              </SpringBump>
            </div>

            {/* Selection Checkmark Badge */}
            {photo.isSelected && (
              <div className="absolute bottom-3 left-3 bg-canvas/80 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-gold-500 border border-gold-500/20 flex items-center gap-1">
                <CheckCircle2 size={12} />
                Selected
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
