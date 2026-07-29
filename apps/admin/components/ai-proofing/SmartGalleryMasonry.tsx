'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Heart, Star, Sparkles, Eye, MessageSquare, CheckCircle2 } from 'lucide-react';

export interface ProofingPhotoItem {
  id: string;
  url: string;
  title: string;
  rating: number;
  isFavorite: boolean;
  aiBadge?: 'Best Smile' | 'Sharpest' | 'Photographer Pick' | 'Best Lighting';
}

export const SmartGalleryMasonry: React.FC = () => {
  const [photos, setPhotos] = useState<ProofingPhotoItem[]>([
    {
      id: 'p-1',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      title: 'Mandap Vows Ceremony',
      rating: 5,
      isFavorite: true,
      aiBadge: 'Best Smile',
    },
    {
      id: 'p-2',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      title: 'Royal Bridal Portrait',
      rating: 5,
      isFavorite: true,
      aiBadge: 'Photographer Pick',
    },
    {
      id: 'p-3',
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      title: 'Sangeet Dance Sequence',
      rating: 4,
      isFavorite: false,
      aiBadge: 'Sharpest',
    },
  ]);

  const toggleFavorite = (id: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  };

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Smart AI Proofing Gallery & Star Ratings</h3>
        </div>
        <Badge variant="gold">{photos.length} High-Res Photos Loaded</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="group relative rounded-xl overflow-hidden bg-surface-base border border-border-subtle hover:border-gold-500/50 transition-all">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img src={photo.url} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

              {/* AI Recommendation Badge */}
              {photo.aiBadge && (
                <div className="absolute top-3 left-3 z-10">
                  <Badge variant="gold" className="text-[9px] shadow-lg">{photo.aiBadge}</Badge>
                </div>
              )}

              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(photo.id)}
                className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border border-white/20 transition-all z-10 ${
                  photo.isFavorite ? 'bg-gold-500/80 text-surface-base' : 'bg-black/40 text-white hover:text-gold-500'
                }`}
              >
                <Heart size={14} fill={photo.isFavorite ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="p-3 flex justify-between items-center text-xs">
              <span className="font-bold text-text-primary truncate">{photo.title}</span>
              <div className="flex items-center gap-0.5 text-gold-500">
                {Array.from({ length: photo.rating }).map((_, i) => (
                  <Star key={i} size={10} fill="currentColor" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
