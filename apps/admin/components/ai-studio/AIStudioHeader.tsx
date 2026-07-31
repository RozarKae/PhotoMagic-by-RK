'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Sparkles, Cpu, Zap, Activity, Coins, ShieldCheck } from 'lucide-react';

export const AIStudioHeader: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">
            AI Credits Remaining
          </span>
          <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <Coins size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">8,450 Credits</span>
        <span className="text-xs text-gold-500 font-semibold mt-1">
          Enterprise Subscription Active
        </span>
      </Card>

      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">
            AI Queue Engine
          </span>
          <div className="p-2 rounded-full bg-status-success/10 text-status-success border border-status-success/20">
            <Activity size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">1 Active Job</span>
        <span className="text-xs text-status-success font-semibold mt-1">
          Worker Queue Idle / Ready
        </span>
      </Card>

      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">
            Active Provider
          </span>
          <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <Sparkles size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">Gemini 1.5</span>
        <span className="text-xs text-text-tertiary mt-1">Fallback: OpenAI & Flux</span>
      </Card>

      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">Generation SLA</span>
          <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <Zap size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">1.2 Secs</span>
        <span className="text-xs text-status-success font-semibold mt-1">
          99.8% Speed Benchmark
        </span>
      </Card>
    </div>
  );
};
