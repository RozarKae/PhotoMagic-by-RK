'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { CheckCircle2, Award, FileText, BarChart2, ShieldCheck, Download, Check } from 'lucide-react';

export const DeliveryCompletionChecklist: React.FC = () => {
  const checklistItems = [
    { label: 'All Photo & Video Media Files Delivered', status: true },
    { label: 'Client Download Completed (8K RAW & 4K Video)', status: true },
    { label: 'Printed Wedding Album Approved & Locked', status: true },
    { label: 'Final GST Invoice Payment Completed', status: true },
    { label: '5-Star Client Review & Consent Submitted', status: true },
    { label: 'Archival Storage Copy Created (Cloudflare R2)', status: true },
  ];

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Phase 8.9 Automated Delivery Completion & Studio Analytics</h3>
        </div>
        <Badge variant="success">100% Delivery Verified</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* 6-Point Checklist */}
        <div className="flex flex-col gap-2.5">
          <span className="font-bold text-text-primary">Project Closeout Checklist</span>
          {checklistItems.map((item, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-surface-base border border-border-subtle flex items-center justify-between">
              <span className="text-text-primary font-medium">{item.label}</span>
              <div className="flex items-center gap-1.5 text-status-success font-bold text-[11px]">
                <Check size={14} /> Passed
              </div>
            </div>
          ))}
        </div>

        {/* Analytics & Reports */}
        <div className="flex flex-col gap-4 justify-between">
          <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-2">
            <span className="text-text-tertiary font-semibold">Studio Performance Metrics</span>
            <div className="flex justify-between items-baseline font-mono">
              <span className="text-text-secondary text-xs">Time to Final Delivery</span>
              <span className="text-gold-500 font-bold text-sm">4.2 Days (60% Faster)</span>
            </div>
            <div className="flex justify-between items-baseline font-mono">
              <span className="text-text-secondary text-xs">Client Satisfaction Score</span>
              <span className="text-status-success font-bold text-sm">100% (5.0 Stars)</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="w-full flex items-center justify-center gap-1 text-xs">
              <FileText size={14} /> Export Delivery Report
            </Button>
            <Button variant="primary" size="sm" className="w-full flex items-center justify-center gap-1 text-xs font-bold">
              <BarChart2 size={14} /> View Studio Analytics
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
