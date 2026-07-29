'use client';

import React, { useState } from 'react';
import { Modal, Input, Select, Button } from '@photomagic/ui';
import { createLeadAction, LeadItem } from '../app/actions/crm-actions';

interface CreateLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadCreated: (newLead: LeadItem) => void;
}

export const CreateLeadModal: React.FC<CreateLeadModalProps> = ({
  isOpen,
  onClose,
  onLeadCreated,
}) => {
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('wedding');
  const [eventDate, setEventDate] = useState('');
  const [budget, setBudget] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const res = await createLeadAction({
      clientName,
      email,
      phone,
      eventType,
      eventDate,
      estimatedBudget: budget ? parseFloat(budget) : undefined,
    });

    setIsLoading(false);

    if (!res.success) {
      setErrorMsg(res.error.message);
      return;
    }

    onLeadCreated(res.data as LeadItem);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Lead">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {errorMsg && (
          <div className="p-3 rounded-md bg-status-error/10 border border-status-error/20 text-status-error text-xs font-medium">
            {errorMsg}
          </div>
        )}

        <Input
          label="Client Full Name *"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
        />
        <Input
          label="Email Address *"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Select
          label="Event Type"
          value={eventType}
          onChange={setEventType}
          options={[
            { label: 'Royal Wedding', value: 'wedding' },
            { label: 'Studio Portrait', value: 'portrait' },
            { label: 'Commercial Editorial', value: 'commercial' },
          ]}
        />
        <Input
          label="Target Event Date"
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <Input
          label="Estimated Budget ($)"
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Lead'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
