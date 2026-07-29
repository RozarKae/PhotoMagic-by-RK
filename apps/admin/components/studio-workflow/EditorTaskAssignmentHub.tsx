'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Users, Clock, CheckCircle2, ShieldCheck, Play, ArrowRight, UserCheck } from 'lucide-react';

export const EditorTaskAssignmentHub: React.FC = () => {
  const [activeStage, setActiveStage] = useState<'booking_confirmed' | 'shoot_completed' | 'upload_finished' | 'ai_culling' | 'editing' | 'quality_check' | 'album_design' | 'client_review' | 'printing' | 'delivery' | 'archive'>('editing');

  const workflowStages = [
    { id: 'booking_confirmed', label: 'Booking Confirmed' },
    { id: 'shoot_completed', label: 'Shoot Completed' },
    { id: 'upload_finished', label: 'Upload Finished' },
    { id: 'ai_culling', label: 'AI Culling' },
    { id: 'editing', label: 'Editing' },
    { id: 'quality_check', label: 'Quality Check' },
    { id: 'album_design', label: 'Album Design' },
    { id: 'client_review', label: 'Client Review' },
    { id: 'printing', label: 'Printing' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'archive', label: 'Archive' },
  ];

  const teamAssignments = [
    { role: 'Lead Post-Production Editor', name: 'Vikram Sethi', status: 'In Progress (82%)' },
    { role: 'AI Retoucher & Skin Specialist', name: 'Ananya Roy', status: 'Completed' },
    { role: 'Album Studio Designer', name: 'Kabir Mehta', status: 'Scheduled' },
    { role: 'QC & Color Profile Reviewer', name: 'Rohan Kapoor', status: 'Pending' },
  ];

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Phase 9.4 & 9.5 Editor Assignment & 11-Stage Workflow Tracker</h3>
        </div>
        <Badge variant="gold">Deadline: July 28, 2026 (On Schedule)</Badge>
      </div>

      {/* 11-Stage Stepper Bar */}
      <div className="flex overflow-x-auto gap-2 pb-2">
        {workflowStages.map((st, idx) => {
          const isCurrent = activeStage === st.id;
          return (
            <div
              key={st.id}
              onClick={() => setActiveStage(st.id as any)}
              className={`px-3 py-2 rounded-xl border cursor-pointer flex items-center gap-2 whitespace-nowrap text-xs transition-all ${
                isCurrent
                  ? 'bg-gold-500/20 border-gold-500 text-gold-500 ring-1 ring-gold-500 font-bold'
                  : 'bg-surface-base border-border-subtle hover:border-gold-500/40 text-text-secondary'
              }`}
            >
              <span className="font-mono text-[10px]">0{idx + 1}</span>
              <span>{st.label}</span>
            </div>
          );
        })}
      </div>

      {/* Team Assignments Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {teamAssignments.map((ass, i) => (
          <div key={i} className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex flex-col justify-between gap-2">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-text-tertiary uppercase tracking-wider font-semibold">{ass.role}</span>
              <span className="font-bold text-text-primary text-sm pt-0.5">{ass.name}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-border-subtle">
              <span className="text-[10px] text-text-tertiary">{ass.status}</span>
              <UserCheck size={14} className="text-gold-500" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
