'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Zap, ArrowRight, CheckCircle2, Play, Plus } from 'lucide-react';

export const AutomationWorkflowBuilder: React.FC = () => {
  const [workflows] = useState([
    {
      id: 'wf-1',
      name: 'High-Value Lead VIP Dispatch',
      trigger: 'Lead Received',
      condition: 'Budget > $10,000',
      action: 'Assign Senior Photographer & Draft Proposal',
      active: true,
    },
    {
      id: 'wf-2',
      name: 'Automated Album Print Queue',
      trigger: 'Album Approved by Client',
      condition: 'Retainer Fully Paid',
      action: 'Dispatch Order to Italian Print Lab',
      active: true,
    },
  ]);

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Zap size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Visual Automation Engine (Trigger → Action)
          </h3>
        </div>
        <Button variant="primary" size="sm" className="flex items-center gap-1">
          <Plus size={14} /> Create Workflow
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {workflows.map((wf) => (
          <div
            key={wf.id}
            className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-2 text-xs"
          >
            <div className="flex justify-between items-center">
              <span className="font-bold text-text-primary text-sm">{wf.name}</span>
              <Badge variant="success">Active Automator</Badge>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <div className="px-3 py-1 rounded-lg bg-surface-elevated border border-border-subtle text-gold-500 font-semibold">
                Trigger: {wf.trigger}
              </div>
              <ArrowRight size={14} className="text-text-tertiary" />
              <div className="px-3 py-1 rounded-lg bg-surface-elevated border border-border-subtle text-text-secondary">
                Condition: {wf.condition}
              </div>
              <ArrowRight size={14} className="text-text-tertiary" />
              <div className="px-3 py-1 rounded-lg bg-gold-500/10 border border-gold-500/20 text-gold-500 font-bold">
                Action: {wf.action}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
