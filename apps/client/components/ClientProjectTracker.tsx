'use client';

import React from 'react';
import { CheckCircle2, Clock, Circle } from 'lucide-react';

interface Step {
  id: string;
  label: string;
  status: 'completed' | 'active' | 'upcoming';
}

interface ClientProjectTrackerProps {
  steps: Step[];
}

export const ClientProjectTracker: React.FC<ClientProjectTrackerProps> = ({ steps }) => {
  return (
    <div className="w-full py-4">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {steps.map((step, idx) => {
          return (
            <div
              key={step.id}
              className={`flex flex-col p-3 rounded-lg border text-left transition-colors ${
                step.status === 'completed'
                  ? 'bg-gold-500/10 border-gold-500/30 text-gold-500'
                  : step.status === 'active'
                    ? 'bg-surface-elevated border-gold-500 text-text-primary shadow-sm'
                    : 'bg-surface-base border-border-subtle text-text-tertiary'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Step 0{idx + 1}
                </span>
                {step.status === 'completed' && (
                  <CheckCircle2 size={16} className="text-gold-500" />
                )}
                {step.status === 'active' && (
                  <Clock size={16} className="text-gold-500 animate-pulse" />
                )}
                {step.status === 'upcoming' && <Circle size={16} className="text-border-subtle" />}
              </div>
              <span className="text-xs font-semibold leading-tight">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
