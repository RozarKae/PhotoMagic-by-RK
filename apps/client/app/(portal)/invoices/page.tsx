'use client';

import React from 'react';
import { Card, Badge } from '@photomagic/ui';
import { ClientInvoiceCard } from '../../../components/ClientInvoiceCard';

export default function InvoicesPage() {
  const invoices = [
    {
      invoiceNumber: 'INV-2026-001',
      description: 'Deposit Payment — Royal Heirloom Collection (25% Retainer)',
      amount: 2500,
      dueDate: '2026-07-29',
      isPaid: true,
    },
    {
      invoiceNumber: 'INV-2026-002',
      description: 'Final Balance Payment — Royal Heirloom Collection',
      amount: 6000,
      dueDate: '2026-10-10',
      isPaid: false,
    },
  ];

  return (
    <main className="p-8 max-w-7xl mx-auto flex flex-col gap-8 pb-24">
      <div>
        <Badge variant="gold">Billing & Payments</Badge>
        <h1 className="text-3xl font-extrabold text-text-primary mt-1">Invoices & Receipts</h1>
        <p className="text-sm text-text-secondary">
          Manage your studio retainers, installment schedules, and official receipts.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {invoices.map((inv) => (
          <ClientInvoiceCard
            key={inv.invoiceNumber}
            invoiceNumber={inv.invoiceNumber}
            description={inv.description}
            amount={inv.amount}
            dueDate={inv.dueDate}
            isPaid={inv.isPaid}
          />
        ))}
      </div>
    </main>
  );
}
