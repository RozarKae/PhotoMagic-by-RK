'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import {
  Cpu,
  Play,
  Pause,
  XCircle,
  RefreshCw,
  Activity,
  Layers,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const AiBatchProcessingQueue: React.FC = () => {
  const [queueStatus, setQueueStatus] = useState<'processing' | 'paused'>('processing');
  const [completedCount, setCompletedCount] = useState(88);
  const totalCount = 120;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const activeBatch = [
    {
      id: 'b-1',
      name: 'Mandap Vows Batch #04',
      ops: 'Skin Retouch + Color Match + 4x Upscale',
      status: 'completed',
    },
    {
      id: 'b-2',
      name: 'Reception Gala Batch #05',
      ops: 'Generative Object Removal (Photobombers)',
      status: 'processing',
    },
    {
      id: 'b-3',
      name: 'High-Fashion Editorial Batch #06',
      ops: '8K Super-Resolution + Watermark',
      status: 'queued',
    },
  ];

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Cpu size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Phase 4.8 AI Batch Editing & Worker Queue Manager
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={queueStatus === 'processing' ? 'success' : 'gold'}>
            {queueStatus === 'processing' ? 'Active Workers Processing' : 'Queue Paused'}
          </Badge>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setQueueStatus(queueStatus === 'processing' ? 'paused' : 'processing')}
            className="flex items-center gap-1 text-xs"
          >
            {queueStatus === 'processing' ? <Pause size={12} /> : <Play size={12} />}
            {queueStatus === 'processing' ? 'Pause Queue' : 'Resume Queue'}
          </Button>
        </div>
      </div>

      {/* Progress & GPU Monitor */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col justify-between">
          <span className="text-text-tertiary font-semibold">Total Batch Progress</span>
          <span className="text-2xl font-extrabold text-gold-500 font-mono mt-1">
            {progressPercent}%
          </span>
          <span className="text-[10px] text-text-tertiary font-mono">
            {completedCount} of {totalCount} Images Completed
          </span>
        </div>

        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col justify-between">
          <span className="text-text-tertiary font-semibold">NVIDIA CUDA GPU Utilization</span>
          <span className="text-2xl font-extrabold text-status-success font-mono mt-1">
            42% Capacity
          </span>
          <span className="text-[10px] text-status-success font-mono">
            RTX 4090 24GB (4.8 GB VRAM)
          </span>
        </div>

        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col justify-between">
          <span className="text-text-tertiary font-semibold">Estimated Completion Time</span>
          <span className="text-2xl font-extrabold text-text-primary font-mono mt-1">
            ~42 Seconds
          </span>
          <span className="text-[10px] text-text-tertiary font-mono">
            Parallel Worker Threads Active
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-surface-elevated h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-gold-500 h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Batch Operations List */}
      <div className="flex flex-col gap-2.5 text-xs">
        {activeBatch.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex justify-between items-center"
          >
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-text-primary">{item.name}</span>
                <Badge
                  variant={
                    item.status === 'completed'
                      ? 'success'
                      : item.status === 'processing'
                        ? 'gold'
                        : 'info'
                  }
                >
                  {item.status}
                </Badge>
              </div>
              <span className="text-[10px] text-text-tertiary">{item.ops}</span>
            </div>
            {item.status === 'processing' && (
              <RefreshCw size={14} className="animate-spin text-gold-500" />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
