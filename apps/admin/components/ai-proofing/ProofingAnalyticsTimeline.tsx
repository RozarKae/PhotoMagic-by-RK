import * as React from 'react';
import { Card, Badge } from '@photomagic/ui';
import { Activity, Clock, Heart, Eye, CheckCircle2 } from 'lucide-react';

export const ProofingAnalyticsTimeline: React.FC = () => {
  const steps = [
    { title: 'Booking Confirmed', date: 'Jul 10', completed: true },
    { title: 'Shoot Completed', date: 'Jul 18', completed: true },
    { title: 'AI Quality Selection Sent', date: 'Jul 20', completed: true },
    { title: 'Client Reviewing', date: 'Jul 29', completed: true },
    { title: 'Final Delivery & Print', date: 'Pending', completed: false },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Progress Stepper */}
      <Card variant="glass" className="lg:col-span-2 p-5 flex flex-col gap-4">
        <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-gold-500" />
            <h3 className="text-sm font-bold text-text-primary">Client Project Milestone Timeline</h3>
          </div>
          <Badge variant="gold">Step 4 of 5 Active</Badge>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2 overflow-x-auto">
          {steps.map((s, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1.5 flex-1 min-w-[90px] text-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${
                s.completed ? 'bg-gold-500 text-surface-base border-gold-500' : 'bg-surface-base text-text-tertiary border-border-subtle'
              }`}>
                {idx + 1}
              </div>
              <span className="font-bold text-[11px] text-text-primary leading-tight">{s.title}</span>
              <span className="text-[9px] text-text-tertiary">{s.date}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Engagement Metrics */}
      <Card variant="glass" className="p-5 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold uppercase text-text-tertiary">Client Engagement</span>
          <Activity size={18} className="text-gold-500" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-extrabold text-text-primary">94.8 / 100</span>
          <span className="text-xs text-status-success font-semibold">High Activity (24 Favorites Marked)</span>
        </div>
        <div className="text-[10px] text-text-tertiary pt-2 border-t border-border-subtle flex justify-between">
          <span>Views: 142</span>
          <span>Avg Review Time: 18 mins</span>
        </div>
      </Card>
    </div>
  );
};
