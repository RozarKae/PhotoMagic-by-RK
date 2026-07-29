'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Select } from '@photomagic/ui';
import { Download, FileImage, ShieldCheck } from 'lucide-react';

export const ExportManagerSkeleton: React.FC = () => {
  const [format, setFormat] = useState('png');
  const [dpi, setDpi] = useState('300');

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Download size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">High-Res Image Export Manager Skeleton</h3>
        </div>
        <Badge variant="gold">300 DPI Export Ready</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-text-secondary">Export File Format</label>
          <Select
            value={format}
            onChange={(val: string) => setFormat(val)}
            options={[
              { value: 'png', label: 'PNG 24-bit Lossless' },
              { value: 'jpeg', label: 'JPEG 100% Quality' },
              { value: 'webp', label: 'WebP Ultra Compression' },
              { value: 'tiff', label: 'TIFF 16-bit Print Master' },
            ]}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-text-secondary">Target Print Resolution</label>
          <Select
            value={dpi}
            onChange={(val: string) => setDpi(val)}
            options={[
              { value: '300', label: '300 DPI Fine Art Print' },
              { value: '150', label: '150 DPI Standard Print' },
              { value: '72', label: '72 DPI Web & Social Media' },
            ]}
          />
        </div>
      </div>

      <Button variant="primary" className="flex items-center justify-center gap-2 mt-2">
        <Download size={16} /> Export High-Res Master Image
      </Button>
    </Card>
  );
};
