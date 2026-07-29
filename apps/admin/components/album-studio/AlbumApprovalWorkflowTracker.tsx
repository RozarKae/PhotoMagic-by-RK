'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { CheckCircle2, Lock, Clock, Send, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';

export const AlbumApprovalWorkflowTracker: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<'draft' | 'sent_for_review' | 'client_reviewing' | 'revision_requested' | 'designer_updating' | 'final_approval' | 'locked_for_print'>('client_reviewing');
  const [revisionCount, setRevisionCount] = useState(1);

  const stages = [
    { id: 'draft', label: 'Draft Design', desc: 'Internal layout creation' },
    { id: 'sent_for_review', label: 'Sent for Review', desc: 'Notification dispatched' },
    { id: 'client_reviewing', label: 'Client Reviewing', desc: 'Proofing portal active' },
    { id: 'revision_requested', label: 'Revision Requested', desc: 'Client requested notes' },
    { id: 'designer_updating', label: 'Designer Updating', desc: 'Revisions in progress' },
    { id: 'final_approval', label: 'Final Approval', desc: 'Client signature recorded' },
    { id: 'locked_for_print', label: 'Locked for Print', desc: 'Dispatched to print lab' },
  ];

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Phase 7.5 Client Approval Workflow & Lock Engine</h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={currentStage === 'locked_for_print' ? 'success' : 'gold'}>
            Revision #{revisionCount} • {currentStage.replace(/_/g, ' ')}
          </Badge>
        </div>
      </div>

      {/* Workflow Stepper Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
        {stages.map((st, idx) => {
          const isCurrent = currentStage === st.id;
          return (
            <div
              key={st.id}
              onClick={() => setCurrentStage(st.id as any)}
              className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                isCurrent
                  ? 'bg-gold-500/20 border-gold-500 shadow-xl ring-1 ring-gold-500 text-gold-500'
                  : 'bg-surface-base border-border-subtle hover:border-gold-500/40 text-text-secondary'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono font-bold text-[10px] text-gold-500">0{idx + 1}</span>
                {isCurrent && <CheckCircle2 size={12} className="text-gold-500" />}
              </div>
              <span className="font-bold text-xs text-text-primary leading-tight">{st.label}</span>
              <span className="text-[9px] text-text-tertiary mt-1 leading-tight">{st.desc}</span>
            </div>
          );
        })}
      </div>

      {/* Lock Guard Notification */}
      {currentStage === 'locked_for_print' ? (
        <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/40 flex items-center justify-between text-xs text-gold-500">
          <div className="flex items-center gap-2">
            <Lock size={18} />
            <span className="font-bold">Album Project Locked for Print Production. All further manual & AI layout edits disabled.</span>
          </div>
          <Badge variant="gold">Immutable State</Badge>
        </div>
      ) : (
        <div className="flex justify-between items-center pt-2 text-xs">
          <span className="text-[10px] text-text-tertiary font-mono">Last stage transition: Today 10:45 AM • Audit Log Synced</span>
          <Button variant="primary" size="sm" onClick={() => setCurrentStage('locked_for_print')} className="flex items-center gap-1 font-bold">
            <Lock size={14} /> Lock Album for Print Production
          </Button>
        </div>
      )}
    </Card>
  );
};
