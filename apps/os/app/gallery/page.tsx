'use client';

import React from 'react';
import { Badge, Button, Card } from '@photomagic/ui';
import { Camera, Image as ImageIcon, Upload, Download, Filter, Sparkles } from 'lucide-react';

export default function GalleryManagementPage() {
  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24 text-ivory">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">PhotoMagic OS Gallery Engine</Badge>
          <h1 className="font-heading text-3xl font-bold text-ivory mt-1">
            Gallery & Media Management
          </h1>
          <p className="text-xs text-silver font-light">
            RAW ingestion, AI face indexing, client proofing galleries, watermarking, and delivery
            asset vault.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" className="flex items-center gap-2">
            <Filter size={16} /> Filter Media
          </Button>
          <Button variant="primary" className="flex items-center gap-2 font-bold">
            <Upload size={16} /> Upload New Gallery
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-silver uppercase tracking-widest font-mono">
              Active Galleries
            </span>
            <ImageIcon className="text-gold-400" size={20} />
          </div>
          <p className="font-mono text-3xl font-bold text-ivory mt-3">42</p>
          <p className="text-xs text-gold-400 mt-1">12 awaiting client review</p>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-silver uppercase tracking-widest font-mono">
              Ingested Photos
            </span>
            <Camera className="text-gold-400" size={20} />
          </div>
          <p className="font-mono text-3xl font-bold text-ivory mt-3">128,450</p>
          <p className="text-xs text-silver mt-1">8K RAW & Culling Synced</p>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-silver uppercase tracking-widest font-mono">
              AI Indexing
            </span>
            <Sparkles className="text-gold-400" size={20} />
          </div>
          <p className="font-mono text-3xl font-bold text-ivory mt-3">99.4%</p>
          <p className="text-xs text-emerald-400 mt-1">Face Recognition Active</p>
        </Card>
      </div>
    </main>
  );
}
