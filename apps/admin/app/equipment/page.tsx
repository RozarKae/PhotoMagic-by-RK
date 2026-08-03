'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { EquipmentListTable, EquipmentAsset } from '../../components/EquipmentListTable';
import { CheckInOutModal } from '../../components/CheckInOutModal';
import { Camera, Plus, QrCode, ShieldCheck, Wrench } from 'lucide-react';

export default function EquipmentPage() {
  const [selectedAsset, setSelectedAsset] = useState<EquipmentAsset | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [assets, setAssets] = useState<EquipmentAsset[]>([
    {
      id: 'eq-101',
      assetId: 'CAM-LEICA-M11',
      name: 'Leica M11 Rangefinder',
      category: 'Camera Body',
      brand: 'Leica',
      model: 'M11 Silver Chrome',
      serialNumber: '58291048',
      storageLocation: 'Vault A - Shelf 2',
      status: 'available',
    },
    {
      id: 'eq-102',
      assetId: 'LENS-NOCT-50MM',
      name: 'Leica Noctilux-M 50mm f/0.95',
      category: 'Lens',
      brand: 'Leica',
      model: 'ASPH f/0.95',
      serialNumber: '49201944',
      storageLocation: 'Vault A - Shelf 3',
      status: 'assigned',
      assignedTo: 'Alexander Ross',
      assignedProject: 'Udaipur Royal Wedding',
    },
  ]);

  const handleOpenCheckInOut = (asset: EquipmentAsset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  const handleConfirmCheckInOut = (
    assetId: string,
    action: 'check_out' | 'check_in',
    assignee: string,
  ) => {
    setAssets((prev) =>
      prev.map((a) =>
        a.id === assetId
          ? {
              ...a,
              status: action === 'check_out' ? 'assigned' : 'available',
              assignedTo: action === 'check_out' ? assignee : undefined,
            }
          : a,
      ),
    );
  };

  return (
    <main className="p-8 max-w-7xl mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Hardware Vault & Asset Tracking</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">
            Equipment & Asset Management
          </h1>
          <p className="text-sm text-text-secondary">
            Track cameras, lenses, drones, lighting gear, QR codes, check-ins/outs, and maintenance
            logs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" className="flex items-center gap-2">
            <QrCode size={16} />
            Scan QR Code
          </Button>

          <Button variant="primary" className="flex items-center gap-2">
            <Plus size={16} />
            Add Hardware Asset
          </Button>
        </div>
      </div>

      {/* Main Asset Table */}
      <Card variant="glass" className="p-6">
        <h3 className="text-lg font-bold text-text-primary mb-4">Studio Gear Vault Inventory</h3>
        <EquipmentListTable assets={assets} onCheckInOut={handleOpenCheckInOut} />
      </Card>

      <CheckInOutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        asset={selectedAsset}
        onConfirm={handleConfirmCheckInOut}
      />
    </main>
  );
}
