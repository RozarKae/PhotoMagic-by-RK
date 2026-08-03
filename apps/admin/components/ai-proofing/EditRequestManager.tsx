'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { MessageSquare, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export interface EditRequestItem {
  id: string;
  photoTitle: string;
  requestType: string;
  instructions: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'submitted' | 'accepted' | 'in_progress' | 'completed' | 'delivered';
  createdAt: string;
}

export const EditRequestManager: React.FC = () => {
  const [requests, setRequests] = useState<EditRequestItem[]>([
    {
      id: 'req-1',
      photoTitle: 'Mandap Vows Ceremony (Photo #042)',
      requestType: 'Skin Retouching & Object Removal',
      instructions: 'Please smooth bride skin tones and erase background guest microphone wire.',
      priority: 'high',
      status: 'in_progress',
      createdAt: 'Today at 11:20 AM',
    },
    {
      id: 'req-2',
      photoTitle: 'Royal Bridal Portrait (Photo #018)',
      requestType: 'Background Replacement',
      instructions: 'Replace white studio backdrop with Udaipur Palace golden hour glow.',
      priority: 'urgent',
      status: 'accepted',
      createdAt: 'Yesterday at 04:15 PM',
    },
  ]);

  const handleStatusChange = (id: string, newStatus: EditRequestItem['status']) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
  };

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Client Edit Requests & Retouch Workflow
          </h3>
        </div>
        <Badge variant="gold">{requests.length} Requests Open</Badge>
      </div>

      <div className="flex flex-col gap-3 text-xs">
        {requests.map((req) => (
          <div
            key={req.id}
            className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-bold text-text-primary">{req.photoTitle}</span>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    req.priority === 'urgent' || req.priority === 'high' ? 'error' : 'warning'
                  }
                >
                  {req.priority}
                </Badge>
                <Badge variant="gold">{req.status}</Badge>
              </div>
            </div>

            <p className="text-text-secondary bg-surface-elevated p-3 rounded-lg border border-border-subtle font-mono text-[11px]">
              {req.instructions}
            </p>

            <div className="flex justify-between items-center pt-2 border-t border-border-subtle text-[10px] text-text-tertiary">
              <span>Requested {req.createdAt}</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleStatusChange(req.id, 'in_progress')}
                >
                  In Progress
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleStatusChange(req.id, 'completed')}
                  className="text-status-success"
                >
                  Complete & Deliver
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
