'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Download, FileArchive, Layers, ShieldCheck, HardDrive, FileText, CheckCircle2 } from 'lucide-react';

export const AiExportCenterHub: React.FC = () => {
  const [exportFormat, setExportFormat] = useState('jpeg');
  const [resolution, setResolution] = useState('4k');
  const [colorProfile, setColorProfile] = useState('sRGB');
  const [watermarkEnabled, setWatermarkEnabled] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const formats = ['jpeg', 'png', 'webp', 'tiff', 'pdf', 'zip'];
  const resolutions = ['original', '1080p', '2k', '4k', '8k'];

  const handleExecuteExport = async () => {
    setIsExporting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsExporting(false);
  };

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Download size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Phase 4.9 Professional AI Master Export Center & Cloud Manager</h3>
        </div>
        <Badge variant="success">Cloudflare R2 High-Speed CDN Ready</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        {/* Export Format & Resolution */}
        <div className="flex flex-col gap-3">
          <label className="font-bold text-text-primary">Master Export Package Format</label>
          <div className="grid grid-cols-3 gap-2">
            {formats.map((fmt) => (
              <Button
                key={fmt}
                variant={exportFormat === fmt ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setExportFormat(fmt)}
                className="uppercase text-[11px] font-mono"
              >
                {fmt}
              </Button>
            ))}
          </div>

          <div className="flex flex-col gap-1 pt-2 border-t border-border-subtle">
            <label className="font-semibold text-text-secondary">Target Output Resolution</label>
            <div className="grid grid-cols-3 gap-2">
              {resolutions.map((res) => (
                <Button
                  key={res}
                  variant={resolution === res ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setResolution(res)}
                  className="uppercase text-[11px] font-mono"
                >
                  {res}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Color Profiles & Watermark Controls */}
        <div className="flex flex-col gap-3">
          <label className="font-bold text-text-primary">Color Profile & Metadata Tags</label>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-text-secondary">Color Profile Space</label>
            <select
              value={colorProfile}
              onChange={(e) => setColorProfile(e.target.value)}
              className="h-9 px-3 rounded-lg bg-surface-base border border-border-subtle text-xs text-text-primary font-mono focus:outline-none"
            >
              <option value="sRGB">sRGB (Web & Digital Displays)</option>
              <option value="Adobe RGB">Adobe RGB (Wide Gamut Print)</option>
              <option value="ProPhoto RGB">ProPhoto RGB (Master Studio Archival)</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-border-subtle">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={watermarkEnabled}
                onChange={(e) => setWatermarkEnabled(e.target.checked)}
                className="accent-gold-500"
              />
              <span className="text-text-primary font-medium">Apply Transparent Studio Watermark</span>
            </label>
            <span className="text-[10px] text-text-tertiary">Copyright: PhotoMagic Studio © 2026</span>
          </div>
        </div>

        {/* Download Manager & Cloud Dispatch */}
        <div className="flex flex-col gap-3">
          <label className="font-bold text-text-primary">Cloud Package Dispatch</label>
          <div className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-1">
            <span className="text-text-tertiary">Estimated Export Package Size</span>
            <span className="font-bold font-mono text-gold-500 text-sm">
              {exportFormat === 'zip' ? '4.8 GB (120 Files)' : '840 MB (30 Master Files)'}
            </span>
            <span className="text-[10px] text-status-success font-mono">Cloudflare R2 S3 Sync</span>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleExecuteExport}
            disabled={isExporting}
            className="w-full mt-2 font-bold flex items-center justify-center gap-2"
          >
            <Download size={16} />
            {isExporting ? 'Packaging Export Assets...' : `Export Master ${exportFormat.toUpperCase()} Package`}
          </Button>
        </div>
      </div>
    </Card>
  );
};
