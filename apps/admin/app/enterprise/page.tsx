'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { BranchSwitcherGrid } from '../../components/enterprise/BranchSwitcherGrid';
import { OrganizationHierarchyTree } from '../../components/enterprise/OrganizationHierarchyTree';
import { EnterpriseRbacMatrix } from '../../components/enterprise/EnterpriseRbacMatrix';
import { InterBranchTransferManager } from '../../components/enterprise/InterBranchTransferManager';
import { InventoryStockTracker } from '../../components/enterprise/InventoryStockTracker';
import { Building2, Plus, Globe, ShieldCheck, ArrowLeftRight } from 'lucide-react';

export default function EnterpriseManagementPage() {
  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Phase 3.8 Multi-Branch & Enterprise Engine</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">Multi-Branch & Enterprise Management</h1>
          <p className="text-sm text-text-secondary">Centralized enterprise command platform for multi-branch studio locations, corporate hierarchy, inter-branch gear transfers, and inventory tracking.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2">
            <Plus size={16} />
            Provision New Branch Studio
          </Button>
        </div>
      </div>

      {/* Multi-Branch Global Studio Directory Grid */}
      <BranchSwitcherGrid />

      {/* Corporate Hierarchy & Inter-Branch Gear Transfers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <OrganizationHierarchyTree />
        <InterBranchTransferManager />
      </div>

      {/* Enterprise RBAC Role Matrix & Inventory Stock Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <EnterpriseRbacMatrix />
        <InventoryStockTracker />
      </div>
    </main>
  );
}
