'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { DevOpsMonitoringCards } from '../../components/DevOpsMonitoringCards';
import { FeatureFlagsManager } from '../../components/FeatureFlagsManager';
import { DeploymentHistoryTable, DeploymentRecord } from '../../components/DeploymentHistoryTable';
import { ProductionReadinessChecklist } from '../../components/ProductionReadinessChecklist';
import { Server, Cpu, HardDrive, GitCommit, ShieldCheck, Play } from 'lucide-react';

export default function DevOpsPage() {
  const [deployments] = useState<DeploymentRecord[]>([
    {
      id: 'dep-101',
      version: 'v1.0.0-prod',
      commitSha: '9a8f21c',
      author: 'Senior Platform Engineer',
      status: 'successful',
      timestamp: 'Today at 01:15 PM',
    },
    {
      id: 'dep-102',
      version: 'v0.9.8-stage',
      commitSha: '4e2b801',
      author: 'Monorepo Architect',
      status: 'successful',
      timestamp: 'Yesterday at 06:40 PM',
    },
  ]);

  return (
    <main className="p-8 max-w-7xl mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Docker & CI/CD Production Engine</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">
            Deployment, DevOps & Production Hub
          </h1>
          <p className="text-sm text-text-secondary">
            Monitor infrastructure metrics, manage feature flags, trigger one-click rollbacks, and
            audit production readiness.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2">
            <Play size={16} />
            Trigger CI/CD Deploy
          </Button>
        </div>
      </div>

      {/* Infrastructure Monitoring Cards */}
      <DevOpsMonitoringCards />

      {/* Production Readiness Checklist */}
      <ProductionReadinessChecklist />

      {/* Feature Flags Manager & Deployment History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FeatureFlagsManager />
        <Card variant="glass" className="p-6">
          <h3 className="text-lg font-bold text-text-primary mb-4">Deployment Release History</h3>
          <DeploymentHistoryTable deployments={deployments} />
        </Card>
      </div>
    </main>
  );
}
