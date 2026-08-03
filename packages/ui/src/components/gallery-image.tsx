'use client';

import React, { memo } from 'react';
import { CloudinaryImage } from './cloudinary-image';
import { Badge } from './badge';
import { Heart, Eye, Download, Sparkles } from 'lucide-react';

export interface GalleryImageProps {
  id: string;
  url: string;
  publicId?: string;
  title?: string;
  category?: string;
  isFavorite?: boolean;
  score?: number;
  aiTags?: string[];
  onSelect?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  onDownload?: (id: string) => void;
  className?: string;
}

export const GalleryImage: React.FC<GalleryImageProps> = memo(
  ({
    id,
    url,
    publicId,
    title,
    category = 'Uncategorized',
    isFavorite = false,
    score,
    aiTags = [],
    onSelect,
    onToggleFavorite,
    onDownload,
    className = '',
  }) => {
    return (
      <div
        className={`group relative rounded-xl overflow-hidden bg-[#1D1D1D] border border-white/10 hover:border-gold-500/50 transition-all duration-300 shadow-museum ${className}`}
      >
        {/* Cloudinary Image Display */}
        <CloudinaryImage
          publicId={publicId}
          src={url}
          preset="galleryPreview"
          alt={title || 'Gallery Image'}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Badges Overlay (Top Bar) */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
          {category && (
            <Badge variant="gold" className="text-[10px] font-mono tracking-wider font-semibold">
              {category}
            </Badge>
          )}

          {score !== undefined && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-gold-500/30 text-[10px] text-gold-400 font-mono">
              <Sparkles size={11} />
              <span>{(score * 100).toFixed(0)}% AI Score</span>
            </div>
          )}
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end p-4">
          {title && (
            <h4 className="font-heading font-bold text-ivory text-sm truncate mb-1">{title}</h4>
          )}

          {aiTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {aiTags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[9px] font-mono text-silver bg-white/10 px-1.5 py-0.5 rounded border border-white/10"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={() => onSelect?.(id)}
              className="flex items-center gap-1.5 text-xs font-semibold text-ivory hover:text-gold-400 transition-colors"
            >
              <Eye size={15} />
              <span>Preview</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onToggleFavorite?.(id)}
                className={`p-2 rounded-lg transition-colors ${
                  isFavorite
                    ? 'text-red-500 bg-red-500/10 border border-red-500/30'
                    : 'text-silver hover:text-ivory bg-white/10 hover:bg-white/20'
                }`}
                aria-label="Toggle Favorite"
              >
                <Heart size={15} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>

              {onDownload && (
                <button
                  type="button"
                  onClick={() => onDownload?.(id)}
                  className="p-2 rounded-lg text-silver hover:text-gold-400 bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Download Image"
                >
                  <Download size={15} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

GalleryImage.displayName = 'GalleryImage';
