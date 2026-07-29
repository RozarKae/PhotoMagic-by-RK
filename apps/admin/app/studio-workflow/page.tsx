'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { EventProvisioningManager } from '../../components/studio-workflow/EventProvisioningManager';
import { AiPhotoCullingEngine } from '../../components/studio-workflow/AiPhotoCullingEngine';
import { EditorTaskAssignmentHub } from '../../components/studio-workflow/EditorTaskAssignmentHub';
import { GitBranch, Sparkles, FolderPlus, Users, CheckCircle2 } from 'lucide-react';

export default function StudioWorkflowPage() {
  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Phases 9.1 – 9.5 Studio Workflow Automation Suite</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">Studio Workflow Automation Workspace</h1>
          <p className="text-sm text-text-secondary">Photographer-focused end-to-end automation: automated event creation, directory provisioning, RAW upload queue, AI expression photo culling, editor task delegation, and 11-stage production tracking.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2 font-bold">
            <Sparkles size={16} /> Auto-Provision New Booking Workflow
          </Button>
        </div>
      </div>

      {/* Phase 9.4 & 9.5 11-Stage Stepper & Editor Assignments */}
      <EditorTaskAssignmentHub />

      {/* Phase 9.1 Event Creation & Directory Provisioning */}
      <EventProvisioningManager />

      {/* Phase 9.3 AI Photo Culling Engine */}
      <AiPhotoCullingEngine />
    </main>
  );
}
