'use client';

import React, { useState } from 'react';
import { Modal, Button, Input, Select } from '@photomagic/ui';
import { ArrowRightLeft, ShieldCheck, Camera } from 'lucide-react';
import { EquipmentAsset } from './EquipmentListTable';

interface CheckInOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: EquipmentAsset | null;
  onConfirm: (assetId: string, action: 'check_out' | 'check_in', assignee: string) => void;
}

export const CheckInOutModal: React.FC<CheckInOutModalProps> = ({
  isOpen,
  onClose,
  asset,
  onConfirm,
}) => {
  const [action, setAction] = useState<'check_out' | 'check_in'>('check_out');
  const [assignee, setAssignee] = useState('');
  const [conditionNote, setConditionNote] = useState('Excellent Condition (No Scratches)');

  if (!asset) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(asset.id, action, assignee);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Gear Check-In / Check-Out: ${asset.name}`}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="p-3 rounded-lg bg-surface-base border border-border-subtle flex justify-between items-center text-xs">
          <span className="font-semibold text-text-tertiary">Asset Tag:</span>
          <span className="font-mono text-gold-500 font-bold">{asset.assetId}</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-text-secondary">
            Select Operation Action
          </label>
          <Select
            value={action}
            onChange={(val: string) => setAction(val as 'check_out' | 'check_in')}
            options={[
              { value: 'check_out', label: 'Check Out (Dispatch to Shoot)' },
              { value: 'check_in', label: 'Check In (Return to Vault)' },
            ]}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-text-secondary">
            Assigned Crew Member or Project
          </label>
          <Input
            placeholder="e.g., Lead Photographer John Doe / Udaipur Royal Wedding"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-text-secondary">
            Equipment Inspection Notes
          </label>
          <Input
            value={conditionNote}
            onChange={(e) => setConditionNote(e.target.value)}
            placeholder="Describe lens elements, sensor condition, battery health..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit" className="flex items-center gap-2">
            <ShieldCheck size={16} />
            Confirm Asset Dispatch
          </Button>
        </div>
      </form>
    </Modal>
  );
};
