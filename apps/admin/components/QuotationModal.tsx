'use client';

import React, { useState } from 'react';
import { Modal, Button, Input, Select } from '@photomagic/ui';
import { Plus, Trash2, ShieldCheck, DollarSign, Calculator } from 'lucide-react';

interface QuotationLineItem {
  id: string;
  description: string;
  amount: number;
}

interface QuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (quote: { clientName: string; totalAmount: number }) => void;
}

export const QuotationModal: React.FC<QuotationModalProps> = ({ isOpen, onClose, onSave }) => {
  const [clientName, setClientName] = useState('');
  const [taxRate, setTaxRate] = useState(18); // GST 18% Standard
  const [items, setItems] = useState<QuotationLineItem[]>([
    { id: '1', description: 'Royal Palace 3-Day Wedding Photography', amount: 8500 },
    { id: '2', description: '4K Anamorphic Cinema Reel & Drone Choreography', amount: 4500 },
  ]);

  const subtotal = items.reduce((acc, curr) => acc + curr.amount, 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const totalAmount = subtotal + taxAmount;

  const handleAddItem = () => {
    setItems((prev) => [...prev, { id: Date.now().toString(), description: '', amount: 0 }]);
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ clientName, totalAmount });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Studio Proposal & Quotation">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-text-secondary">Client Name</label>
          <Input
            placeholder="e.g., Eleanor Vance & Julian"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-text-secondary">
              Line Items & Services
            </label>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={handleAddItem}
              className="text-xs text-gold-500"
            >
              <Plus size={14} /> Add Line Item
            </Button>
          </div>

          {items.map((item, idx) => (
            <div key={item.id} className="flex gap-2 items-center">
              <Input
                placeholder="Service Description"
                value={item.description}
                onChange={(e) => {
                  const val = e.target.value;
                  setItems((prev) =>
                    prev.map((i) => (i.id === item.id ? { ...i, description: val } : i)),
                  );
                }}
                className="flex-1"
                required
              />
              <Input
                type="number"
                placeholder="Amount ($)"
                value={item.amount || ''}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  setItems((prev) =>
                    prev.map((i) => (i.id === item.id ? { ...i, amount: val } : i)),
                  );
                }}
                className="w-28"
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveItem(item.id)}
                className="p-2 text-status-error hover:bg-surface-elevated rounded-lg"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* GST Tax & Summary Box */}
        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-1 text-xs">
          <div className="flex justify-between text-text-secondary">
            <span>Subtotal:</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-text-secondary">
            <span>GST Tax (18% Configurable):</span>
            <span>${taxAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold text-text-primary text-sm pt-2 border-t border-border-subtle">
            <span>Total Quotation:</span>
            <span className="text-gold-500">${totalAmount.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit" className="flex items-center gap-2">
            <ShieldCheck size={16} />
            Generate PDF Proposal
          </Button>
        </div>
      </form>
    </Modal>
  );
};
