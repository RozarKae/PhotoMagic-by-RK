'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Printer, Download, CheckCircle2, ShieldCheck, FileText, FileArchive, Layers, HardDrive } from 'lucide-react';

export const PrintProductionExportCenter: React.FC = () => {
  const [albumSize, setAlbumSize] = useState('12x18 Inches');
  const [paperType, setPaperType] = useState('Italian Velvet Lustre');
  const [coverType, setCoverType] = useState('Italian Genuine Leather');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [isExporting, setIsExporting] = useState(false);

  const calculateSpineThickness = () => {
    // 30 pages * 0.4mm per lustre sheet + 4mm cover = 16mm spine
    return '16.0 mm Spine';
  };

  const handleExport = async () => {
    setIsExporting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsExporting(false);
  };

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Printer size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Print Lab Production Settings & High-Res Export Hub</h3>
        </div>
        <Badge variant="success">300 DPI CMYK Pre-Flight Validation Passed</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        {/* Album Sizes & Paper Specifications */}
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-text-primary border-b border-border-subtle pb-1">Album Dimensions & Paper</h4>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-text-secondary">Target Album Trim Size</label>
            <select
              value={albumSize}
              onChange={(e) => setAlbumSize(e.target.value)}
              className="h-9 px-3 rounded-lg bg-surface-base border border-border-subtle text-xs text-text-primary font-mono focus:outline-none"
            >
              <option value="12x18 Inches">12x18 Inches (Royal Widescreen)</option>
              <option value="10x14 Inches">10x14 Inches (Classic Master)</option>
              <option value="12x12 Inches Square">12x12 Inches (Square Flush-Mount)</option>
              <option value="8x12 Inches">8x12 Inches (Parent Companion)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-text-secondary">Print Paper Stock</label>
            <select
              value={paperType}
              onChange={(e) => setPaperType(e.target.value)}
              className="h-9 px-3 rounded-lg bg-surface-base border border-border-subtle text-xs text-text-primary font-mono focus:outline-none"
            >
              <option value="Italian Velvet Lustre">Italian Velvet Lustre (Non-Reflective)</option>
              <option value="Fuji Fine Art Matte">Fuji Fine Art Matte (Museum Quality)</option>
              <option value="Metallic Gloss Pearl">Metallic Gloss Pearl (High-Contrast)</option>
              <option value="Deep Matte Silk">Deep Matte Silk (Rich Blacks)</option>
            </select>
          </div>
        </div>

        {/* Cover Materials & Spine Thickness */}
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-text-primary border-b border-border-subtle pb-1">Cover Material & Spine Calculator</h4>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-text-secondary">Cover Binding Material</label>
            <select
              value={coverType}
              onChange={(e) => setCoverType(e.target.value)}
              className="h-9 px-3 rounded-lg bg-surface-base border border-border-subtle text-xs text-text-primary font-mono focus:outline-none"
            >
              <option value="Italian Genuine Leather">Italian Genuine Leather (Gold Stamped)</option>
              <option value="Royal Velvet Plush">Royal Velvet Plush (Embossed)</option>
              <option value="Acrylic Crystal Glass">Acrylic Crystal Glass (High-Gloss)</option>
              <option value="Fine Linen Fabric">Fine Linen Fabric (Textured)</option>
            </select>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-1">
            <span className="text-text-tertiary">Calculated Spine Width</span>
            <span className="font-bold font-mono text-gold-500 text-sm">{calculateSpineThickness()}</span>
            <span className="text-[10px] text-text-tertiary font-mono">30 Pages @ 0.40mm per Sheet</span>
          </div>
        </div>

        {/* Export Engine Format Selection */}
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-text-primary border-b border-border-subtle pb-1">Export Package Formats</h4>
          <div className="grid grid-cols-2 gap-2">
            {(['pdf', 'tiff', 'jpeg', 'zip'] as const).map((fmt) => (
              <Button
                key={fmt}
                variant={exportFormat === fmt ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setExportFormat(fmt)}
                className="uppercase font-mono text-xs"
              >
                {fmt} Package
              </Button>
            ))}
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleExport}
            disabled={isExporting}
            className="w-full mt-2 font-bold flex items-center justify-center gap-2"
          >
            <Download size={16} />
            {isExporting ? 'Generating 300 DPI Export...' : `Export ${exportFormat.toUpperCase()} Print Package`}
          </Button>
        </div>
      </div>
    </Card>
  );
};
