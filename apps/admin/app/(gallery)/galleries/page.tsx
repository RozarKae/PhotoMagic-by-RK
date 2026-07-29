'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { PhotoUploaderModal } from '../../../components/PhotoUploaderModal';
import { PhotoItem, triggerAIPhotoAnalysisAction } from '../../actions/gallery-actions';
import { UploadCloud, Sparkles, Image as ImageIcon, Filter, CheckCircle2 } from 'lucide-react';

export default function GalleriesPage() {
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [filterAiOnly, setFilterAiOnly] = useState(false);

  const [photos, setPhotos] = useState<PhotoItem[]>([
    {
      id: 'photo-1',
      galleryId: 'gal-101',
      fileName: 'Udaipur_Wed_001.webp',
      r2ProofUrl:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      r2ThumbUrl:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80',
      width: 4000,
      height: 3000,
      aiQualityScore: 0.96,
      isBlur: false,
      isDuplicate: false,
      isSelected: true,
    },
    {
      id: 'photo-2',
      galleryId: 'gal-101',
      fileName: 'Udaipur_Wed_002.webp',
      r2ProofUrl:
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      r2ThumbUrl:
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80',
      width: 4000,
      height: 3000,
      aiQualityScore: 0.88,
      isBlur: false,
      isDuplicate: false,
      isSelected: false,
    },
  ]);

  const handleRunAI = async (photoId: string) => {
    const res = await triggerAIPhotoAnalysisAction(photoId);
    if (res.success) {
      setPhotos((prev) =>
        prev.map((p) => (p.id === photoId ? { ...p, aiQualityScore: res.data.aiQualityScore } : p)),
      );
    }
  };

  const displayedPhotos = filterAiOnly ? photos.filter((p) => p.aiQualityScore >= 0.9) : photos;

  return (
    <main className="p-8 max-w-7xl mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Media Asset Manager</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">
            Gallery & AI Selection Manager
          </h1>
          <p className="text-sm text-text-secondary">
            Upload RAW/WebP photo collections, analyze quality, and publish client proofing
            galleries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant={filterAiOnly ? 'primary' : 'secondary'}
            onClick={() => setFilterAiOnly(!filterAiOnly)}
            className="flex items-center gap-2"
          >
            <Sparkles size={16} />
            {filterAiOnly ? 'Showing Top AI Score (≥0.9)' : 'Filter Top AI Photos'}
          </Button>

          <Button
            variant="primary"
            onClick={() => setIsUploaderOpen(true)}
            className="flex items-center gap-2"
          >
            <UploadCloud size={16} />
            Upload Photos to R2
          </Button>
        </div>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayedPhotos.map((photo) => (
          <Card key={photo.id} variant="glass" className="p-0 overflow-hidden group relative">
            <div className="aspect-[4/3] overflow-hidden bg-surface-base">
              <img
                src={photo.r2ThumbUrl}
                alt={photo.fileName}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* AI Quality Score Badge */}
            <div className="absolute top-2 right-2 bg-canvas/80 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-gold-500 border border-gold-500/20 flex items-center gap-1">
              <Sparkles size={12} />
              AI Score: {photo.aiQualityScore}
            </div>

            <div className="p-3 flex justify-between items-center text-xs">
              <span className="truncate font-semibold text-text-primary max-w-[140px]">
                {photo.fileName}
              </span>
              <button
                onClick={() => handleRunAI(photo.id)}
                className="text-gold-500 font-medium hover:underline text-[11px]"
              >
                Re-Analyze
              </button>
            </div>
          </Card>
        ))}
      </div>

      <PhotoUploaderModal
        isOpen={isUploaderOpen}
        onClose={() => setIsUploaderOpen(false)}
        galleryId="gal-101"
        onUploadComplete={() => {}}
      />
    </main>
  );
}
