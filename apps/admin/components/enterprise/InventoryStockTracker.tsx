'use client';

import React from 'react';
import { Card, Badge } from '@photomagic/ui';
import { Package, ShieldCheck } from 'lucide-react';

export const InventoryStockTracker: React.FC = () => {
  return (
    <Card
      variant="elevated"
      className="p-6 border border-border-subtle bg-surface-elevated flex flex-col gap-4"
    >
      <div className="flex items-center gap-3 border-b border-border-subtle pb-4">
        <div className="p-3 rounded-xl bg-gold-500/10 text-gold-500 border border-gold-500/20">
          <Package size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-text-primary">Inventory & Gear Stock Tracker</h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Inter-branch gear stock transfers, camera body inventory, lens vaults, and maintenance
            logs.
          </p>
        </div>
      </div>
      <div className="p-4 rounded-xl bg-surface-base border border-border-subtle text-xs text-text-secondary flex items-center justify-between">
        <span>Active Equipment In Stock: 42 Items</span>
        <Badge variant="success">Vault Synchronized</Badge>
      </div>
    </Card>
  );
};
