import * as React from 'react';
import { DataTable, Badge, Button } from '@photomagic/ui';
import { User, Mail, Phone, Tag, Trash2, Edit } from 'lucide-react';

export interface ClientRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  familyMembers: string[];
  notes: string;
  tags: string[];
  totalBookings: number;
}

interface ClientListTableProps {
  clients: ClientRecord[];
  onSelectClient?: (client: ClientRecord) => void;
}

export const ClientListTable: React.FC<ClientListTableProps> = ({ clients, onSelectClient }) => {
  const columns = [
    {
      header: 'Client & Family',
      accessorKey: (row: ClientRecord) => (
        <div className="flex flex-col">
          <span className="font-bold text-text-primary text-sm">{row.fullName}</span>
          <span className="text-xs text-text-tertiary">
            Family: {row.familyMembers.join(', ') || 'N/A'}
          </span>
        </div>
      ),
    },
    {
      header: 'Contact Info',
      accessorKey: (row: ClientRecord) => (
        <div className="flex flex-col text-xs text-text-secondary">
          <span>{row.email}</span>
          <span>{row.phone}</span>
        </div>
      ),
    },
    {
      header: 'Tags & Status',
      accessorKey: (row: ClientRecord) => (
        <div className="flex flex-wrap gap-1">
          {row.tags.map((t, idx) => (
            <Badge key={idx} variant="gold" className="text-[10px]">
              {t}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      header: 'Total Bookings',
      accessorKey: (row: ClientRecord) => (
        <span className="font-bold text-gold-500">{row.totalBookings} Bookings</span>
      ),
    },
    {
      header: 'Actions',
      accessorKey: (row: ClientRecord) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => onSelectClient?.(row)}>
            <Edit size={14} />
          </Button>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={clients} />;
};
