import React from 'react';
import { Card, Badge } from '@photomagic/ui';
import { Bell, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface NotificationPanelProps {
  onClose?: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
  const notifications = [
    {
      id: 'n1',
      title: 'Booking Conflict Warning',
      desc: 'Multiple shoot requests detected for Oct 24, 2026.',
      type: 'warning',
      time: '10m ago',
    },
    {
      id: 'n2',
      title: 'Cloudflare R2 Storage Alert',
      desc: 'RAW Photo uploads reached 85% of monthly bandwidth quota.',
      type: 'info',
      time: '2h ago',
    },
  ];

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-4 shadow-modal border-gold-500/30">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Bell size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Studio System Notifications</h3>
        </div>
        <Badge variant="gold">2 Unread</Badge>
      </div>

      <div className="flex flex-col gap-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="p-3 rounded-lg bg-surface-elevated border border-border-subtle flex gap-3 text-xs"
          >
            <AlertTriangle size={18} className="text-status-warning flex-shrink-0 mt-0.5" />
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-text-primary">{n.title}</span>
              <span className="text-text-secondary">{n.desc}</span>
              <span className="text-[10px] text-text-tertiary mt-1">{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
