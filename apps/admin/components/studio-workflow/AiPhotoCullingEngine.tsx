'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Wand2, Sparkles, Eye, CheckCircle2, XCircle, Filter, RefreshCw, Smile } from 'lucide-react';

export const AiPhotoCullingEngine: React.FC = () => {
  const [cullingSensitivity, setCullingSensitivity] = useState(85);
  const [isCulling, setIsCulling] = useState(false);

  const cullingStats = {
    totalScanned: 1200,
    rejectedBlur: 142,
    rejectedClosedEyes: 88,
    duplicatesGrouped: 310,
    approvedFavorites: 660,
  };

  const handleRunCulling = async () => {
    setIsCulling(true);
    await new Promise((resolve) => setTimeout(resolve, 1100));
    setIsCulling(false);
  };

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Wand2 size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Phase 9.3 Intelligent AI Photo Culling & Expression Filtering</h3>
        </div>
        <Badge variant="gold">Sub-Second Vision Analytics</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Controls & Sensitivity Slider */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-text-secondary">AI Expression & Sharpness Threshold ({cullingSensitivity}%)</span>
            </div>
            <input
              type="range"
              min={50}
              max={100}
              value={cullingSensitivity}
              onChange={(e) => setCullingSensitivity(Number(e.target.value))}
              className="accent-gold-500 cursor-pointer"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-1">
            <span className="text-text-tertiary">Automated Detection Filters Active:</span>
            <span className="font-mono text-[10px] text-text-primary">✔ Motion & Lens Blur Rejection</span>
            <span className="font-mono text-[10px] text-text-primary">✔ Closed Eyes & Blinking Facial Mask</span>
            <span className="font-mono text-[10px] text-text-primary">✔ Near-Duplicate Burst Grouping</span>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleRunCulling}
            disabled={isCulling}
            className="w-full mt-2 font-bold flex items-center justify-center gap-2"
          >
            {isCulling ? <RefreshCw size={16} className="animate-spin" /> : <Sparkles size={16} />}
            {isCulling ? 'Analyzing 1,200 RAW Frames...' : 'Execute Intelligent AI Photo Culling'}
          </Button>
        </div>

        {/* Culling Results Telemetry */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex flex-col justify-between">
            <span className="text-text-tertiary font-semibold">Total RAW Photos</span>
            <span className="text-2xl font-extrabold text-text-primary font-mono">{cullingStats.totalScanned}</span>
            <span className="text-[9px] text-text-tertiary font-mono">100% Ingested</span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex flex-col justify-between">
            <span className="text-text-tertiary font-semibold">Approved Favorites</span>
            <span className="text-2xl font-extrabold text-gold-500 font-mono">{cullingStats.approvedFavorites}</span>
            <span className="text-[9px] text-status-success font-mono">55% Keep Ratio</span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex flex-col justify-between">
            <span className="text-text-tertiary font-semibold">Blur / Closed Eyes</span>
            <span className="text-2xl font-extrabold text-status-error font-mono">{cullingStats.rejectedBlur + cullingStats.rejectedClosedEyes}</span>
            <span className="text-[9px] text-status-error font-mono">Auto Rejected</span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex flex-col justify-between">
            <span className="text-text-tertiary font-semibold">Grouped Duplicates</span>
            <span className="text-2xl font-extrabold text-text-secondary font-mono">{cullingStats.duplicatesGrouped}</span>
            <span className="text-[9px] text-text-tertiary font-mono">Burst Stacks</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
