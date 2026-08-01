import * as React from 'react';
import { Card, Badge } from '@photomagic/ui';
import { Cpu, Zap, Activity, ShieldCheck } from 'lucide-react';

export const GpuProcessingStatus: React.FC = () => {
  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Zap size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            GPU Tensor Core Acceleration Telemetry
          </h3>
        </div>
        <Badge variant="success">NVIDIA CUDA Enabled</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-1">
          <span className="text-text-tertiary">Active GPU Hardware</span>
          <span className="font-bold text-gold-500 text-xs">NVIDIA RTX 4090 (24 GB)</span>
          <span className="text-[10px] text-status-success font-mono">
            1.2ms / Frame Tensor Core
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-1">
          <span className="text-text-tertiary">VRAM Memory Usage</span>
          <span className="font-bold text-text-primary text-xs">4.8 GB / 24.0 GB</span>
          <span className="text-[10px] text-text-tertiary font-mono">20% Capacity Utilization</span>
        </div>

        <div className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-1">
          <span className="text-text-tertiary">Identity Preservation</span>
          <span className="font-bold text-status-success text-xs">100% Identity Score</span>
          <span className="text-[10px] text-text-tertiary font-mono">Pore Structure Lock</span>
        </div>
      </div>
    </Card>
  );
};
