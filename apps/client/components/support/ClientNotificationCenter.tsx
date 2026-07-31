'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import {
  Bell,
  Image as ImageIcon,
  BookOpen,
  DollarSign,
  MessageSquare,
  Settings,
  CheckCircle2,
} from 'lucide-react';

export interface NotificationItem {
  id: string;
  category: 'gallery' | 'album' | 'payments' | 'messages' | 'system';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

export const ClientNotificationCenter: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'today'>('all');
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n-1',
      category: 'gallery',
      title: 'Smart Proofing Gallery Ready',
      description: 'Your 300 RAW wedding photos are live for selection.',
      timestamp: '10:15 AM',
      read: false,
    },
    {
      id: 'n-2',
      category: 'payments',
      title: 'Retainer Payment Receipt Generated',
      description: 'Invoice #INV-2026-088 payment ($4,500) confirmed.',
      timestamp: 'Yesterday',
      read: true,
    },
    {
      id: 'n-3',
      category: 'album',
      title: 'Album Design Proof Preview',
      description: 'Chapter 4 Mandap Vows spread layout updated.',
      timestamp: '2 days ago',
      read: true,
    },
  ]);

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Bell size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Client In-App Notification Center</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={markAllRead} className="text-xs text-gold-500">
            Mark All Read
          </Button>
          <Badge variant="gold">{notifications.filter((n) => !n.read).length} Unread</Badge>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 text-xs">
        {(['all', 'unread', 'today'] as const).map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter(f)}
            className="capitalize"
          >
            {f}
          </Button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="flex flex-col gap-2.5 text-xs">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-text-tertiary">No notifications found.</div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border flex justify-between items-center ${
                !item.read
                  ? 'bg-gold-500/10 border-gold-500'
                  : 'bg-surface-base border-border-subtle opacity-80'
              }`}
            >
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-text-primary">{item.title}</span>
                  <Badge variant="gold" className="text-[9px] uppercase">
                    {item.category}
                  </Badge>
                </div>
                <p className="text-[11px] text-text-secondary">{item.description}</p>
              </div>
              <span className="text-[10px] text-text-tertiary font-mono">{item.timestamp}</span>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
