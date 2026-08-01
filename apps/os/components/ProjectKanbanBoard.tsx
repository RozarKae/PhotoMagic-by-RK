'use client';

import React from 'react';
import { Card, Badge } from '@photomagic/ui';
import Link from 'next/link';

export interface ProjectWorkflowItem {
  id: string;
  title: string;
  clientName: string;
  packageName: string;
  eventDate: string;
  location?: string;
  paymentStatus: 'paid' | 'advance_paid' | 'pending';
  status:
    | 'lead'
    | 'consultation'
    | 'quotation_sent'
    | 'booking_confirmed'
    | 'advance_paid'
    | 'planning'
    | 'shoot_scheduled'
    | 'shoot_completed'
    | 'editing'
    | 'preview_shared'
    | 'client_approved'
    | 'album_design'
    | 'album_approved'
    | 'printing'
    | 'delivery_completed';
}

const WORKFLOW_STAGES: Array<{ id: ProjectWorkflowItem['status']; label: string }> = [
  { id: 'lead', label: '1. Lead' },
  { id: 'consultation', label: '2. Consultation' },
  { id: 'quotation_sent', label: '3. Quote Sent' },
  { id: 'booking_confirmed', label: '4. Booking Confirmed' },
  { id: 'advance_paid', label: '5. Advance Paid' },
  { id: 'planning', label: '6. Planning' },
  { id: 'shoot_scheduled', label: '7. Shoot Scheduled' },
  { id: 'shoot_completed', label: '8. Shoot Completed' },
  { id: 'editing', label: '9. Editing' },
  { id: 'preview_shared', label: '10. Preview Shared' },
  { id: 'client_approved', label: '11. Client Approved' },
  { id: 'album_design', label: '12. Album Design' },
  { id: 'album_approved', label: '13. Album Approved' },
  { id: 'printing', label: '14. Printing' },
  { id: 'delivery_completed', label: '15. Delivered' },
];

interface ProjectKanbanBoardProps {
  projects: ProjectWorkflowItem[];
  onStatusChange: (projectId: string, newStatus: ProjectWorkflowItem['status']) => void;
}

export const ProjectKanbanBoard: React.FC<ProjectKanbanBoardProps> = ({
  projects,
  onStatusChange,
}) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-6">
      {WORKFLOW_STAGES.map((stage) => {
        const stageProjects = projects.filter((p) => p.status === stage.id);

        return (
          <div
            key={stage.id}
            className="flex flex-col gap-3 w-72 flex-shrink-0 bg-surface-base/40 p-3 rounded-xl border border-border-subtle"
          >
            <div className="flex items-center justify-between px-1 py-1">
              <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">
                {stage.label}
              </h4>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-surface-elevated text-text-secondary border border-border-subtle">
                {stageProjects.length}
              </span>
            </div>

            <div className="flex flex-col gap-3 min-h-[350px]">
              {stageProjects.map((project) => (
                <Card
                  key={project.id}
                  variant="glass"
                  className="p-4 flex flex-col gap-2 hover:border-gold-500/50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-bold text-text-primary">{project.title}</span>
                    <Badge variant="gold" className="text-[10px]">
                      {project.paymentStatus}
                    </Badge>
                  </div>
                  <span className="text-xs text-text-secondary">{project.clientName}</span>
                  <span className="text-[11px] text-text-tertiary">{project.packageName}</span>
                  <div className="text-[11px] text-gold-500 font-semibold mt-1">
                    Event: {project.eventDate}
                  </div>
                </Card>
              ))}

              {stageProjects.length === 0 && (
                <div className="h-full flex items-center justify-center p-4 border border-dashed border-border-subtle rounded-lg text-xs text-text-tertiary">
                  No Projects
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
