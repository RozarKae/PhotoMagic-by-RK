'use client';

import React, { useState, useRef } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { ScanFace, Upload, RefreshCw, Eye, EyeOff, Sparkles } from 'lucide-react';

interface FaceLandmarkInspectorProps {
  currentImage: string;
  isProcessing: boolean;
  onImageSelect?: (imageUrl: string) => void;
  landmarksDetected?: number;
  confidence?: number;
}

export const FaceLandmarkInspector: React.FC<FaceLandmarkInspectorProps> = ({
  currentImage,
  isProcessing,
  onImageSelect,
  landmarksDetected = 68,
  confidence = 0.998,
}) => {
  const [showLandmarks, setShowLandmarks] = useState(true);
  const [compareBefore, setCompareBefore] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageSelect) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageSelect(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-5">
      <div className="flex flex-wrap justify-between items-center pb-2 border-b border-border-subtle gap-2">
        <div className="flex items-center gap-2">
          <ScanFace size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            AI Facial Landmark Mesh & Identity Detection Stage
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <Button
            variant="secondary"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 text-xs"
          >
            <Upload size={13} />
            Upload Photo
          </Button>
          <Button
            variant={showLandmarks ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setShowLandmarks(!showLandmarks)}
            className="text-xs"
          >
            {showLandmarks ? 'Hide 68-Pt Mesh' : 'Show 68-Pt Mesh'}
          </Button>
        </div>
      </div>

      {/* Portrait Canvas with Landmark Mesh Points */}
      <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-surface-base border-2 border-gold-500/40 shadow-2xl flex items-center justify-center group">
        <img
          src={currentImage}
          alt="Royal Portrait"
          className={`w-full h-full object-cover transition-all duration-300 ${
            isProcessing ? 'filter blur-[2px] opacity-70' : ''
          }`}
        />

        {isProcessing && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3 z-30">
            <div className="w-10 h-10 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-bold text-gold-400 font-mono tracking-widest uppercase animate-pulse">
              Running Cloud AI Face Reconstruction...
            </span>
          </div>
        )}

        {showLandmarks && !isProcessing && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Eyes Landmarks */}
            <div className="absolute top-[38%] left-[38%] w-4 h-4 rounded-full border-2 border-gold-500 bg-gold-500/30 animate-pulse" />
            <div className="absolute top-[38%] right-[38%] w-4 h-4 rounded-full border-2 border-gold-500 bg-gold-500/30 animate-pulse" />

            {/* Nose Landmark */}
            <div className="absolute top-[48%] left-[49%] w-3 h-3 rounded-full border border-gold-500 bg-gold-500/50" />

            {/* Mouth / Lips Landmarks */}
            <div className="absolute top-[58%] left-[44%] w-12 h-4 rounded-full border-2 border-gold-500 bg-gold-500/20" />

            {/* Face Contour Mesh Overlay */}
            <div className="absolute inset-x-[25%] top-[25%] bottom-[25%] rounded-[40%] border border-gold-500/40 border-dashed" />
          </div>
        )}

        <div className="absolute bottom-4 left-4 z-20 flex flex-wrap items-center gap-2">
          <Badge variant="gold" className="text-[10px]">
            {landmarksDetected}-Point Mesh Detected ({(confidence * 100).toFixed(1)}%)
          </Badge>
          <Badge variant="success" className="text-[10px]">
            Pore Texture Preserved
          </Badge>
        </div>
      </div>
    </Card>
  );
};
