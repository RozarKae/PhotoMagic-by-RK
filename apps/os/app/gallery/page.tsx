'use client';

import React from 'react';
import { Badge, Button } from '@photomagic/ui';
import { Camera, Image as ImageIcon, Upload, Download, Filter, Sparkles } from 'lucide-react';

export default function GalleryManagementPage() {
  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">PhotoMagic OS Gallery Engine</Badge>
          <h1 className="text-3xl font-extrabold text-white mt-1">Gallery & Media Management</h1>
          <p className="text-sm text-gray-400">
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
        <div className="p-6 bg-[#0E0E12] border border-white/10 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 uppercase tracking-widest font-mono">
              Active Galleries
            </span>
            <ImageIcon className="text-amber-400" size={20} />
          </div>
          <p className="text-3xl font-bold text-white mt-3">42</p>
          <p className="text-xs text-amber-400 mt-1">12 awaiting client review</p>
        </div>

        <div className="p-6 bg-[#0E0E12] border border-white/10 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 uppercase tracking-widest font-mono">
              Ingested Photos
            </span>
            <Camera className="text-amber-400" size={20} />
          </div>
          <p className="text-3xl font-bold text-white mt-3">128,450</p>
          <p className="text-xs text-gray-400 mt-1">8K RAW & Culling Synced</p>
        </div>

        <div className="p-6 bg-[#0E0E12] border border-white/10 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 uppercase tracking-widest font-mono">
              AI Indexing
            </span>
            <Sparkles className="text-amber-400" size={20} />
          </div>
          <p className="text-3xl font-bold text-white mt-3">99.4%</p>
          <p className="text-xs text-emerald-400 mt-1">Face Recognition Active</p>
        </div>
      </div>
    </main>
  );
}
