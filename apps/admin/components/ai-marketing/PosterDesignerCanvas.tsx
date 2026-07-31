'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Select } from '@photomagic/ui';
import { Image as ImageIcon, Sparkles, Download, Layers } from 'lucide-react';

export const PosterDesignerCanvas: React.FC = () => {
  const [posterCategory, setPosterCategory] = useState('wedding_promo');

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <ImageIcon size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            AI Promotional Poster & Banner Designer
          </h3>
        </div>
        <Badge variant="gold">300 DPI Print Ready</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Preview Canvas */}
        <div className="lg:col-span-2 relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-surface-base border-2 border-gold-500/40 shadow-2xl flex flex-col justify-between p-8 text-center text-white">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
            alt="Poster Backdrop"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />

          <div className="relative z-10 flex justify-between items-center">
            <span className="font-extrabold tracking-widest text-gold-500 font-mono text-xs uppercase">
              PHOTOMAGIC STUDIO OS
            </span>
            <Badge variant="gold">2026-2027 Season</Badge>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-2 my-auto">
            <span className="text-gold-500 uppercase tracking-widest text-xs font-semibold">
              ROYAL DESTINATION WEDDINGS
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">CRAFTING TIMELESS ELEGANCE</h2>
            <p className="text-xs text-white/80 max-w-sm">
              Fine-art luxury wedding photography & cinematic 8K films across Udaipur, Jaipur &
              Europe.
            </p>
          </div>

          <div className="relative z-10 flex justify-between items-center pt-4 border-t border-white/20 text-[10px]">
            <span>Bookings: +91 98765 43210</span>
            <span>www.photomagic.studio</span>
          </div>
        </div>

        {/* Poster Settings Controls */}
        <div className="flex flex-col gap-4 text-xs">
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-text-secondary">Poster Template Type</label>
            <Select
              value={posterCategory}
              onChange={(val: string) => setPosterCategory(val)}
              options={[
                { value: 'wedding_promo', label: 'Royal Wedding Booking Offer' },
                { value: 'pre_wedding', label: 'Pre-Wedding Concept Poster' },
                { value: 'festival', label: 'Diwali & New Year Greetings' },
                { value: 'maternity', label: 'Fine Art Maternity Announcement' },
              ]}
            />
          </div>

          <Button variant="primary" className="flex items-center justify-center gap-2 mt-4">
            <Download size={16} /> Export High-Res Poster PDF
          </Button>
        </div>
      </div>
    </Card>
  );
};
