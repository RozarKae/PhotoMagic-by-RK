'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { FileText, Download, CreditCard, ShieldCheck } from 'lucide-react';

export const InvoiceManagementList: React.FC = () => {
  const invoices = [
    {
      number: 'INV-2026-088',
      issueDate: 'Jul 01, 2026',
      dueDate: 'Jul 01, 2026',
      amount: '$4,500',
      status: 'paid',
    },
    {
      number: 'INV-2026-089',
      issueDate: 'Jul 01, 2026',
      dueDate: 'Aug 06, 2026',
      amount: '$4,500',
      status: 'pending',
    },
  ];

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Studio Official GST Invoices</h3>
        </div>
        <Badge variant="gold">2 Invoices Generated</Badge>
      </div>

      <div className="flex flex-col gap-3 text-xs">
        {invoices.map((inv, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-surface-base border border-border-subtle flex justify-between items-center"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-bold font-mono text-text-primary text-xs">{inv.number}</span>
                <Badge variant={inv.status === 'paid' ? 'success' : 'gold'}>{inv.status}</Badge>
              </div>
              <span className="text-[10px] text-text-tertiary">
                Issued: {inv.issueDate} • Due: {inv.dueDate}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono font-extrabold text-text-primary text-base">
                {inv.amount}
              </span>
              <Button variant="secondary" size="sm" className="flex items-center gap-1 text-[11px]">
                <Download size={12} /> Download PDF
              </Button>
              {inv.status === 'pending' && (
                <Button variant="primary" size="sm" className="flex items-center gap-1 text-[11px]">
                  <CreditCard size={12} /> Pay Now
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
