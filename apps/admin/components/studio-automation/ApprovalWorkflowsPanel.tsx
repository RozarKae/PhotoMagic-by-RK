'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { ShieldCheck, CheckCircle2, XCircle, Clock } from 'lucide-react';

export interface ApprovalRequestItem {
  id: string;
  title: string;
  type: string;
  requestedBy: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export const ApprovalWorkflowsPanel: React.FC = () => {
  const [approvals, setApprovals] = useState<ApprovalRequestItem[]>([
    {
      id: 'app-1',
      title: 'Quotation Discount Approval ($1,200 Off)',
      type: 'Quotation',
      requestedBy: 'Sales Executive (Rajesh M.)',
      status: 'pending',
      createdAt: 'Today at 01:10 PM',
    },
    {
      id: 'app-2',
      title: 'High-Value Invoice Refund ($4,500)',
      type: 'Refund',
      requestedBy: 'Finance Manager',
      status: 'pending',
      createdAt: 'Yesterday at 05:40 PM',
    },
  ]);

  const handleAction = (id: string, newStatus: 'approved' | 'rejected') => {
    setApprovals((prev) => prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a)));
  };

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Multi-Level Executive Approvals Queue
          </h3>
        </div>
        <Badge variant="gold">{approvals.length} Requests Pending</Badge>
      </div>

      <div className="flex flex-col gap-3 text-xs">
        {approvals.map((app) => (
          <div
            key={app.id}
            className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex justify-between items-center"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-text-primary">{app.title}</span>
              <span className="text-[10px] text-text-tertiary">
                Requested by: {app.requestedBy} • {app.createdAt}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {app.status === 'pending' ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAction(app.id, 'approved')}
                    className="text-status-success"
                  >
                    Approve
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAction(app.id, 'rejected')}
                    className="text-status-error"
                  >
                    Reject
                  </Button>
                </>
              ) : (
                <Badge variant={app.status === 'approved' ? 'success' : 'error'}>
                  {app.status}
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
