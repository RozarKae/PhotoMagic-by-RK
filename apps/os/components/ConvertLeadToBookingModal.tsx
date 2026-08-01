'use client';

import React, { useState } from 'react';
import { Modal, Input, Select, Button } from '@photomagic/ui';
import { convertLeadToBookingAction } from '../app/actions/booking-actions';

interface ConvertLeadToBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadId: string;
  clientName: string;
  onConverted: (bookingId: string) => void;
}

export const ConvertLeadToBookingModal: React.FC<ConvertLeadToBookingModalProps> = ({
  isOpen,
  onClose,
  leadId,
  clientName,
  onConverted,
}) => {
  const [packageName, setPackageName] = useState('Royal Heirloom Collection');
  const [totalAmount, setTotalAmount] = useState('8500');
  const [depositAmount, setDepositAmount] = useState('2500');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const res = await convertLeadToBookingAction({
      leadId,
      packageName,
      totalAmount: parseFloat(totalAmount),
      depositAmount: parseFloat(depositAmount),
    });

    setIsLoading(false);

    if (!res.success) {
      setErrorMsg(res.error.message);
      return;
    }

    onConverted((res.data as { bookingId: string }).bookingId);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Convert Lead: ${clientName}`}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {errorMsg && (
          <div className="p-3 rounded-md bg-status-error/10 border border-status-error/20 text-status-error text-xs font-medium">
            {errorMsg}
          </div>
        )}

        <Select
          label="Selected Collection / Package *"
          value={packageName}
          onChange={setPackageName}
          options={[
            { label: 'Studio Essence ($4,500)', value: 'Studio Essence Collection' },
            { label: 'Royal Heirloom ($8,500)', value: 'Royal Heirloom Collection' },
            { label: 'Imperial Legacy ($15,000)', value: 'Imperial Legacy Collection' },
          ]}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Total Agreed Amount ($) *"
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            required
          />
          <Input
            label="Required Deposit ($) *"
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            required
          />
        </div>

        <div className="p-3 rounded-lg bg-surface-elevated text-xs text-text-secondary border border-border-subtle">
          ℹ️ Converting this lead will automatically initialize a Production Project, issue a
          Razorpay deposit invoice link, and dispatch Client Portal login credentials.
        </div>

        <div className="flex justify-end gap-3 mt-2">
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Converting...' : 'Confirm & Initialize Project'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
