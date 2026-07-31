'use client';

import React from 'react';
import { Card, Badge } from '@photomagic/ui';
import { Megaphone, Calendar, Info } from 'lucide-react';

export const StudioAnnouncementsBanner: React.FC = () => {
  const announcements = [
    {
      title: 'Diwali & New Year Office Holiday Schedule',
      date: 'Notice: Nov 01 - Nov 05',
      type: 'holiday',
      text: 'Our Udaipur & Mumbai studios will operate on limited hours for festival season. Emergency support remains active.',
    },
    {
      title: 'Italian Leather Album Express Dispatch Available',
      date: 'Special Offer',
      type: 'offer',
      text: 'Upgrade to 24K Gold Stamping Foil for 15% off during August booking window.',
    },
  ];

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Megaphone size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Studio Announcements & Operations Notices
          </h3>
        </div>
        <Badge variant="gold">2 Active Notices</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {announcements.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-bold text-text-primary">{item.title}</span>
              <Badge variant="gold" className="text-[9px]">
                {item.date}
              </Badge>
            </div>
            <p className="text-[11px] text-text-secondary">{item.text}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
