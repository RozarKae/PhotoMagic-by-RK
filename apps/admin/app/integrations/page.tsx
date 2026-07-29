'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { IntegrationCardGrid } from '../../components/IntegrationCardGrid';
import { WebhookManager } from '../../components/WebhookManager';
import { SecretsVaultManager } from '../../components/SecretsVaultManager';
import { Radio, Lock, Plus, ShieldCheck, Cpu } from 'lucide-react';

export default function IntegrationsPage() {
  return (
    <main className="p-8 max-w-7xl mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">External Services & Connectors</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">
            Integration Hub & API Center
          </h1>
          <p className="text-sm text-text-secondary">
            Manage payment gateways, S3 cloud storage, calendar sync, webhooks, and secrets vault.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2">
            <Plus size={16} />
            Connect New Service
          </Button>
        </div>
      </div>

      {/* Main Integration Provider Grid */}
      <Card variant="glass" className="p-6">
        <h3 className="text-lg font-bold text-text-primary mb-4">
          Active External Provider Connectors
        </h3>
        <IntegrationCardGrid />
      </Card>

      {/* Webhook Dispatch & Secrets Vault */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <WebhookManager />
        <SecretsVaultManager />
      </div>
    </main>
  );
}
