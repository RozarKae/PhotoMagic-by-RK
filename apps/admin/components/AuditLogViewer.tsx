import * as React from 'react';
import { DataTable, Badge, Button } from '@photomagic/ui';
import { ShieldCheck, Eye, Lock, FileText, AlertTriangle } from 'lucide-react';

export interface AuditLogRecord {
  id: string;
  action: string;
  module: string;
  userEmail: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  ipAddress: string;
  timestamp: string;
}

interface AuditLogViewerProps {
  logs: AuditLogRecord[];
}

export const AuditLogViewer: React.FC<AuditLogViewerProps> = ({ logs }) => {
  const getRiskBadge = (risk: AuditLogRecord['riskLevel']) => {
    switch (risk) {
      case 'critical':
      case 'high':
        return <Badge variant="error">Critical Risk</Badge>;
      case 'medium':
        return <Badge variant="warning">Medium Risk</Badge>;
      default:
        return <Badge variant="success">Low Risk</Badge>;
    }
  };

  const columns = [
    {
      header: 'Action & Module',
      accessorKey: (row: AuditLogRecord) => (
        <div className="flex flex-col">
          <span className="font-bold text-text-primary text-xs font-mono">{row.action}</span>
          <span className="text-[10px] text-gold-500 uppercase">{row.module}</span>
        </div>
      ),
    },
    {
      header: 'User & IP Address',
      accessorKey: (row: AuditLogRecord) => (
        <div className="flex flex-col text-xs">
          <span className="font-semibold text-text-primary">{row.userEmail}</span>
          <span className="text-text-tertiary font-mono">{row.ipAddress}</span>
        </div>
      ),
    },
    {
      header: 'Risk Level',
      accessorKey: (row: AuditLogRecord) => getRiskBadge(row.riskLevel),
    },
    {
      header: 'Timestamp',
      accessorKey: (row: AuditLogRecord) => (
        <span className="text-xs text-text-tertiary">{row.timestamp}</span>
      ),
    },
  ];

  return <DataTable columns={columns} data={logs} />;
};
