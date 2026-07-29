'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { PaymentDashboardSummary } from '../../components/payments/PaymentDashboardSummary';
import { TransactionTimelineLedger } from '../../components/payments/TransactionTimelineLedger';
import { InvoiceManagementList } from '../../components/payments/InvoiceManagementList';
import { DollarSign, CreditCard, ShieldCheck } from 'lucide-react';

export default function ClientPaymentsPage() {
  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Phase C9 Client Portal</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">Payments & Official Invoices</h1>
          <p className="text-sm text-text-secondary">Track retainer advances, download official GST invoices & payment receipts, and make secure online payments.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2">
            <CreditCard size={16} /> Pay Balance ($4,500)
          </Button>
        </div>
      </div>

      {/* Payment Dashboard Summary */}
      <PaymentDashboardSummary />

      {/* Official Invoices & Transaction History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <InvoiceManagementList />
        <TransactionTimelineLedger />
      </div>
    </main>
  );
}
