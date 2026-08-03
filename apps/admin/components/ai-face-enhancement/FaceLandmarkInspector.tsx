'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Sparkles, Eye, ScanFace, CheckCircle2, ShieldCheck } from 'lucide-react';

export const FaceLandmarkInspector: React.FC = () => {
  const [showLandmarks, setShowLandmarks] = useState(true);

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-5">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <ScanFace size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            AI Facial Landmark Mesh & Identity Detection Stage
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="gold">68-Point Mesh Overlay Active</Badge>
          <Button
            variant={showLandmarks ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setShowLandmarks(!showLandmarks)}
          >
            {showLandmarks ? 'Hide 68-Pt Mesh' : 'Show 68-Pt Mesh'}
          </Button>
        </div>
      </div>

      {/* Portrait Canvas with Landmark Mesh Points */}
      <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-surface-base border-2 border-gold-500/40 shadow-2xl flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
          alt="Royal Bride Portrait"
          className="w-full h-full object-cover"
        />

        {showLandmarks && (
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

        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
          <Badge variant="gold" className="text-[10px]">
            Bride Face #1 Detected (Confidence 99.8%)
          </Badge>
          <Badge variant="success" className="text-[10px]">
            Natural Pore Texture Preserved
          </Badge>
        </div>
      </div>
    </Card>
  );
};
