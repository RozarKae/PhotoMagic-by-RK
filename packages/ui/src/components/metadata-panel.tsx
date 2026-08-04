import * as React from 'react';
import { Camera, Sliders, Aperture, Clock, Maximize2, FileText, HardDrive } from 'lucide-react';

export interface MetadataItem {
  label: string;
  value: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

export interface MetadataPanelProps {
  cameraModel?: string;
  lensSpec?: string;
  aperture?: string;
  shutterSpeed?: string;
  iso?: string;
  resolution?: string;
  fileSize?: string;
  colorSpace?: string;
  customMetadata?: MetadataItem[];
  className?: string;
}

export const MetadataPanel: React.FC<MetadataPanelProps> = ({
  cameraModel = 'Leica SL2-S',
  lensSpec = 'Summilux-SL 50mm f/1.4 ASPH',
  aperture = 'f/1.4',
  shutterSpeed = '1/1000s',
  iso = 'ISO 100',
  resolution = '6000 × 4000 (24 MP)',
  fileSize = '42.8 MB RAW',
  colorSpace = 'Adobe RGB (1998)',
  customMetadata = [],
  className = '',
}) => {
  return (
    <div
      className={`p-5 rounded-2xl bg-[#090909] border border-white/10 flex flex-col gap-4 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-white/10">
        <Camera size={16} className="text-gold-400" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-gold-400">
          TECHNICAL EXIF METADATA
        </span>
      </div>

      {/* Main Exposure Settings Grid */}
      <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#141414] border border-white/5 text-center font-mono">
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] text-silver/60 uppercase tracking-wider">APERTURE</span>
          <span className="text-xs font-bold text-ivory">{aperture}</span>
        </div>
        <div className="flex flex-col gap-0.5 border-x border-white/10">
          <span className="text-[9px] text-silver/60 uppercase tracking-wider">SHUTTER</span>
          <span className="text-xs font-bold text-ivory">{shutterSpeed}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] text-silver/60 uppercase tracking-wider">ISO</span>
          <span className="text-xs font-bold text-ivory">{iso}</span>
        </div>
      </div>

      {/* Technical Spec List */}
      <div className="flex flex-col gap-2.5 font-mono text-[11px]">
        <div className="flex justify-between items-center text-silver">
          <span className="flex items-center gap-1.5 text-silver/70">
            <Camera size={13} className="text-gold-400/80" /> Camera
          </span>
          <span className="text-ivory font-semibold">{cameraModel}</span>
        </div>
        <div className="flex justify-between items-center text-silver">
          <span className="flex items-center gap-1.5 text-silver/70">
            <Aperture size={13} className="text-gold-400/80" /> Lens
          </span>
          <span className="text-ivory truncate max-w-[180px] font-semibold">{lensSpec}</span>
        </div>
        <div className="flex justify-between items-center text-silver">
          <span className="flex items-center gap-1.5 text-silver/70">
            <Maximize2 size={13} className="text-gold-400/80" /> Dimensions
          </span>
          <span className="text-ivory font-semibold">{resolution}</span>
        </div>
        <div className="flex justify-between items-center text-silver">
          <span className="flex items-center gap-1.5 text-silver/70">
            <HardDrive size={13} className="text-gold-400/80" /> File Size
          </span>
          <span className="text-ivory font-semibold">{fileSize}</span>
        </div>
        <div className="flex justify-between items-center text-silver">
          <span className="flex items-center gap-1.5 text-silver/70">
            <FileText size={13} className="text-gold-400/80" /> Color Space
          </span>
          <span className="text-ivory font-semibold">{colorSpace}</span>
        </div>

        {customMetadata.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center text-silver">
            <span className="flex items-center gap-1.5 text-silver/70">{item.label}</span>
            <span className="text-ivory font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
