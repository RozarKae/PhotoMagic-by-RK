'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { ProofingGalleryGrid } from '../../../components/ProofingGalleryGrid';
import { PhotoItem } from '@photomagic/config';
import { Camera, Lock, CheckCircle2 } from 'lucide-react';

export default function ClientGalleryProofingPage() {
  const [photos, setPhotos] = useState<PhotoItem[]>([
    {
      id: 'p1',
      galleryId: 'gal-101',
      fileName: 'Udaipur_Wed_001.webp',
      r2ProofUrl:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      r2ThumbUrl:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      width: 4000,
      height: 3000,
      aiQualityScore: 0.96,
      isBlur: false,
      isDuplicate: false,
      isSelected: true,
    },
    {
      id: 'p2',
      galleryId: 'gal-101',
      fileName: 'Udaipur_Wed_002.webp',
      r2ProofUrl:
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      r2ThumbUrl:
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
      width: 4000,
      height: 3000,
      aiQualityScore: 0.88,
      isBlur: false,
      isDuplicate: false,
      isSelected: false,
    },
    {
      id: 'p3',
      galleryId: 'gal-101',
      fileName: 'Udaipur_Wed_003.webp',
      r2ProofUrl:
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
      r2ThumbUrl:
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
      width: 4000,
      height: 3000,
      aiQualityScore: 0.94,
      isBlur: false,
      isDuplicate: false,
      isSelected: true,
    },
  ]);

  const [isSelectionLocked, setIsSelectionLocked] = useState(false);

  const handleToggleSelect = (photoId: string) => {
    if (isSelectionLocked) return;

    const target = photos.find((p) => p.id === photoId);
    if (!target) return;

    const nextSelected = !target.isSelected;
    setPhotos((prev) =>
      prev.map((p) => (p.id === photoId ? { ...p, isSelected: nextSelected } : p)),
    );
  };

  const handleLockSelections = () => {
    setIsSelectionLocked(true);
  };

  return (
    <main className="p-8 max-w-7xl mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Private Proofing Gallery</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">
            Royal Palace Wedding Proofs
          </h1>
          <p className="text-sm text-text-secondary">
            Click heart on photos to select favorites for your flush-mount album.
          </p>
        </div>

        <Button
          variant={isSelectionLocked ? 'secondary' : 'primary'}
          onClick={handleLockSelections}
          disabled={isSelectionLocked}
          className="flex items-center gap-2"
        >
          {isSelectionLocked ? <Lock size={16} /> : <CheckCircle2 size={16} />}
          {isSelectionLocked ? 'Selections Locked & Transmitted' : 'Lock & Submit Selections'}
        </Button>
      </div>

      {/* Virtualized 60fps Grid */}
      <ProofingGalleryGrid
        photos={photos}
        selectionLimit={75}
        onToggleSelect={handleToggleSelect}
      />
    </main>
  );
}
