import * as React from 'react';
import { DataTable, Badge } from '@photomagic/ui';
import { Activity, CheckCircle2, Clock } from 'lucide-react';

export interface WorkflowRunRecord {
  id: string;
  workflowName: string;
  triggerEvent: string;
  status: 'running' | 'completed' | 'failed';
  durationMs: number;
  timestamp: string;
}

export const ExecutionMonitorLogs: React.FC = () => {
  const data: WorkflowRunRecord[] = [
    {
      id: 'run-101',
      workflowName: 'Destination Wedding End-to-End Workflow',
      triggerEvent: 'booking.confirmed',
      status: 'completed',
      durationMs: 420,
      timestamp: 'Today at 12:30 PM',
    },
    {
      id: 'run-102',
      workflowName: 'New Lead Instant Qualification',
      triggerEvent: 'lead.received',
      status: 'completed',
      durationMs: 180,
      timestamp: 'Today at 11:15 AM',
    },
  ];

  const columns = [
    {
      header: 'Workflow & Trigger',
      accessorKey: (row: WorkflowRunRecord) => (
        <div className="flex flex-col">
          <span className="font-bold text-text-primary text-xs">{row.workflowName}</span>
          <span className="text-[10px] text-gold-500 font-mono font-semibold">
            {row.triggerEvent}
          </span>
        </div>
      ),
    },
    {
      header: 'Status',
      accessorKey: (row: WorkflowRunRecord) => (
        <Badge variant={row.status === 'completed' ? 'success' : 'warning'}>{row.status}</Badge>
      ),
    },
    {
      header: 'Latency',
      accessorKey: (row: WorkflowRunRecord) => (
        <span className="font-mono text-xs text-text-tertiary">{row.durationMs} ms</span>
      ),
    },
    {
      header: 'Executed At',
      accessorKey: 'timestamp' as const,
    },
  ];

  return <DataTable columns={columns} data={data} />;
};
