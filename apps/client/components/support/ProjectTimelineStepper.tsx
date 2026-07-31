'use client';

import React from 'react';
import { Card, Badge } from '@photomagic/ui';
import { CheckCircle2, Clock, Calendar, Sparkles } from 'lucide-react';

export interface TimelineStage {
  id: string;
  stageName: string;
  status: 'completed' | 'current' | 'pending';
  timestamp: string;
  description: string;
  progressPercent: number;
}

export const ProjectTimelineStepper: React.FC = () => {
  const stages: TimelineStage[] = [
    {
      id: 't1',
      stageName: 'Booking Confirmed',
      status: 'completed',
      timestamp: 'Jul 01, 10:00 AM',
      description: 'Destination Wedding contract signed & confirmed.',
      progressPercent: 6,
    },
    {
      id: 't2',
      stageName: 'Advance Paid',
      status: 'completed',
      timestamp: 'Jul 01, 10:30 AM',
      description: '50% Retainer payment ($4,500) received via Razorpay.',
      progressPercent: 12,
    },
    {
      id: 't3',
      stageName: 'Shoot Completed',
      status: 'completed',
      timestamp: 'Jul 15, 08:00 PM',
      description: '3-Day Royal Udaipur wedding shoot successfully completed.',
      progressPercent: 25,
    },
    {
      id: 't4',
      stageName: 'Photos Uploading',
      status: 'completed',
      timestamp: 'Jul 16, 02:00 PM',
      description: 'RAW backup uploaded to Cloudflare R2 storage.',
      progressPercent: 32,
    },
    {
      id: 't5',
      stageName: 'Gallery Ready',
      status: 'completed',
      timestamp: 'Jul 18, 11:00 AM',
      description: 'Client selection proofing gallery published.',
      progressPercent: 40,
    },
    {
      id: 't6',
      stageName: 'Photo Selection Pending',
      status: 'completed',
      timestamp: 'Jul 20, 04:00 PM',
      description: 'Client reviewing gallery to mark favorites.',
      progressPercent: 50,
    },
    {
      id: 't7',
      stageName: 'Photo Selection Completed',
      status: 'completed',
      timestamp: 'Jul 22, 06:30 PM',
      description: 'Client finalized 120 selected photos for album.',
      progressPercent: 60,
    },
    {
      id: 't8',
      stageName: 'Editing In Progress',
      status: 'current',
      timestamp: 'Active Now',
      description: 'AI color grading & skin retouching in progress.',
      progressPercent: 72,
    },
    {
      id: 't9',
      stageName: 'Editing Completed',
      status: 'pending',
      timestamp: 'Est. Jul 30',
      description: 'High-res color mastered versions finalized.',
      progressPercent: 78,
    },
    {
      id: 't10',
      stageName: 'Album Designing',
      status: 'pending',
      timestamp: 'Est. Aug 02',
      description: '12x18 Flush-mount album spread layout.',
      progressPercent: 84,
    },
    {
      id: 't11',
      stageName: 'Album Proof Uploaded',
      status: 'pending',
      timestamp: 'Est. Aug 04',
      description: 'Digital album proof uploaded for client review.',
      progressPercent: 88,
    },
    {
      id: 't12',
      stageName: 'Client Review & Approval',
      status: 'pending',
      timestamp: 'Est. Aug 06',
      description: 'Client digital signature approval.',
      progressPercent: 92,
    },
    {
      id: 't13',
      stageName: 'Italian Print Lab Dispatch',
      status: 'pending',
      timestamp: 'Est. Aug 08',
      description: 'Leather cover & 24K gold foil stamping.',
      progressPercent: 95,
    },
    {
      id: 't14',
      stageName: 'Ready for Delivery',
      status: 'pending',
      timestamp: 'Est. Aug 12',
      description: 'Handcrafted luxury presentation box package.',
      progressPercent: 98,
    },
    {
      id: 't15',
      stageName: 'Delivered',
      status: 'pending',
      timestamp: 'Est. Aug 14',
      description: 'Final album & RAW ZIP package delivered.',
      progressPercent: 100,
    },
  ];

  const currentProgress = 72;

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Clock size={20} className="text-gold-500" />
          <h3 className="text-base font-bold text-text-primary">
            Master Project Completion Timeline
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-gold-500 font-bold">
            Overall Progress: {currentProgress}%
          </span>
          <Badge variant="gold">Stage 8 of 15 Active</Badge>
        </div>
      </div>

      {/* Master Progress Bar */}
      <div className="w-full bg-surface-elevated h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-gold-500 h-full transition-all duration-500"
          style={{ width: `${currentProgress}%` }}
        />
      </div>

      {/* 15-Stage Stepper Vertical Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        {stages.map((st, idx) => (
          <div
            key={st.id}
            className={`p-4 rounded-xl border flex flex-col justify-between gap-2 transition-all ${
              st.status === 'completed'
                ? 'bg-gold-500/10 border-gold-500/40'
                : st.status === 'current'
                  ? 'bg-gold-500/20 border-gold-500 shadow-xl ring-1 ring-gold-500'
                  : 'bg-surface-base border-border-subtle opacity-60'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-gold-500 text-xs">#{idx + 1}</span>
                <span className="font-bold text-text-primary">{st.stageName}</span>
              </div>
              <Badge
                variant={
                  st.status === 'completed' ? 'success' : st.status === 'current' ? 'gold' : 'info'
                }
              >
                {st.status}
              </Badge>
            </div>

            <p className="text-[11px] text-text-secondary">{st.description}</p>

            <div className="flex justify-between items-center pt-2 border-t border-border-subtle text-[10px] text-text-tertiary font-mono">
              <span>{st.timestamp}</span>
              <span>{st.progressPercent}%</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
