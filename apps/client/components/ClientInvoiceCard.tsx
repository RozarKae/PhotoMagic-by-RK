'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { CreditCard, Download, CheckCircle } from 'lucide-react';

interface ClientInvoiceCardProps {
  invoiceNumber: string;
  description: string;
  amount: number;
  dueDate: string;
  isPaid: boolean;
}

export const ClientInvoiceCard: React.FC<ClientInvoiceCardProps> = ({
  invoiceNumber,
  description,
  amount,
  dueDate,
  isPaid,
}) => {
  return (
    <Card
      variant="glass"
      className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <span className="font-bold text-text-primary text-base">{invoiceNumber}</span>
          <Badge variant={isPaid ? 'success' : 'warning'}>
            {isPaid ? 'Paid & Verified' : 'Payment Due'}
          </Badge>
        </div>
        <p className="text-xs text-text-secondary">{description}</p>
        <span className="text-[11px] text-text-tertiary">Due Date: {dueDate}</span>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
        <div className="text-right">
          <span className="text-xs text-text-tertiary block">Amount</span>
          <span className="text-xl font-extrabold text-gold-500">${amount.toLocaleString()}</span>
        </div>

        {isPaid ? (
          <Button variant="secondary" size="sm" className="flex items-center gap-2">
            <Download size={14} />
            Receipt
          </Button>
        ) : (
          <Button variant="primary" size="sm" className="flex items-center gap-2">
            <CreditCard size={14} />
            Pay Now
          </Button>
        )}
      </div>
    </Card>
  );
};
