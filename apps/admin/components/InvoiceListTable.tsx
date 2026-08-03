import * as React from 'react';
import { DataTable, Badge, Button } from '@photomagic/ui';
import { FileText, Download, CheckCircle2, DollarSign } from 'lucide-react';

export interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  clientName: string;
  projectName: string;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  paidAmount: number;
  status: 'unpaid' | 'partially_paid' | 'paid' | 'overdue';
  dueDate: string;
}

interface InvoiceListTableProps {
  invoices: InvoiceItem[];
  onRecordPayment?: (invoice: InvoiceItem) => void;
}

export const InvoiceListTable: React.FC<InvoiceListTableProps> = ({
  invoices,
  onRecordPayment,
}) => {
  const getStatusBadge = (status: InvoiceItem['status']) => {
    switch (status) {
      case 'paid':
        return <Badge variant="success">Paid in Full</Badge>;
      case 'partially_paid':
        return <Badge variant="gold">Deposit Paid</Badge>;
      case 'overdue':
        return <Badge variant="error">Overdue</Badge>;
      default:
        return <Badge variant="warning">Unpaid</Badge>;
    }
  };

  const columns = [
    {
      header: 'Invoice #',
      accessorKey: (row: InvoiceItem) => (
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-surface-elevated text-gold-500 border border-border-subtle">
            <FileText size={16} />
          </div>
          <div className="flex flex-col">
            <span className="font-mono font-bold text-text-primary text-xs">
              {row.invoiceNumber}
            </span>
            <span className="text-[10px] text-text-tertiary">Due {row.dueDate}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Client & Project',
      accessorKey: (row: InvoiceItem) => (
        <div className="flex flex-col text-xs">
          <span className="font-semibold text-text-primary">{row.clientName}</span>
          <span className="text-text-tertiary">{row.projectName}</span>
        </div>
      ),
    },
    {
      header: 'Total & Paid',
      accessorKey: (row: InvoiceItem) => (
        <div className="flex flex-col text-xs">
          <span className="font-bold text-text-primary">${row.totalAmount.toLocaleString()}</span>
          <span className="text-gold-500 font-semibold">
            Paid: ${row.paidAmount.toLocaleString()}
          </span>
        </div>
      ),
    },
    {
      header: 'Status',
      accessorKey: (row: InvoiceItem) => getStatusBadge(row.status),
    },
    {
      header: 'Actions',
      accessorKey: (row: InvoiceItem) => (
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onRecordPayment?.(row)}
            className="flex items-center gap-1"
          >
            <DollarSign size={14} />
            Record Payment
          </Button>
          <Button variant="ghost" size="sm">
            <Download size={14} />
          </Button>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={invoices} />;
};
