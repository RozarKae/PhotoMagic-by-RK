import * as React from 'react';
import { DataTable, Badge, Button } from '@photomagic/ui';
import { Camera, QrCode, ArrowRightLeft, Wrench, ShieldCheck } from 'lucide-react';

export interface EquipmentAsset {
  id: string;
  assetId: string;
  name: string;
  category: 'Camera Body' | 'Lens' | 'Lighting' | 'Audio' | 'Drone' | 'Grip';
  brand: string;
  model: string;
  serialNumber: string;
  storageLocation: string;
  status:
    | 'available'
    | 'reserved'
    | 'assigned'
    | 'in_use'
    | 'maintenance'
    | 'repair'
    | 'lost'
    | 'retired';
  assignedTo?: string;
  assignedProject?: string;
}

interface EquipmentListTableProps {
  assets: EquipmentAsset[];
  onCheckInOut?: (asset: EquipmentAsset) => void;
}

export const EquipmentListTable: React.FC<EquipmentListTableProps> = ({ assets, onCheckInOut }) => {
  const getStatusBadge = (status: EquipmentAsset['status']) => {
    switch (status) {
      case 'available':
        return <Badge variant="success">Available</Badge>;
      case 'assigned':
      case 'in_use':
        return <Badge variant="gold">In Use / Assigned</Badge>;
      case 'maintenance':
      case 'repair':
        return <Badge variant="warning">Maintenance</Badge>;
      default:
        return <Badge variant="info">{status}</Badge>;
    }
  };

  const columns = [
    {
      header: 'Asset & ID',
      accessorKey: (row: EquipmentAsset) => (
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-surface-elevated text-gold-500 border border-border-subtle">
            <Camera size={18} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-text-primary text-sm">{row.name}</span>
            <span className="text-xs text-gold-500 font-mono font-semibold">{row.assetId}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Category & Brand',
      accessorKey: (row: EquipmentAsset) => (
        <div className="flex flex-col text-xs">
          <span className="font-semibold text-text-primary">{row.category}</span>
          <span className="text-text-tertiary">
            {row.brand} {row.model}
          </span>
        </div>
      ),
    },
    { header: 'Storage Location', accessorKey: 'storageLocation' as const },
    {
      header: 'Status',
      accessorKey: (row: EquipmentAsset) => getStatusBadge(row.status),
    },
    {
      header: 'Assigned To',
      accessorKey: (row: EquipmentAsset) => (
        <span className="text-xs text-text-secondary">{row.assignedTo || 'Unassigned'}</span>
      ),
    },
    {
      header: 'Actions',
      accessorKey: (row: EquipmentAsset) => (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onCheckInOut?.(row)}
          className="flex items-center gap-1.5"
        >
          <ArrowRightLeft size={14} />
          Check In / Out
        </Button>
      ),
    },
  ];

  return <DataTable columns={columns} data={assets} />;
};
