'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Download, Image as ImageIcon, BookOpen, Film, Music, FileArchive } from 'lucide-react';

export const CategorizedDownloadCenter: React.FC = () => {
  const downloadPacks = [
    { name: 'High-Resolution RAW Photos ZIP', size: '8.4 GB', type: '300 DPI Original RAW', downloads: 14, icon: FileArchive },
    { name: 'Social Media Optimized Kit (WebP)', size: '420 MB', type: 'Instagram / Reels Sizes', downloads: 28, icon: ImageIcon },
    { name: 'Print-Ready Italian Album PDF', size: '1.2 GB', type: '24K Gold Foil Master PDF', downloads: 6, icon: BookOpen },
    { name: 'Cinematic 8K Wedding Film (MP4)', size: '4.8 GB', type: 'ProRes 422 8K UHD', downloads: 8, icon: Film },
  ];

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-5">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Download size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Categorized High-Speed Download Center</h3>
        </div>
        <Button variant="primary" size="sm" className="flex items-center gap-1.5">
          <Download size={14} /> Download Everything (ZIP 14.8 GB)
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {downloadPacks.map((pack, idx) => {
          const Icon = pack.icon;
          return (
            <div key={idx} className="p-4 rounded-xl bg-surface-base border border-border-subtle flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gold-500/10 text-gold-500 border border-gold-500/20">
                  <Icon size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-text-primary text-xs">{pack.name}</span>
                  <span className="text-[10px] text-text-tertiary">{pack.type} • {pack.size}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-text-tertiary font-mono">{pack.downloads} DLs</span>
                <Button variant="secondary" size="sm" className="flex items-center gap-1 text-[11px]">
                  <Download size={12} /> Download
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
