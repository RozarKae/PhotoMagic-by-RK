'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { SecurityPostureOverview } from '../../components/SecurityPostureOverview';
import { AuditLogViewer, AuditLogRecord } from '../../components/AuditLogViewer';
import { BackupRecoveryCard } from '../../components/BackupRecoveryCard';
import { ShieldCheck, Lock, Key, Shield, UserCheck } from 'lucide-react';

export default function SecurityPage() {
  const [logs] = useState<AuditLogRecord[]>([
    {
      id: 'log-101',
      action: 'auth.mfa_enrolled',
      module: 'auth',
      userEmail: 'rk.owner@photomagic.studio',
      riskLevel: 'low',
      ipAddress: '192.168.1.1',
      timestamp: 'Today at 12:45 PM',
    },
    {
      id: 'log-102',
      action: 'data.export_gdpr',
      module: 'privacy',
      userEmail: 'eleanor@vance-estates.com',
      riskLevel: 'medium',
      ipAddress: '203.0.113.42',
      timestamp: 'Today at 10:15 AM',
    },
  ]);

  return (
    <main className="p-8 max-w-7xl mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Enterprise Governance & Compliance</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">
            Security, Permissions & Compliance Hub
          </h1>
          <p className="text-sm text-text-secondary">
            Manage 8-role RBAC matrices, MFA adoption, forensic audit logs, disaster recovery, and
            GDPR privacy consents.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2">
            <ShieldCheck size={16} />
            Review RBAC Permissions
          </Button>
        </div>
      </div>

      {/* Security Posture Overview Cards */}
      <SecurityPostureOverview />

      {/* Disaster Recovery & Snapshots */}
      <BackupRecoveryCard />

      {/* Forensic Audit Log Viewer */}
      <Card variant="glass" className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-text-primary">Forensic Security Audit Logs</h3>
          <Badge variant="gold">{logs.length} Logged Events</Badge>
        </div>

        <AuditLogViewer logs={logs} />
      </Card>
    </main>
  );
}
