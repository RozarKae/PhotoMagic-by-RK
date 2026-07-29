import * as React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Receipt, Download, CheckCircle2 } from 'lucide-react';

export const TransactionTimelineLedger: React.FC = () => {
  const transactions = [
    { id: 'tx-1', name: '50% Retainer Advance Payment', amount: '$4,500', method: 'Razorpay (Card **** 4242)', date: 'Jul 01, 2026', status: 'paid', receipt: 'REC-2026-001.pdf' },
    { id: 'tx-2', name: 'Final Balance Payment', amount: '$4,500', method: 'Pending Album Approval', date: 'Due Aug 06, 2026', status: 'pending', receipt: null },
  ];

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Receipt size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Transaction History & Payment Receipts</h3>
        </div>
        <Badge variant="gold">{transactions.length} Transactions Logged</Badge>
      </div>

      <div className="flex flex-col gap-3 text-xs">
        {transactions.map((tx) => (
          <div key={tx.id} className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex justify-between items-center">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-text-primary">{tx.name}</span>
                <Badge variant={tx.status === 'paid' ? 'success' : 'gold'}>{tx.status}</Badge>
              </div>
              <span className="text-[10px] text-text-tertiary">{tx.method} • {tx.date}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-gold-500 text-sm">{tx.amount}</span>
              {tx.receipt && (
                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-[11px]">
                  <Download size={12} /> Receipt PDF
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
