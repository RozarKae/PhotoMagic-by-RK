'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { FinancialSummaryCards } from '../../components/FinancialSummaryCards';
import { InvoiceListTable, InvoiceItem } from '../../components/InvoiceListTable';
import { QuotationModal } from '../../components/QuotationModal';
import { DollarSign, FileText, Plus, Calculator, Download, TrendingUp } from 'lucide-react';

export default function FinancialsPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const [invoices, setInvoices] = useState<InvoiceItem[]>([
    {
      id: 'inv-101',
      invoiceNumber: 'INV-2026-001',
      clientName: 'Eleanor Vance',
      projectName: 'Udaipur Royal Wedding',
      subtotal: 13000,
      taxAmount: 2340,
      totalAmount: 15340,
      paidAmount: 2500,
      status: 'partially_paid',
      dueDate: '2026-10-01',
    },
    {
      id: 'inv-102',
      invoiceNumber: 'INV-2026-002',
      clientName: 'Sarah Montgomery',
      projectName: 'Paris Editorial Shoot',
      subtotal: 7500,
      taxAmount: 1350,
      totalAmount: 8850,
      paidAmount: 8850,
      status: 'paid',
      dueDate: '2026-11-01',
    },
  ]);

  return (
    <main className="p-8 max-w-7xl mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">GST-Ready Financial Engine</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">
            Finance & Accounting Hub
          </h1>
          <p className="text-sm text-text-secondary">
            Manage quotations, retainer invoices, GST tax ledger, razorpay payments, and P&L
            reports.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => setIsQuoteModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Calculator size={16} />
            New Quotation Proposal
          </Button>

          <Button variant="primary" className="flex items-center gap-2">
            <Plus size={16} />
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <FinancialSummaryCards />

      {/* Main Invoices Table */}
      <Card variant="glass" className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-text-primary">
            Studio Billing & Retainer Invoices
          </h3>
          <Badge variant="gold">{invoices.length} Active Invoices</Badge>
        </div>

        <InvoiceListTable invoices={invoices} />
      </Card>

      <QuotationModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        onSave={() => {}}
      />
    </main>
  );
}
