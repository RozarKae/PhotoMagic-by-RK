import * as React from 'react';
import { Card, Badge } from '@photomagic/ui';
import { Activity, Clock } from 'lucide-react';

export const ProjectActivityLog: React.FC = () => {
  const activities = [
    { time: '10:32 AM', event: 'Proofing Gallery Published', details: '300 RAW photos uploaded by PhotoMagic Studio Team.' },
    { time: 'Yesterday', event: 'Album Proof Created', details: 'Chapter 4 Mandap Vows layout compiled by Master Editor.' },
    { time: 'Jul 18', event: 'Advance Payment Confirmed', details: '$4,500 retainer processed successfully.' },
    { time: 'Jul 10', event: 'Booking Confirmed', details: 'Royal Destination Wedding shoot scheduled.' },
  ];

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Chronological Project Activity Ledger</h3>
        </div>
        <Badge variant="gold">Real-Time Sync</Badge>
      </div>

      <div className="flex flex-col gap-3 text-xs">
        {activities.map((act, idx) => (
          <div key={idx} className="p-3 rounded-lg bg-surface-base border border-border-subtle flex justify-between items-center">
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-text-primary">{act.event}</span>
              <span className="text-[10px] text-text-tertiary">{act.details}</span>
            </div>
            <span className="text-[10px] font-mono text-gold-500">{act.time}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
