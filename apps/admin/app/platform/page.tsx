'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { GlobalPlatformStats } from '../../components/platform/GlobalPlatformStats';
import { MultiTenantWhiteLabel } from '../../components/platform/MultiTenantWhiteLabel';
import { SubscriptionBillingEngine } from '../../components/platform/SubscriptionBillingEngine';
import { DeveloperApiExplorer } from '../../components/platform/DeveloperApiExplorer';
import { MarketplacePluginHub } from '../../components/platform/MarketplacePluginHub';
import { Globe, ShieldCheck, Sparkles, Store, Code } from 'lucide-react';

export default function EnterprisePlatformPage() {
  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Phase 3.9 Enterprise SaaS Platform</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">PhotoMagic Studio OS Enterprise Platform</h1>
          <p className="text-sm text-text-secondary">Multi-tenant SaaS architecture, white-label custom domains, developer REST/GraphQL APIs, subscription quota engines, and marketplace plugin hubs.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2">
            <Globe size={16} />
            Onboard Tenant Studio
          </Button>
        </div>
      </div>

      {/* Global SaaS Platform Executive Telemetry Stats */}
      <GlobalPlatformStats />

      {/* Multi-Tenant Subdomain & White-Label Domain Manager */}
      <MultiTenantWhiteLabel />

      {/* Subscription & Billing Engine (Starter, Studio Pro, Enterprise Scale) */}
      <SubscriptionBillingEngine />

      {/* Developer API Keys & Marketplace Extensions Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DeveloperApiExplorer />
        <MarketplacePluginHub />
      </div>
    </main>
  );
}
