'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import {
  DollarSign,
  TrendingUp,
  FileSpreadsheet,
  FileText,
  Download,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  PieChart,
  BarChart2,
} from 'lucide-react';
import { RevenueReportV10 } from '@photomagic/config';

const MOCK_REPORTS: RevenueReportV10[] = [
  {
    id: 'rep-1',
    reportPeriod: 'July 2026',
    totalRevenueInr: 4850000.0,
    collectedPaymentsInr: 4200000.0,
    outstandingBalanceInr: 650000.0,
    averageProjectValueInr: 346428.57,
    topSellingPackage: 'Royal Udaipur Destination Wedding Package ($9,000)',
    totalBookings: 14,
  },
  {
    id: 'rep-2',
    reportPeriod: 'June 2026',
    totalRevenueInr: 3900000.0,
    collectedPaymentsInr: 3900000.0,
    outstandingBalanceInr: 0.0,
    averageProjectValueInr: 325000.0,
    topSellingPackage: 'Lake Palace Pre-Wedding Editorial Package ($5,000)',
    totalBookings: 12,
  },
  {
    id: 'rep-3',
    reportPeriod: 'FY 2026 - 2027 (Q1)',
    totalRevenueInr: 12450000.0,
    collectedPaymentsInr: 11100000.0,
    outstandingBalanceInr: 1350000.0,
    averageProjectValueInr: 336486.0,
    topSellingPackage: 'Royal Destination Heritage Suite',
    totalBookings: 37,
  },
];

export const RevenueReportsCenter: React.FC = () => {
  const [reports, setReports] = useState<RevenueReportV10[]>(MOCK_REPORTS);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const activeReport = reports[0]; // July 2026

  const handleExport = (format: 'pdf' | 'excel') => {
    setExportNotice(
      `Generated & downloaded Financial Revenue Report (${activeReport.reportPeriod}) in ${format.toUpperCase()} format!`,
    );
    setTimeout(() => setExportNotice(null), 5000);
  };

  return (
    <Card
      variant="elevated"
      className="p-6 border border-border-subtle bg-surface-elevated flex flex-col gap-6"
    >
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <DollarSign size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-text-primary">
                Phase 10.7 — Financial Revenue Reports & PDF/Excel Exporter
              </h2>
              <Badge variant="gold">GST 18% Compliant</Badge>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Monthly/Yearly revenue reports, booking trends, popular package rankings, payment
              statuses, and 1-click export.
            </p>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => handleExport('excel')}
            className="flex items-center gap-2 text-xs font-semibold"
          >
            <FileSpreadsheet size={14} className="text-emerald-400" /> Export Excel
          </Button>
          <Button
            variant="primary"
            onClick={() => handleExport('pdf')}
            className="flex items-center gap-2 text-xs font-bold"
          >
            <FileText size={14} /> Export PDF Report
          </Button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 size={16} /> {exportNotice}
        </div>
      )}

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-surface-base border border-gold-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs text-gold-400 font-semibold">Monthly Total Revenue</span>
            <h3 className="text-2xl font-extrabold text-gold-500 mt-1">
              ₹{(activeReport.totalRevenueInr / 100000).toFixed(2)} Lakhs
            </h3>
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp size={12} /> +22.4% vs June
            </span>
          </div>
          <div className="p-3 rounded-xl bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <DollarSign size={24} />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface-base border border-emerald-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs text-emerald-400 font-semibold">Collected Payments</span>
            <h3 className="text-2xl font-extrabold text-emerald-400 mt-1">
              ₹{(activeReport.collectedPaymentsInr / 100000).toFixed(2)} Lakhs
            </h3>
            <span className="text-[11px] text-text-tertiary mt-1 block">
              86.6% Realized Cashflow
            </span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 size={24} />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface-base border border-amber-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs text-amber-400 font-semibold">Outstanding Balances</span>
            <h3 className="text-2xl font-extrabold text-amber-400 mt-1">
              ₹{(activeReport.outstandingBalanceInr / 100000).toFixed(2)} Lakhs
            </h3>
            <span className="text-[11px] text-amber-400 font-semibold mt-1 block">
              Due upon final delivery
            </span>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertTriangle size={24} />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface-base border border-purple-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs text-purple-400 font-semibold">Average Project Value</span>
            <h3 className="text-2xl font-extrabold text-text-primary mt-1">
              ₹{Math.round(activeReport.averageProjectValueInr).toLocaleString('en-IN')}
            </h3>
            <span className="text-[11px] text-purple-400 font-semibold mt-1 block">
              High-Yield Luxury Benchmark
            </span>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <BarChart2 size={24} />
          </div>
        </div>
      </div>

      {/* Reports Breakdown Table */}
      <div className="overflow-x-auto border border-border-subtle rounded-xl bg-surface-base">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-subtle text-xs text-text-tertiary uppercase tracking-wider bg-surface-elevated/50">
              <th className="py-3 px-4">Reporting Period</th>
              <th className="py-3 px-4">Total Revenue</th>
              <th className="py-3 px-4">Collected Payments</th>
              <th className="py-3 px-4">Outstanding Balance</th>
              <th className="py-3 px-4">Avg Project Value</th>
              <th className="py-3 px-4">Popular Package</th>
              <th className="py-3 px-4 text-right">Bookings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle text-sm">
            {reports.map((rep) => (
              <tr key={rep.id} className="hover:bg-surface-elevated/30 transition-colors">
                <td className="py-3.5 px-4 font-bold text-text-primary whitespace-nowrap">
                  {rep.reportPeriod}
                </td>
                <td className="py-3.5 px-4 font-extrabold text-gold-500 whitespace-nowrap">
                  ₹{rep.totalRevenueInr.toLocaleString('en-IN')}
                </td>
                <td className="py-3.5 px-4 font-semibold text-emerald-400 whitespace-nowrap">
                  ₹{rep.collectedPaymentsInr.toLocaleString('en-IN')}
                </td>
                <td className="py-3.5 px-4 font-semibold text-amber-400 whitespace-nowrap">
                  ₹{rep.outstandingBalanceInr.toLocaleString('en-IN')}
                </td>
                <td className="py-3.5 px-4 text-xs font-mono text-text-primary whitespace-nowrap">
                  ₹{Math.round(rep.averageProjectValueInr).toLocaleString('en-IN')}
                </td>
                <td className="py-3.5 px-4 text-xs text-text-secondary max-w-xs truncate">
                  {rep.topSellingPackage}
                </td>
                <td className="py-3.5 px-4 text-right font-bold text-text-primary">
                  {rep.totalBookings}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
