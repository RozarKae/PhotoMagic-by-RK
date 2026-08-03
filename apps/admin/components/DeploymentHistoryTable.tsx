import * as React from 'react';
import { DataTable, Badge, Button } from '@photomagic/ui';
import { GitCommit, RotateCcw, CheckCircle2, ShieldCheck } from 'lucide-react';

export interface DeploymentRecord {
  id: string;
  version: string;
  commitSha: string;
  author: string;
  status: 'successful' | 'failed' | 'rolled_back';
  timestamp: string;
}

interface DeploymentHistoryTableProps {
  deployments: DeploymentRecord[];
  onRollback?: (deployment: DeploymentRecord) => void;
}

export const DeploymentHistoryTable: React.FC<DeploymentHistoryTableProps> = ({
  deployments,
  onRollback,
}) => {
  const columns = [
    {
      header: 'Version & Commit',
      accessorKey: (row: DeploymentRecord) => (
        <div className="flex items-center gap-3">
          <GitCommit size={16} className="text-gold-500 flex-shrink-0" />
          <div className="flex flex-col">
            <span className="font-bold text-text-primary text-xs">{row.version}</span>
            <span className="font-mono text-[10px] text-gold-500 font-semibold">
              {row.commitSha}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: 'Author / Deployer',
      accessorKey: 'author' as const,
    },
    {
      header: 'Build Status',
      accessorKey: (row: DeploymentRecord) => (
        <Badge variant={row.status === 'successful' ? 'success' : 'error'}>
          {row.status === 'successful' ? 'Success' : 'Rolled Back'}
        </Badge>
      ),
    },
    {
      header: 'Timestamp',
      accessorKey: 'timestamp' as const,
    },
    {
      header: 'Actions',
      accessorKey: (row: DeploymentRecord) => (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onRollback?.(row)}
          className="flex items-center gap-1"
        >
          <RotateCcw size={12} />
          Rollback
        </Button>
      ),
    },
  ];

  return <DataTable columns={columns} data={deployments} />;
};
