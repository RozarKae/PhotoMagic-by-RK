import * as React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { DollarSign, CreditCard, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const PaymentDashboardSummary: React.FC = () => {
  const totalAmount = 9000;
  const amountPaid = 4500;
  const balanceDue = 4500;
  const progressPercent = 50;

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <DollarSign size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Client Payment & Invoicing Dashboard
          </h3>
        </div>
        <Badge variant="gold">Partially Paid (50%)</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col justify-between">
          <span className="text-text-tertiary">Total Package Price</span>
          <span className="text-2xl font-extrabold text-text-primary font-mono mt-1">
            ${totalAmount.toLocaleString()}
          </span>
          <span className="text-[10px] text-text-tertiary mt-2">Royal Destination Package</span>
        </div>

        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col justify-between">
          <span className="text-text-tertiary">Amount Paid To Date</span>
          <span className="text-2xl font-extrabold text-status-success font-mono mt-1">
            ${amountPaid.toLocaleString()}
          </span>
          <span className="text-[10px] text-status-success font-semibold mt-2">
            Retainer Received
          </span>
        </div>

        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col justify-between">
          <span className="text-text-tertiary">Outstanding Balance Due</span>
          <span className="text-2xl font-extrabold text-gold-500 font-mono mt-1">
            ${balanceDue.toLocaleString()}
          </span>
          <span className="text-[10px] text-gold-500 font-semibold mt-2">
            Due on Album Approval
          </span>
        </div>
      </div>

      {/* Visual Payment Progress Bar */}
      <div className="flex flex-col gap-1.5 text-xs">
        <div className="flex justify-between items-center text-[11px]">
          <span className="text-text-secondary">Payment Completion Progress</span>
          <span className="font-mono text-gold-500 font-bold">{progressPercent}% Paid</span>
        </div>
        <div className="w-full bg-surface-elevated h-2.5 rounded-full overflow-hidden">
          <div className="bg-gold-500 h-full" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>
    </Card>
  );
};
