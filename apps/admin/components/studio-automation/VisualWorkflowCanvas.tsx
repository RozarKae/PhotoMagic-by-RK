'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { GitBranch, Zap, Sparkles, Send, CheckCircle2, ArrowRight, Play } from 'lucide-react';

export const VisualWorkflowCanvas: React.FC = () => {
  const nodes = [
    {
      type: 'trigger',
      title: 'Trigger: New Lead Received',
      detail: 'Source: Website Booking Inquiry',
      badge: 'Event Trigger',
      color: 'border-gold-500',
    },
    {
      type: 'ai_processing',
      title: 'AI Processing: Lead Scoring & Assignment',
      detail: 'Score > 80% -> Assign Senior Photographer',
      badge: 'AI Node',
      color: 'border-status-success',
    },
    {
      type: 'action',
      title: 'Action: Send WhatsApp & Quotation Email',
      detail: 'Resend Transactional Email & WhatsApp API',
      badge: 'Automated Dispatch',
      color: 'border-gold-500',
    },
  ];

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <GitBranch size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            No-Code Visual Workflow Builder Stage
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="gold">v1.2 Active Flow</Badge>
          <Button variant="primary" size="sm" className="flex items-center gap-1">
            <Play size={12} /> Test Execution
          </Button>
        </div>
      </div>

      {/* Visual Graph Stage */}
      <div className="p-6 rounded-2xl bg-surface-base border border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4 relative overflow-x-auto">
        {nodes.map((node, idx) => (
          <React.Fragment key={idx}>
            <div
              className={`p-4 rounded-xl bg-surface-elevated border-2 ${node.color} flex flex-col gap-2 min-w-[240px] shadow-xl`}
            >
              <div className="flex justify-between items-center">
                <Badge variant="gold" className="text-[9px]">
                  {node.badge}
                </Badge>
                <Zap size={14} className="text-gold-500" />
              </div>
              <span className="font-bold text-text-primary text-xs">{node.title}</span>
              <span className="text-[10px] text-text-tertiary font-mono">{node.detail}</span>
            </div>

            {idx < nodes.length - 1 && (
              <div className="flex items-center text-gold-500 py-2 md:py-0">
                <ArrowRight size={20} className="hidden md:block" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
};
