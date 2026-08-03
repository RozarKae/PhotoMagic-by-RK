'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Video, Play, Download, Film, Radio, Sparkles, HardDrive } from 'lucide-react';

export const VideoDeliveryStreamingCenter: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState('Wedding Film (4K Master)');

  const videos = [
    {
      title: 'Wedding Film (4K Master)',
      type: 'Full Feature Film',
      duration: '45 mins',
      size: '4.8 GB',
      res: '4K UHD',
    },
    {
      title: 'Cinematic Highlight Reel',
      type: 'Highlight Reel',
      duration: '6 mins',
      size: '850 MB',
      res: '4K UHD',
    },
    {
      title: 'Teaser Trailer (Vertical)',
      type: 'Instagram Reels',
      duration: '60 secs',
      size: '120 MB',
      res: '1080p Vertical',
    },
    {
      title: '4K Aerial Drone Footage',
      type: 'Raw Footage',
      duration: '18 mins',
      size: '2.4 GB',
      res: '4K DCI',
    },
  ];

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Film size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Phase 8.5 Video Delivery & Adaptive HLS Streaming Platform
          </h3>
        </div>
        <Badge variant="success">Adaptive Bitrate Streaming Active</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
        {/* Video Assets List */}
        <div className="flex flex-col gap-3">
          <label className="font-bold text-text-primary">Delivered Video Deliverables</label>
          <div className="flex flex-col gap-2">
            {videos.map((vid) => (
              <div
                key={vid.title}
                onClick={() => setSelectedVideo(vid.title)}
                className={`p-3 rounded-xl border cursor-pointer flex justify-between items-center transition-all ${
                  selectedVideo === vid.title
                    ? 'bg-gold-500/15 border-gold-500 text-gold-500'
                    : 'bg-surface-base border-border-subtle hover:border-gold-500/40 text-text-secondary'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Play size={16} className="text-gold-500" />
                  <div className="flex flex-col">
                    <span className="font-bold text-text-primary text-xs">{vid.title}</span>
                    <span className="text-[10px] text-text-tertiary">
                      {vid.duration} • {vid.res}
                    </span>
                  </div>
                </div>
                <Badge variant="gold" className="text-[9px]">
                  {vid.size}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Video Player & HLS Stream Player */}
        <div className="lg:col-span-2 relative min-h-[280px] rounded-2xl bg-canvas border border-border-subtle flex flex-col justify-center items-center overflow-hidden p-4">
          <div className="relative w-full h-full max-h-[260px] rounded-xl overflow-hidden shadow-2xl border border-gold-500/30 flex items-center justify-center bg-surface-elevated">
            <img
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80"
              alt="Video Poster"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gold-500 text-canvas flex items-center justify-center shadow-2xl hover:scale-105 transition-transform cursor-pointer">
                <Play size={28} className="ml-1" />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center w-full pt-3 text-xs">
            <span className="font-bold text-text-primary">{selectedVideo}</span>
            <Button variant="primary" size="sm" className="flex items-center gap-1.5 font-bold">
              <Download size={14} /> Download Original 4K Video File
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
