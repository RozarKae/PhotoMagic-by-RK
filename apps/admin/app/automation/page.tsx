'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { VisualWorkflowCanvas } from '../../components/studio-automation/VisualWorkflowCanvas';
import { AutomationTemplatesLibrary } from '../../components/studio-automation/AutomationTemplatesLibrary';
import { ExecutionMonitorLogs } from '../../components/studio-automation/ExecutionMonitorLogs';
import { ApprovalWorkflowsPanel } from '../../components/studio-automation/ApprovalWorkflowsPanel';
import { GitBranch, Zap, Plus, Layers, ShieldCheck } from 'lucide-react';

export default function StudioAutomationPage() {
  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Phase 3.7 Studio Automation Engine</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">Studio Automation & Workflow Engine</h1>
          <p className="text-sm text-text-secondary">No-code visual workflow builder, automated AI culling & album dispatch triggers, execution monitors, and executive approval queues.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2">
            <Plus size={16} />
            Create Custom Automation
          </Button>
        </div>
      </div>

      {/* Visual Workflow Stage */}
      <VisualWorkflowCanvas />

      {/* Workflow Templates & Multi-Level Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AutomationTemplatesLibrary />
        <ApprovalWorkflowsPanel />
      </div>

      {/* Execution Monitoring Logs */}
      <Card variant="glass" className="p-6">
        <h3 className="text-lg font-bold text-text-primary mb-4">Real-Time Execution Logs & Telemetry</h3>
        <ExecutionMonitorLogs />
      </Card>
    </main>
  );
}
