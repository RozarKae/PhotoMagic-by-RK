import * as React from 'react';
import {
  X,
  Sliders,
  CheckCircle2,
  Tag,
  MessageSquare,
  Sparkles,
  Download,
  Eye,
} from 'lucide-react';
import { Button } from './button';

export interface InspectorSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  imageSrc?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}

export const InspectorSidebar: React.FC<InspectorSidebarProps> = ({
  isOpen,
  onClose,
  title = 'Photo Inspector',
  imageSrc,
  imageAlt = 'Selected Photograph',
  children,
}) => {
  if (!isOpen) return null;

  return (
    <aside className="w-80 h-full bg-[#141414] border-l border-white/10 p-5 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right-4 duration-300 z-30">
      {/* Inspector Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Sliders size={16} className="text-gold-400" />
          <h3 className="font-heading text-lg font-bold text-ivory tracking-wide">{title}</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-silver hover:text-ivory hover:bg-[#1D1D1D] transition-colors"
          aria-label="Close Inspector"
        >
          <X size={18} />
        </button>
      </div>

      {/* Main Inspector Body */}
      <div className="flex-1 py-4 space-y-5">
        {imageSrc && (
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#090909] border border-white/10 shadow-museum">
            <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
            <div className="absolute top-2 right-2 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md font-mono text-[9px] text-gold-400 border border-gold-500/30">
              PROOF #402
            </div>
          </div>
        )}

        {children}
      </div>

      {/* Quick Action Footer */}
      <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
        <Button variant="primary" size="sm" className="w-full font-nav text-[10px]">
          <Download size={13} className="mr-1.5" /> Download High-Res Master
        </Button>
      </div>
    </aside>
  );
};
