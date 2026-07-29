import React from 'react';
import { Card, Badge } from '@photomagic/ui';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

export const CalendarWidget: React.FC = () => {
  const upcomingShoots = [
    {
      title: 'Udaipur Royal Wedding',
      date: 'Oct 24, 2026',
      time: '09:00 AM',
      location: 'City Palace, Udaipur',
    },
    {
      title: 'Paris Editorial Shoot',
      date: 'Nov 12, 2026',
      time: '02:00 PM',
      location: 'Le Meurice, Paris',
    },
  ];

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <CalendarIcon size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Upcoming Shoots</h3>
        </div>
        <Badge variant="gold">Calendar</Badge>
      </div>

      <div className="flex flex-col gap-3">
        {upcomingShoots.map((shoot, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg bg-surface-base border border-border-subtle flex flex-col gap-1 text-xs"
          >
            <span className="font-bold text-text-primary">{shoot.title}</span>
            <div className="flex items-center gap-3 text-text-tertiary">
              <span className="flex items-center gap-1">
                <Clock size={12} className="text-gold-500" />
                {shoot.date} • {shoot.time}
              </span>
            </div>
            <span className="text-[11px] text-text-secondary">{shoot.location}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
