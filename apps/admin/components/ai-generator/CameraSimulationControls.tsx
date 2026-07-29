'use client';

import React from 'react';
import { Card, Badge, Select } from '@photomagic/ui';
import { Camera, Sun, Sliders, Disc } from 'lucide-react';

interface CameraSimulationControlsProps {
  brand: string;
  lens: string;
  aperture: string;
  lighting: string;
  onChange: (field: string, value: string) => void;
}

export const CameraSimulationControls: React.FC<CameraSimulationControlsProps> = ({
  brand,
  lens,
  aperture,
  lighting,
  onChange,
}) => {
  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Camera size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Optical & Lighting Camera Simulation</h3>
        </div>
        <Badge variant="gold">Leica / ARRI Optical Engine</Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-text-secondary">Camera Brand</label>
          <Select
            value={brand}
            onChange={(val: string) => onChange('brand', val)}
            options={[
              { value: 'Leica', label: 'Leica M11' },
              { value: 'Sony', label: 'Sony Alpha 1' },
              { value: 'Canon', label: 'Canon EOS R5 C' },
              { value: 'Nikon', label: 'Nikon Z9' },
              { value: 'Fujifilm', label: 'Fujifilm GFX 100 II' },
              { value: 'ARRI', label: 'ARRI Alexa 35' },
              { value: 'RED', label: 'RED V-Raptor 8K' },
            ]}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-text-secondary">Lens Focal Length</label>
          <Select
            value={lens}
            onChange={(val: string) => onChange('lens', val)}
            options={[
              { value: '24mm', label: '24mm Ultra-Wide' },
              { value: '35mm', label: '35mm Street/Story' },
              { value: '50mm', label: '50mm Prime' },
              { value: '85mm', label: '85mm Portrait' },
              { value: '135mm', label: '135mm Telephoto' },
              { value: '200mm', label: '200mm Super-Tele' },
            ]}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-text-secondary">Aperture Depth of Field</label>
          <Select
            value={aperture}
            onChange={(val: string) => onChange('aperture', val)}
            options={[
              { value: 'f1.2', label: 'f/1.2 Extreme Bokeh' },
              { value: 'f1.4', label: 'f/1.4 Soft Background' },
              { value: 'f1.8', label: 'f/1.8 Portrait' },
              { value: 'f2.8', label: 'f/2.8 Sharp Focus' },
              { value: 'f4', label: 'f/4.0 Landscape' },
              { value: 'f5.6', label: 'f/5.6 Studio' },
            ]}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-text-secondary">Studio & Natural Lighting</label>
          <Select
            value={lighting}
            onChange={(val: string) => onChange('lighting', val)}
            options={[
              { value: 'Golden Hour', label: 'Golden Hour Sunset' },
              { value: 'Softbox', label: 'Studio Softbox' },
              { value: 'Studio', label: 'High Key Studio' },
              { value: 'Natural', label: 'Soft Natural Daylight' },
              { value: 'Sunset', label: 'Warm Crimson Sunset' },
              { value: 'Neon', label: 'Cyberpunk Neon' },
              { value: 'Backlight', label: 'Rim Backlighting' },
            ]}
          />
        </div>
      </div>
    </Card>
  );
};
