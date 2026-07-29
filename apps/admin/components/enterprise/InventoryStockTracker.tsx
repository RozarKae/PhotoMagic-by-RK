import * as React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Package, AlertTriangle, Plus, Minus } from 'lucide-react';

export const InventoryStockTracker: React.FC = () => {
  const stockItems = [
    { name: 'Flush-Mount Italian Leather Albums (12x18)', quantity: 42, threshold: 10, status: 'In Stock' },
    { name: '24K Gold Stamping Foil Rolls', quantity: 6, threshold: 10, status: 'Low Stock Alert' },
    { name: 'Crystal USB 3.0 Drives (128GB)', quantity: 180, threshold: 50, status: 'In Stock' },
    { name: 'Fine Art Velvet Matte Photo Paper Packs', quantity: 4, threshold: 5, status: 'Low Stock Alert' },
  ];

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Package size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Studio Print & Packaging Inventory Tracker</h3>
        </div>
        <Badge variant="gold">Stock In / Stock Out Active</Badge>
      </div>

      <div className="flex flex-col gap-2.5 text-xs">
        {stockItems.map((item, idx) => (
          <div key={idx} className="p-3 rounded-lg bg-surface-base border border-border-subtle flex justify-between items-center">
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-text-primary">{item.name}</span>
              <span className="text-[10px] text-text-tertiary">Min Threshold: {item.threshold} Units</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-gold-500 text-sm">{item.quantity} Units</span>
              <Badge variant={item.status === 'Low Stock Alert' ? 'error' : 'success'}>{item.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
