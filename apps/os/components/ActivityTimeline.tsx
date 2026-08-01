import React from 'react';
import { Card, Badge } from '@photomagic/ui';
import { Clock, DollarSign, Camera, CheckCircle2, UserPlus } from 'lucide-react';

export const ActivityTimeline: React.FC = () => {
  const activities = [
    {
      id: 'act-1',
      title: 'Royal Palace Deposit Verified',
      desc: '$2,500 retainer received from Eleanor Vance via Razorpay.',
      icon: <DollarSign size={16} className="text-status-success" />,
      time: '12 mins ago',
    },
    {
      id: 'act-2',
      title: 'Proofing Selections Locked',
      desc: 'Sarah Montgomery locked 65 photos for Vogue album design.',
      icon: <CheckCircle2 size={16} className="text-gold-500" />,
      time: '1 hour ago',
    },
    {
      id: 'act-3',
      title: 'New Priority Inquiry',
      desc: 'Arthur Pendelton submitted consultation form for Studio Portraiture.',
      icon: <UserPlus size={16} className="text-status-info" />,
      time: '3 hours ago',
    },
  ];

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <h3 className="text-base font-bold text-text-primary">Recent Activity Log</h3>
        <Badge variant="gold">Live Audit</Badge>
      </div>

      <div className="flex flex-col gap-4">
        {activities.map((act) => (
          <div key={act.id} className="flex gap-3 items-start text-xs">
            <div className="p-2 rounded-full bg-surface-elevated border border-border-subtle flex-shrink-0 mt-0.5">
              {act.icon}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-text-primary">{act.title}</span>
              <span className="text-text-secondary leading-relaxed">{act.desc}</span>
              <span className="text-[10px] text-text-tertiary mt-0.5">{act.time}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
