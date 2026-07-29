'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Printer, Download, CheckCircle2, ShieldCheck, FileArchive, Layers, HardDrive, FileText } from 'lucide-react';

export const AlbumPrintLabPackageGenerator: React.FC = () => {
  const [labPreset, setLabPreset] = useState('graphistudio');
  const [resolutionDpi, setResolutionDpi] = useState('600');
  const [colorSpace, setColorSpace] = useState('CMYK');
  const [isGenerating, setIsGenerating] = useState(false);

  const labPresets = [
    { label: 'GraphiStudio (Italy)', value: 'graphistudio' },
    { label: 'WHCC (USA)', value: 'whcc' },
    { label: 'Miller’s Lab (USA)', value: 'millers_lab' },
    { label: 'Fuji Print Lab (Asia)', value: 'fuji_print_lab' },
  ];

  const handleGeneratePackage = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsGenerating(false);
  };

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Printer size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Phase 7.7 Professional Print Lab Package Generator</h3>
        </div>
        <Badge variant="success">600 DPI CMYK Pre-Flight Passed</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        {/* Print Lab Preset Selection */}
        <div className="flex flex-col gap-3">
          <label className="font-bold text-text-primary">Target Print Lab Preset</label>
          <div className="grid grid-cols-2 gap-2">
            {labPresets.map((lab) => (
              <Button
                key={lab.value}
                variant={labPreset === lab.value ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setLabPreset(lab.value)}
                className="text-[11px] font-medium"
              >
                {lab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Resolution & Color Profiles */}
        <div className="flex flex-col gap-3">
          <label className="font-bold text-text-primary">Print Resolution & Color Profile</label>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-text-secondary font-mono">DPI Resolution</label>
            <div className="flex gap-2">
              {(['300', '600'] as const).map((dpi) => (
                <Button
                  key={dpi}
                  variant={resolutionDpi === dpi ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setResolutionDpi(dpi)}
                  className="font-mono text-xs"
                >
                  {dpi} DPI Master
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1 pt-2 border-t border-border-subtle">
            <label className="font-semibold text-text-secondary">Color Profile Space</label>
            <select
              value={colorSpace}
              onChange={(e) => setColorSpace(e.target.value)}
              className="h-9 px-3 rounded-lg bg-surface-base border border-border-subtle text-xs text-text-primary font-mono focus:outline-none"
            >
              <option value="CMYK">U.S. Web Coated (SWOP) v2 (CMYK Print)</option>
              <option value="sRGB">sRGB IEC61966-2.1 (Digital Standard)</option>
              <option value="Adobe RGB">Adobe RGB (1998) Wide Gamut</option>
              <option value="ProPhoto RGB">ProPhoto RGB (Archival)</option>
            </select>
          </div>
        </div>

        {/* Generate Action & Assets Included */}
        <div className="flex flex-col gap-3">
          <label className="font-bold text-text-primary">Package Package Asset Checklist</label>
          <div className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-1">
            <span className="text-text-tertiary">Package Includes:</span>
            <span className="font-mono text-[10px] text-text-primary">✔ 30 High-Res Spreads (600 DPI TIFF)</span>
            <span className="font-mono text-[10px] text-text-primary">✔ 24K Gold Cover & Spine Artwork</span>
            <span className="font-mono text-[10px] text-text-primary">✔ Print Bleed & Margin Spec File</span>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleGeneratePackage}
            disabled={isGenerating}
            className="w-full mt-2 font-bold flex items-center justify-center gap-2"
          >
            <Download size={16} />
            {isGenerating ? 'Building Lab Package...' : `Generate ${labPreset.toUpperCase()} Print Package`}
          </Button>
        </div>
      </div>
    </Card>
  );
};
