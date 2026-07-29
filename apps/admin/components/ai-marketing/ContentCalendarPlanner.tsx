'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Calendar as CalendarIcon, Clock, Plus, CheckCircle2 } from 'lucide-react';

export const ContentCalendarPlanner: React.FC = () => {
  const scheduledPosts = [
    { date: 'Jul 30', platform: 'Instagram', title: 'Royal Wedding Reels Campaign', time: '18:00', status: 'scheduled' },
    { date: 'Aug 02', platform: 'Facebook', title: 'Pre-Wedding Portfolio Showcase', time: '11:00', status: 'scheduled' },
    { date: 'Aug 05', platform: 'LinkedIn', title: 'Studio Expansion Announcement', time: '14:30', status: 'draft' },
  ];

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <CalendarIcon size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Content Marketing Publishing Calendar</h3>
        </div>
        <Button variant="primary" size="sm" className="flex items-center gap-1">
          <Plus size={14} /> Schedule Post
        </Button>
      </div>

      <div className="flex flex-col gap-3 text-xs">
        {scheduledPosts.map((post, idx) => (
          <div key={idx} className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gold-500/10 text-gold-500 border border-gold-500/20 flex flex-col items-center min-w-[50px]">
                <span className="font-bold font-mono text-xs">{post.date}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-text-primary">{post.title}</span>
                <span className="text-[10px] text-text-tertiary">{post.platform} • {post.time}</span>
              </div>
            </div>
            <Badge variant={post.status === 'scheduled' ? 'gold' : 'warning'}>{post.status}</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};
