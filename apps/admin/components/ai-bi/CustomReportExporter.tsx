'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { FileText, Download, FileSpreadsheet, Printer } from 'lucide-react';

export const CustomReportExporter: React.FC = () => {
  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Executive Custom Report Exporter</h3>
        </div>
        <Badge variant="gold">PDF / Excel / CSV Engine</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <Button variant="secondary" size="sm" className="flex items-center justify-center gap-2 p-3 h-auto">
          <Download size={14} className="text-gold-500" />
          <div className="flex flex-col text-left">
            <span className="font-bold">Full Executive PDF Report</span>
            <span className="text-[9px] text-text-tertiary">C-Suite Financial & BI Deck</span>
          </div>
        </Button>

        <Button variant="secondary" size="sm" className="flex items-center justify-center gap-2 p-3 h-auto">
          <FileSpreadsheet size={14} className="text-gold-500" />
          <div className="flex flex-col text-left">
            <span className="font-bold">Excel Revenue Ledger</span>
            <span className="text-[9px] text-text-tertiary">Raw Transactions & Taxes</span>
          </div>
        </Button>

        <Button variant="secondary" size="sm" className="flex items-center justify-center gap-2 p-3 h-auto">
          <Printer size={14} className="text-gold-500" />
          <div className="flex flex-col text-left">
            <span className="font-bold">Printable Summary</span>
            <span className="text-[9px] text-text-tertiary">High-Res Executive Printout</span>
          </div>
        </Button>
      </div>
    </Card>
  );
};
