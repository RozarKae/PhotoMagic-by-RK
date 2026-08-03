import * as React from 'react';
import { Card, Badge } from '@photomagic/ui';
import { DollarSign, TrendingUp, AlertCircle, FileText, ArrowUpRight } from 'lucide-react';

export const FinancialSummaryCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">Gross Revenue</span>
          <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <DollarSign size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">$148,500</span>
        <span className="text-xs text-status-success font-semibold mt-1 flex items-center gap-1">
          <ArrowUpRight size={14} /> +24.8% YoY Net Inflow
        </span>
      </Card>

      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">
            Net Profit Margin
          </span>
          <div className="p-2 rounded-full bg-status-success/10 text-status-success border border-status-success/20">
            <TrendingUp size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">$94,200</span>
        <span className="text-xs text-text-tertiary mt-1">63.4% Profit Margin</span>
      </Card>

      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">Outstanding AR</span>
          <div className="p-2 rounded-full bg-status-warning/10 text-status-warning border border-status-warning/20">
            <AlertCircle size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">$12,800</span>
        <span className="text-xs text-status-warning font-semibold mt-1">
          4 Invoices Awaiting Balance
        </span>
      </Card>

      <Card variant="glass" className="p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase text-text-tertiary">
            Operating Expenses
          </span>
          <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <FileText size={18} />
          </div>
        </div>
        <span className="text-3xl font-extrabold text-text-primary">$54,300</span>
        <span className="text-xs text-text-tertiary mt-1">Print Labs, Gear & Payroll</span>
      </Card>
    </div>
  );
};
